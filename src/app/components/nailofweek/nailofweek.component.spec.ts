import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NailofweekComponent } from './nailofweek.component';

describe('NailofweekComponent', () => {
  let component: NailofweekComponent;
  let fixture: ComponentFixture<NailofweekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NailofweekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NailofweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
