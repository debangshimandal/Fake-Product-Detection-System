import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSignupComponent } from './organization-signup.component';

describe('OrganizationSignupComponent', () => {
  let component: OrganizationSignupComponent;
  let fixture: ComponentFixture<OrganizationSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
