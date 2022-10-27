import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTopicViewComponent } from './single-topic-view.component';

describe('SingleTopicViewComponent', () => {
  let component: SingleTopicViewComponent;
  let fixture: ComponentFixture<SingleTopicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTopicViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleTopicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
