import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ActivitiesComponent } from './activities/activities.component';
import { BlogComponent } from './blog/blog.component';
import { DetailsActivityComponent } from './details-activity/details-activity.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [

  { path: 'home', component:HomeComponent },
  { path: 'login',        component: LoginComponent },
  {path : 'register', component: RegisterComponent},
  { path: 'aboutus', component: AboutusComponent},
  { path: 'resetPassword', component: ResetPasswordComponent},
  // { path: '',   redirectTo: '/home', pathMatch: 'full' }, 
  {path : 'logout',component:LogoutComponent},
  {path : 'activities',component: ActivitiesComponent},
  {path: 'detailsActivity/:id',component:DetailsActivityComponent},
  {path: 'blog',component:BlogComponent},
  {path : 'not-found',component : PagenotfoundComponent},
  { path: '**',redirectTo:'/not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
