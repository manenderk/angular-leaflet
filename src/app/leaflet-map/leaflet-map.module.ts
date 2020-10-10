import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletSinglePointMapComponent } from './leaflet-single-point-map/leaflet-single-point-map.component';
import { RouterModule, Routes } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMultiPointMapComponent } from './leaflet-multi-point-map/leaflet-multi-point-map.component';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { LeafletCoodinatesPickerComponent } from './leaflet-coodinates-picker/leaflet-coodinates-picker.component';

const routes: Routes = [
  {
    path: '',
    component: LeafletSinglePointMapComponent
  },
  {
    path: 'multi',
    component: LeafletMultiPointMapComponent
  },
  {
    path: 'picker',
    component: LeafletCoodinatesPickerComponent
  }
];

@NgModule({
  declarations: [LeafletSinglePointMapComponent, LeafletMultiPointMapComponent, LeafletCoodinatesPickerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LeafletModule,
    LeafletMarkerClusterModule
  ]
})
export class LeafletMapModule { }
