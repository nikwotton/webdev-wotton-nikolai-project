import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeEditComponent } from './meme-edit.component';

describe('MemeEditComponent', () => {
  let component: MemeEditComponent;
  let fixture: ComponentFixture<MemeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
