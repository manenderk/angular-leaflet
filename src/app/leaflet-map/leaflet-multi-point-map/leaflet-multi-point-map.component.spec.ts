import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletMultiPointMapComponent } from './leaflet-multi-point-map.component';

describe('LeafletMultiPointMapComponent', () => {
  let component: LeafletMultiPointMapComponent;
  let fixture: ComponentFixture<LeafletMultiPointMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafletMultiPointMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafletMultiPointMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
