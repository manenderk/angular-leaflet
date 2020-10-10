import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeoServiceService } from 'src/app/services/geo-service.service';
import { SubSink } from 'subsink';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-single-point-map',
  templateUrl: './leaflet-single-point-map.component.html',
  styleUrls: ['./leaflet-single-point-map.component.css']
})
export class LeafletSinglePointMapComponent implements OnInit, OnDestroy {

  userPosition: Position;
  userPositionError: PositionError;

  mapData: {
    center?: L.LatLng,
    userPositionMarkerLayer?: L.CircleMarker
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
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  subsribeUserPositionUpdates() {
    this.subSink.sink = this.geoService.userPosition.subscribe((position: Position) => {
      if (position) {
        this.userPosition = position;
        this.updateUserPositionInMap();
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
}
