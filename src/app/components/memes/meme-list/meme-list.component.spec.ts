import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeListComponent } from './meme-list.component';

describe('MemeListComponent', () => {
  let component: MemeListComponent;
  let fixture: ComponentFixture<MemeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
