import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReqestRejectComponent } from './user-reqest-reject.component';

describe('UserReqestRejectComponent', () => {
  let component: UserReqestRejectComponent;
  let fixture: ComponentFixture<UserReqestRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReqestRejectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReqestRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
