import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostMapComponent } from './lost-map.component';

describe('LostMapComponent', () => {
  let component: LostMapComponent;
  let fixture: ComponentFixture<LostMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
