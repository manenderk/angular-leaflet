import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root'
})
export class GeoServiceService implements OnDestroy {



  userPosition: BehaviorSubject<Position> = new BehaviorSubject(null);
  userPositionError: BehaviorSubject<PositionError> = new BehaviorSubject(null);

  private window = window;
  private subSink = new SubSink();
  private watchId: any = null;

  constructor() {
    this.subscribeUserPositionWatching();
  }


  subscribeUserPositionWatching() {
    this.watchId = this.window.navigator.geolocation.watchPosition((position: Position) => {
      this.userPosition.next(position);
    }, (error: PositionError) => {
      this.userPositionError.next(error);
    });
  }


  ngOnDestroy() {
    this.window.navigator.geolocation.clearWatch(this.watchId);
  }


}
