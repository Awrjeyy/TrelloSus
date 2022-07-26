import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersModel } from './users.model';

describe('UsersModel', () => {
  let component: UsersModel;
  let fixture: ComponentFixture<UsersModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersModel ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
