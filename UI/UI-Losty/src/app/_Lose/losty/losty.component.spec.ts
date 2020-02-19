import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostyComponent } from './losty.component';

describe('LostyComponent', () => {
  let component: LostyComponent;
  let fixture: ComponentFixture<LostyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
