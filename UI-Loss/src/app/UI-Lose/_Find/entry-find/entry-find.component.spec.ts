import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryFindComponent } from './entry-find.component';

describe('EntryFindComponent', () => {
  let component: EntryFindComponent;
  let fixture: ComponentFixture<EntryFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryFindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
