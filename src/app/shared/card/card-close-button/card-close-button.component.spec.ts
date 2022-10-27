import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCloseButtonComponent } from './card-close-button.component';

describe('CardCloseButtonComponent', () => {
  let component: CardCloseButtonComponent;
  let fixture: ComponentFixture<CardCloseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCloseButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCloseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
