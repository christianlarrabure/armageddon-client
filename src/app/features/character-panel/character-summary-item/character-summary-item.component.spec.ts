import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSummaryItemComponent } from './character-summary-item.component';

describe('CharacterSummaryItemComponent', () => {
  let component: CharacterSummaryItemComponent;
  let fixture: ComponentFixture<CharacterSummaryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterSummaryItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterSummaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
