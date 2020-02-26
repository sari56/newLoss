import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalLossComponent } from './personal-loss.component';

describe('PersonalLossComponent', () => {
  let component: PersonalLossComponent;
  let fixture: ComponentFixture<PersonalLossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalLossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
