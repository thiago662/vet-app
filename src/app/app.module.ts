import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignComponent } from './sign/sign.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { UserModalComponent } from './user/user-modal/user-modal.component';
import { OwnerComponent } from './owner/owner.component';
import { AnimalComponent } from './animal/animal.component';
import { InterectionComponent } from './interection/interection.component';
import { InterectionModalComponent } from './interection/interection-modal/interection-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwnerViewComponent } from './owner/owner-view/owner-view.component';
import { AnimalViewComponent } from './animal/animal-view/animal-view.component';
import { ToastComponent } from './toast/toast.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { LeadComponent } from './lead/lead.component';
// import { TrashComponent } from './trash/trash.component';
// import { ReportComponent } from './report/report.component';
// import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    HeaderComponent,
    NavComponent,
    // ProfileComponent,
    NavComponent,
    HeaderComponent,
    UserComponent,
    UserModalComponent,
    OwnerComponent,
    AnimalComponent,
    InterectionComponent,
    InterectionModalComponent,
    DashboardComponent,
    OwnerViewComponent,
    AnimalViewComponent,
    ToastComponent,
    // DashboardComponent,
    // LeadComponent,
    // TrashComponent,
    // ReportComponent,
    // LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    AngularEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
