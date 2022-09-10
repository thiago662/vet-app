import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignComponent } from './sign/sign.component';
import { UserComponent } from './user/user.component';
import { UserModalComponent } from './user/user-modal/user-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'sign',
    component: SignComponent,
  },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  // },
  // {
  //   path: 'lead',
  //   component: LeadComponent,
  // },
  // {
  //   path: 'relatorio',
  //   component: ReportComponent,
  // },
  // {
  //   path: 'lixeira',
  //   component: TrashComponent,
  // },
  {
    path: 'users',
    component: UserComponent,
    children: [
      { path: ':id', component: UserModalComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  // },
  {
    path: '**',
    redirectTo: 'sign',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
