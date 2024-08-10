import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './components/project/project.component';
import { TaskComponent } from './components/task/task.component';
import { BoardComponent } from './components/board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';
import { ActivityComponent } from './components/activity/activity.component';
import { SettingsComponent } from './components/setting/setting.component';





@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    ProjectComponent,
    TaskComponent,
    BoardComponent,
    NavbarComponent,
    SidebarComponent,
    BoardDetailComponent,
    SettingsComponent,
    ActivityComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,  
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule  ,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
