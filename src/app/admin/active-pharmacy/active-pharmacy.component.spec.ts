import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePharmacyComponent } from './active-pharmacy.component';

describe('ActivePharmacyComponent', () => {
  let component: ActivePharmacyComponent;
  let fixture: ComponentFixture<ActivePharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePharmacyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
