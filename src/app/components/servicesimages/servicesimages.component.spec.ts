import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesimagesComponent } from './servicesimages.component';

describe('ServicesimagesComponent', () => {
  let component: ServicesimagesComponent;
  let fixture: ComponentFixture<ServicesimagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesimagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
