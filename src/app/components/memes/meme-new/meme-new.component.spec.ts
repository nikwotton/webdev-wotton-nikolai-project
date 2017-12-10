import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeNewComponent } from './meme-new.component';

describe('MemeNewComponent', () => {
  let component: MemeNewComponent;
  let fixture: ComponentFixture<MemeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
