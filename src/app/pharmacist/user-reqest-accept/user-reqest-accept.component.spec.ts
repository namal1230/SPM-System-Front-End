import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReqestAcceptComponent } from './user-reqest-accept.component';

describe('UserReqestAcceptComponent', () => {
  let component: UserReqestAcceptComponent;
  let fixture: ComponentFixture<UserReqestAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReqestAcceptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReqestAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
