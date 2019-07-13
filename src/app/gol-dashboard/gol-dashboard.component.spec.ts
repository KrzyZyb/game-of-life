import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GolDashboardComponent } from './gol-dashboard.component';

describe('GolDashboardComponent', () => {
  let component: GolDashboardComponent;
  let fixture: ComponentFixture<GolDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GolDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
