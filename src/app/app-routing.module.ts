import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent} from './components/user/user-login/user-login.component';
import { HomeComponent } from './components/main/home/home.component';

const routes: Routes = [
  { path: 'userLoginComponent', component: UserLoginComponent },
  { path: 'HomeComponent', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
