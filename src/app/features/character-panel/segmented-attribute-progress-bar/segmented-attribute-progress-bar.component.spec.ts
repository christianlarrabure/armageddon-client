import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentedAttributeProgressBarComponent } from './segmented-attribute-progress-bar.component';

describe('SegmentedAttributeProgressBarComponent', () => {
  let component: SegmentedAttributeProgressBarComponent;
  let fixture: ComponentFixture<SegmentedAttributeProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentedAttributeProgressBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentedAttributeProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
