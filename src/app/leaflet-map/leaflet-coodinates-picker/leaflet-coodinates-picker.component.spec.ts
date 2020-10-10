import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletCoodinatesPickerComponent } from './leaflet-coodinates-picker.component';

describe('LeafletCoodinatesPickerComponent', () => {
  let component: LeafletCoodinatesPickerComponent;
  let fixture: ComponentFixture<LeafletCoodinatesPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafletCoodinatesPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafletCoodinatesPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
