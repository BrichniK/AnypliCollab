import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { TaskComponent } from './components/task/task.component';
import { ProjectComponent } from './components/project/project.component';
import { BoardComponent } from './components/board/board.component';
import { NotfoundComponent } from './components/notfound/notfound.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'user',component:UserComponent},
  {path: 'task',component:TaskComponent},
  {path: 'board',component:BoardComponent},
  {path: 'project',component:ProjectComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
