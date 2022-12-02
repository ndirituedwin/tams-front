import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailsPageComponent } from './service-details-page.component';

describe('ServiceDetailsPageComponent', () => {
  let component: ServiceDetailsPageComponent;
  let fixture: ComponentFixture<ServiceDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
