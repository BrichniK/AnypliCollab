import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordadminComponent } from './dashbordadmin.component';

describe('DashbordadminComponent', () => {
  let component: DashbordadminComponent;
  let fixture: ComponentFixture<DashbordadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
