import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoseDetailsComponent } from './lose-details.component';

describe('LoseDetailsComponent', () => {
  let component: LoseDetailsComponent;
  let fixture: ComponentFixture<LoseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
