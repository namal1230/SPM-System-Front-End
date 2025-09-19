import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectRequetComponent } from './reject-requet.component';

describe('RejectRequetComponent', () => {
  let component: RejectRequetComponent;
  let fixture: ComponentFixture<RejectRequetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectRequetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectRequetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
