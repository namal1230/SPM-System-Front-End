import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReqestPendingComponent } from './user-reqest-pending.component';

describe('UserReqestPendingComponent', () => {
  let component: UserReqestPendingComponent;
  let fixture: ComponentFixture<UserReqestPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReqestPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReqestPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
