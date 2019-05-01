import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { HeroesComponent } from './heroes/heroes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './user-registration/guard/auth.guard';
import { LoginComponent } from './user-registration/login/login.component';
import { RegisterComponent } from './user-registration/register/register.component';

const routes: Routes = [
  {path: '', component: PaymentDetailsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'tutorial/:id', component: HeroesComponent, canActivate: [AuthGuard]},
  { path: 'home',   redirectTo: '/', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
