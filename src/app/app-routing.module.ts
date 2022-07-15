import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PasswordresetComponent } from './components/passwordreset/passwordreset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupauthComponent } from './components/signupauth/signupauth.component';
import { UserfeedComponent } from './components/userfeed/userfeed.component';
import { UserpageComponent } from './components/userpage/userpage.component';

const routes: Routes = [
  {
    path: '',
    component: UserfeedComponent
  },
  {
    path: 'feed',
    component: UserfeedComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signupauth',
    component: SignupauthComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'passwordreset',
    component: PasswordresetComponent
  },
  {
    path: ':username',
    component: UserpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
