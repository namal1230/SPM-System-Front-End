import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyRequestComponent } from './pharmacy-request.component';

describe('PharmacyRequestComponent', () => {
  let component: PharmacyRequestComponent;
  let fixture: ComponentFixture<PharmacyRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
