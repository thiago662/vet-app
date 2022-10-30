import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignComponent } from './sign/sign.component';
import { UserComponent } from './user/user.component';
import { UserModalComponent } from './user/user-modal/user-modal.component';
import { OwnerComponent } from './owner/owner.component';
import { AnimalComponent } from './animal/animal.component';
import { InterectionComponent } from './interection/interection.component';
import { InterectionModalComponent } from './interection/interection-modal/interection-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwnerViewComponent } from './owner/owner-view/owner-view.component';
import { AnimalViewComponent } from './animal/animal-view/animal-view.component';

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
  {
    path: 'users',
    component: UserComponent,
    children: [
      { path: ':id', component: UserModalComponent },
    ],
  },
  {
    path: 'owners',
    component: OwnerComponent,
  },
  {
    path: 'owners/:id',
    component: OwnerViewComponent,
  },
  {
    path: 'animals',
    component: AnimalComponent,
  },
  {
    path: 'animals/:id',
    component: AnimalViewComponent,
  },
  {
    path: 'interections',
    component: InterectionComponent,
    children: [
      { path: ':id', component: InterectionModalComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  // {
  //   path: 'lixeira',
  //   component: TrashComponent,
  // },
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
