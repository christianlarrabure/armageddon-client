import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicViewButtonsComponent } from './topic-view-buttons.component';

describe('TopicViewButtonsComponent', () => {
  let component: TopicViewButtonsComponent;
  let fixture: ComponentFixture<TopicViewButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicViewButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicViewButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
