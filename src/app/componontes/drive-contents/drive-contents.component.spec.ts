import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveContentsComponent } from './drive-contents.component';

describe('DriveContentsComponent', () => {
  let component: DriveContentsComponent;
  let fixture: ComponentFixture<DriveContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
