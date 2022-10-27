import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeProgressBarComponent } from './attribute-progress-bar.component';

describe('AttributeProgressBarComponent', () => {
  let component: AttributeProgressBarComponent;
  let fixture: ComponentFixture<AttributeProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeProgressBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
