import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinEventsComponent } from './join-events.component';

describe('JoinEventsComponent', () => {
  let component: JoinEventsComponent;
  let fixture: ComponentFixture<JoinEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
