import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartSearchFoundTopicsComponent } from './smart-search-found-topics.component';

describe('SmartSearchFoundTopicsComponent', () => {
  let component: SmartSearchFoundTopicsComponent;
  let fixture: ComponentFixture<SmartSearchFoundTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartSearchFoundTopicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartSearchFoundTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
