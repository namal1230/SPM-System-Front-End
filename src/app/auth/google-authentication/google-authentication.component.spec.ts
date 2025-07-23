import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthenticationComponent } from './google-authentication.component';

describe('GoogleAuthenticationComponent', () => {
  let component: GoogleAuthenticationComponent;
  let fixture: ComponentFixture<GoogleAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleAuthenticationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
