import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { TaskComponent } from './components/task/task.component';
import { BoardComponent } from './components/board/board.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';
import { SettingsComponent } from './components/setting/setting.component';
import { ActivityComponent } from './components/activity/activity.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { UserreclamationComponent } from './components/userreclamation/userreclamation.component';
import { DashboardComponent } from './components/dashbord/dashbord.component';
import { AdminDashboardComponent } from './components/admindashboard/admindashboard.component';



const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'user',component:UserComponent},
  {path: 'task/show',component:TaskComponent},
  {path: 'board/show',component:BoardComponent},
  { path: 'board/showById/:id', component: BoardDetailComponent },
  { path: 'user/show', component: SettingsComponent },
  { path: 'activity',component: ActivityComponent  },
  { path: 'addreclamation',component: UserreclamationComponent  },
  { path: 'reclamation',component: ReclamationComponent  },
  { path: 'admindashbord',component: AdminDashboardComponent  },
  { path: 'dashbord',component: DashboardComponent  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
