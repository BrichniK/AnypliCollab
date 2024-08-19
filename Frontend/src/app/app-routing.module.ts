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

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'user',component:UserComponent},
  {path: 'task',component:TaskComponent},
  {path: 'board/show',component:BoardComponent},
  { path: 'board-detail/:id', component: BoardDetailComponent },
  { path: 'setting', component: SettingsComponent },
  { path: 'activity',component: ActivityComponent  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
