import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentDetailComponent } from './payment-details/payment-detail/payment-detail.component';
import { PaymentDetailListComponent } from './payment-details/payment-detail-list/payment-detail-list.component';
import { PaymentDetailService } from './shared/payment-detail.service';
import { FormsModule } from '@angular/forms';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlertComponent } from './user-registration/alert/alert.component';
import { JwtInterceptor } from './user-registration/helper/jwt-interceptor';
import { ErrorInterceptor } from './user-registration/helper/error-interceptor';
import { LoginComponent } from './user-registration/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './user-registration/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    PaymentDetailsComponent,
    PaymentDetailComponent,
    PaymentDetailListComponent,
    NavMenuComponent,
    PageNotFoundComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    PaymentDetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
