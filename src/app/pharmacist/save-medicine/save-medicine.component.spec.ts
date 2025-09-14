import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMedicineComponent } from './save-medicine.component';

describe('SaveMedicineComponent', () => {
  let component: SaveMedicineComponent;
  let fixture: ComponentFixture<SaveMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveMedicineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
