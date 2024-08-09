import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';  // Ensure FormsModule is imported
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './components/project/project.component';
import { TaskBoardComponent } from './components/task-board/taskboard.component';
import { TaskComponent } from './components/task/task.component';
import { BoardComponent } from './components/board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';  

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    ProjectComponent,
    TaskBoardComponent,
    TaskComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
