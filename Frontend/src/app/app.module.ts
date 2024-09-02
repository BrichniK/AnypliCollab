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
import { UserreclamationComponent } from './components/userreclamation/userreclamation.component';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { AdminDashboardComponent } from './components/admindashboard/admindashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; 
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

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
    UserreclamationComponent,
    // AdminDashboardComponent
    AdminDashboardComponent


  
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
    ChartModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MessagesModule,
    MessageModule,

  ],
  providers: [MessageService], // Provide MessageService here
  bootstrap: [AppComponent],
})
export class AppModule { }
