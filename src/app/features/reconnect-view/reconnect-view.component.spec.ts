import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconnectViewComponent } from './reconnect-view.component';

describe('ReconnectViewComponent', () => {
  let component: ReconnectViewComponent;
  let fixture: ComponentFixture<ReconnectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconnectViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReconnectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
