import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeoServiceService } from 'src/app/services/geo-service.service';
import { SubSink } from 'subsink';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-multi-point-map',
  templateUrl: './leaflet-multi-point-map.component.html',
  styleUrls: ['./leaflet-multi-point-map.component.css']
})
export class LeafletMultiPointMapComponent implements OnInit, OnDestroy {

  userPosition: Position;
  userPositionError: PositionError;

  mapData: {
    center?: L.LatLng,
    userPositionMarkerLayer?: L.CircleMarker,
    markerLayers?: L.Layer[]
  } = {};

  leafletMapOptions: L.MapOptions = {
    layers: [
      L.tileLayer(
        'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png?lang=en',
        {
          maxZoom: 18,
          attribution: '@Wikimedia Maps'
        }
      )
    ],
    zoom: 12,
    center: L.latLng(0, 0)
  };

  private subSink = new SubSink();

  constructor(
    private geoService: GeoServiceService
  ) { }

  ngOnInit(): void {
    this.subsribeUserPositionUpdates();
    this.updateNearbyMarkers();
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  subsribeUserPositionUpdates() {
    this.subSink.sink = this.geoService.userPosition.subscribe((position: Position) => {
      if (position) {
        this.userPosition = position;
        this.updateUserPositionInMap();
        this.updateNearbyMarkers();
      }
    });
    this.subSink.sink = this.geoService.userPositionError.subscribe((positionError: PositionError) => {
      this.userPositionError = positionError;
    });
  }

  updateUserPositionInMap() {
    this.mapData.center = L.latLng(this.userPosition.coords.latitude, this.userPosition.coords.longitude);
    this.mapData.userPositionMarkerLayer = L.circleMarker(
      [
        this.userPosition.coords.latitude,
        this.userPosition.coords.longitude
      ],
      {
        radius: 6,
        fillColor: '#2196f3',
        fillOpacity: 1,
        stroke: false
      }
    ).bindTooltip('You are currently here...', {
      direction: 'top'
    });
  }


  updateNearbyMarkers() {
    this.mapData.markerLayers = [];

    const centerLoc = {
      lat: this.userPosition?.coords?.latitude || 0,
      lon: this.userPosition?.coords?.longitude || 0
    };

    const range = 0.5;

    for (let i = 0; i < 100; i++) {
      let multiplier1 = 1;
      let multiplier2 = 1;
      if (Math.random() < 0.5) {
        multiplier1 = -1;
      }
      if (Math.random() < 0.5) {
        multiplier2 = -1;
      }

      const lat = centerLoc.lat + this.getRandomNumber(range) * multiplier1;
      const lon = centerLoc.lon + this.getRandomNumber(range) * multiplier2;
      this.mapData.markerLayers.push(
        L.marker(
          [
            lat,
            lon
          ],
          {
            title: 'Some Place ' + i,
            icon: L.icon({
              iconSize: [ 25, 41 ],
                iconAnchor: [ 13, 41 ],
                iconUrl: 'assets/leaflet/marker-icon.png',
                shadowUrl: 'assets/leaflet/marker-shadow.png'
            })
          }
        )
      );
    }
  }


  getRandomNumber(num: number) {
    if (num === 0) {
      return num;
    }
    num = num * 10000;
    num = Math.floor(Math.random() * num);
    num = num / 10000;
    return num;
  }
}
