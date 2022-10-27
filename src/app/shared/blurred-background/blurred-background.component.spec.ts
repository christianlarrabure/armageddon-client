import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlurredBackgroundComponent } from './blurred-background.component';

describe('BlurredBackgroundComponent', () => {
  let component: BlurredBackgroundComponent;
  let fixture: ComponentFixture<BlurredBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlurredBackgroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlurredBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
