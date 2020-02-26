import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryLoseComponent } from './entry-lose.component';

describe('EntryLoseComponent', () => {
  let component: EntryLoseComponent;
  let fixture: ComponentFixture<EntryLoseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryLoseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryLoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
