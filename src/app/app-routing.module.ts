import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/Auth/profile/profile.component';
import { SigninComponent } from './components/Auth/signin/signin.component';
import { SignupComponent } from './components/Auth/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NailofweekComponent } from './components/nailofweek/nailofweek.component';
import { ServiceDetailsPageComponent } from './components/service-details-page/service-details-page.component';
import { ServicesComponent } from './components/services/services.component';
import { ServicesimagesComponent } from './components/servicesimages/servicesimages.component';
import { UsersComponent } from './components/users/users.component';
import { HOME, NAILOFTHEWEEK, PROFILE, SERVICEDETAILSPAGE, SERVICES, SERVICESIMAGES, SIGNIN, SIGNUP, USERSPAGE } from './components/Utils/constants';
import { AuthGuard } from './services/Auth/auth.guard';

/*
const routes: Routes = [
  { path: '', redirectTo: 'game-room', pathMatch: 'full' },
  { path: 'game-room', component: GameRoomComponent },
];*/
const routes: Routes = [

  { path:SIGNUP, component: AppComponent},
  // { path:'', redirectTo: HOME, pathMatch: 'full' },
  // { path:SIGNIN, component: SigninComponent},
  // { path:SIGNUP, component: SignupComponent},
  // { path:HOME, component: HomePageComponent},
  // { path:SERVICES, component: ServicesComponent,canActivate:[AuthGuard] },
  // { path:SERVICESIMAGES, component: ServicesimagesComponent,canActivate:[AuthGuard] },
  // { path:PROFILE, component: ProfileComponent,canActivate:[AuthGuard] },
  // { path:NAILOFTHEWEEK, component: NailofweekComponent,canActivate:[AuthGuard] },
  // { path:USERSPAGE, component: UsersComponent,canActivate:[AuthGuard] },
  // { path:'service-details/:id', component: ServiceDetailsPageComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule { }
