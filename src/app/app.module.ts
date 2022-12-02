import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ServicesComponent } from './components/services/services.component';
import { BookingComponent } from './components/booking/booking.component';
import { SigninComponent } from './components/Auth/signin/signin.component';
import { SignupComponent } from './components/Auth/signup/signup.component';
import { ServicesimagesComponent } from './components/servicesimages/servicesimages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { ServiceDetailsPageComponent } from './components/service-details-page/service-details-page.component';
import { ToastrModule } from 'ngx-toastr';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';

import { MatIconModule } from '@angular/material/icon';
import { TokenInterceptor } from './token-interceptor';
import { ACCESSTOKEN } from './components/Utils/constants';
import { JwtModule, JwtModuleOptions, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ProfileComponent } from './components/Auth/profile/profile.component';
import { NailofweekComponent } from './components/nailofweek/nailofweek.component';
import { UsersComponent } from './components/users/users.component';

export function jwtOptionsFactory(storage: LocalStorageService) {
  return {
    tokenGetter: () => storage.retrieve(ACCESSTOKEN),
    whitelistedDomains: ['localhost:8080']
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ServicesComponent,
    BookingComponent,
    SigninComponent,
    SignupComponent,
    ServicesimagesComponent,
    HeaderComponent,
    ServiceDetailsPageComponent,
    ProfileComponent,
    NailofweekComponent,
    UsersComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,

    HttpClientModule,
    MatMenuModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot(),

    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [LocalStorageService]
      }
    }),






  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
