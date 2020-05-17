import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalTimelineComponent } from './global-timeline.component';

describe('GlobalTimelineComponent', () => {
  let component: GlobalTimelineComponent;
  let fixture: ComponentFixture<GlobalTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
