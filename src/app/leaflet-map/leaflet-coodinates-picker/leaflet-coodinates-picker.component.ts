import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeoServiceService } from 'src/app/services/geo-service.service';
import { SubSink } from 'subsink';
import * as L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime} from 'rxjs/operators';


@Component({
  selector: 'app-leaflet-coodinates-picker',
  templateUrl: './leaflet-coodinates-picker.component.html',
  styleUrls: ['./leaflet-coodinates-picker.component.css']
})
export class LeafletCoodinatesPickerComponent implements OnInit, OnDestroy {

  userPosition: Position;
  userPositionError: PositionError;

  locationSearch = {
    searchSubject: new Subject<string>(),
    results: []
  };

  userInputLatLan: {
    lat: number,
    lan: number
  } = null;

  mapData: {
    center?: L.LatLng,
    userPositionMarkerLayer?: L.CircleMarker,
    userInputMarkerLayer?: L.Layer
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

  provider = new OpenStreetMapProvider();

  private subSink = new SubSink();

  constructor(
    private geoService: GeoServiceService
  ) { }

  ngOnInit(): void {
    this.subsribeUserPositionUpdates();
    this.subscribeSearchInput();
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

  userClicked(event: any) {
    console.log(event);
    this.mapData.userInputMarkerLayer = L.marker(
      event.latlng,
      {
        title: 'Your Pinned Location',
        icon: L.icon({
          iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'assets/leaflet/marker-icon.png',
            shadowUrl: 'assets/leaflet/marker-shadow.png'
        })
      }
    );

    this.userInputLatLan = {
      lat: event.latlng.lat,
      lan: event.latlng.lng
    };
  }

  searchLocation(event) {
    const value = event.target.value;
    this.locationSearch.searchSubject.next(value);
  }

  subscribeSearchInput() {
    this.subSink.sink = this.locationSearch.searchSubject.asObservable().pipe(
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(async value => {
      this.locationSearch.results = await this.provider.search({ query: value });
      console.log(this.locationSearch.results);
    });
  }

  selectLocation(result: any) {
    const latLang: L.LatLng = L.latLng(result.y, result.x);

    this.userClicked({
      latlng: latLang
    });
    this.mapData.center = latLang;
    this.locationSearch.results = [];
  }

}
