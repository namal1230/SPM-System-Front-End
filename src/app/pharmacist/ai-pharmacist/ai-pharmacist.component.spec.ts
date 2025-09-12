import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiPharmacistComponent } from './ai-pharmacist.component';

describe('AiPharmacistComponent', () => {
  let component: AiPharmacistComponent;
  let fixture: ComponentFixture<AiPharmacistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiPharmacistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
