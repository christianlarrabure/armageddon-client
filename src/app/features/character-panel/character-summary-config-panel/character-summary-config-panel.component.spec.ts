import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSummaryConfigPanelComponent } from './character-summary-config-panel.component';

describe('CharacterSummaryConfigPanelComponent', () => {
  let component: CharacterSummaryConfigPanelComponent;
  let fixture: ComponentFixture<CharacterSummaryConfigPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterSummaryConfigPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterSummaryConfigPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
