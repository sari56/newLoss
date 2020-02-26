import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindDetailsComponent } from './find-details.component';

describe('FindDetailsComponent', () => {
  let component: FindDetailsComponent;
  let fixture: ComponentFixture<FindDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
