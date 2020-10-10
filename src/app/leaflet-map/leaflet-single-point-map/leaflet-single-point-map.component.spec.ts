import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletSinglePointMapComponent } from './leaflet-single-point-map.component';

describe('LeafletSinglePointMapComponent', () => {
  let component: LeafletSinglePointMapComponent;
  let fixture: ComponentFixture<LeafletSinglePointMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafletSinglePointMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafletSinglePointMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
