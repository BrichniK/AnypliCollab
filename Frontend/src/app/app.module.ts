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
import { TaskComponent } from './components/task/task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';
import { ActivityComponent } from './components/activity/activity.component';
import { SettingsComponent } from './components/setting/setting.component';
import { BoardComponent } from './components/board/board.component';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { DashbordadminComponent } from './components/dashbordadmin/dashbordadmin.component';
import { UserreclamationComponent } from './components/userreclamation/userreclamation.component';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { DashboardComponent } from './components/dashbord/dashbord.component';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    TaskComponent,
    BoardComponent,
    NavbarComponent,
    SidebarComponent,
    BoardDetailComponent,
    SettingsComponent,
    ActivityComponent,
    ProfileComponent,
    EditprofileComponent,
    ReclamationComponent,
    DashbordadminComponent,
    UserreclamationComponent,

  
  ],
  imports: [
    BrowserModule,
    FormsModule,  
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    CommonModule,
    DialogModule,
    DropdownModule,
    BrowserAnimationsModule,
    TableModule,
    ChartModule
  ],
  providers: [MessageService], // Provide MessageService here
  bootstrap: [AppComponent],
})
export class AppModule { }
