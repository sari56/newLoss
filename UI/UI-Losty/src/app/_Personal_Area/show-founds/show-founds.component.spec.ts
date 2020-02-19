import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFoundsComponent } from './show-founds.component';

describe('ShowFoundsComponent', () => {
  let component: ShowFoundsComponent;
  let fixture: ComponentFixture<ShowFoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFoundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
