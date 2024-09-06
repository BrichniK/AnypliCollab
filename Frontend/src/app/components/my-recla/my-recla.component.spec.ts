import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReclaComponent } from './my-recla.component';

describe('MyReclaComponent', () => {
  let component: MyReclaComponent;
  let fixture: ComponentFixture<MyReclaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReclaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReclaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
