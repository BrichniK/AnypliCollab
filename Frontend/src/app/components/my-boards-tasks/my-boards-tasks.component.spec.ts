import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBoardsTasksComponent } from './my-boards-tasks.component';

describe('MyBoardsTasksComponent', () => {
  let component: MyBoardsTasksComponent;
  let fixture: ComponentFixture<MyBoardsTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBoardsTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBoardsTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
