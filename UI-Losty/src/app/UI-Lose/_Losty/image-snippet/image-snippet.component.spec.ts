import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSnippetComponent } from './image-snippet.component';

describe('ImageSnippetComponent', () => {
  let component: ImageSnippetComponent;
  let fixture: ComponentFixture<ImageSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSnippetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
