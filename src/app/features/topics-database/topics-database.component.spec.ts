import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsDatabaseComponent } from './topics-database.component';

describe('TopicsDatabaseComponent', () => {
  let component: TopicsDatabaseComponent;
  let fixture: ComponentFixture<TopicsDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicsDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicsDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
