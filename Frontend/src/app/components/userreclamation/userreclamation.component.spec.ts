import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserreclamationComponent } from './userreclamation.component';

describe('UserreclamationComponent', () => {
  let component: UserreclamationComponent;
  let fixture: ComponentFixture<UserreclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserreclamationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserreclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
