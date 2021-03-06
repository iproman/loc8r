import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './views/homepage/homepage.component';
import { DetailsPageComponent } from './views/details-page/details-page.component';
import { AboutComponent } from './views/about/about.component';
import { RegisterComponent } from './views/register/register.component';
import { LoginComponent } from './views/login/login.component';
import { CanDeactivateService } from './guards/can-deactivate.service';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'location/:locationId',
    component: DetailsPageComponent,
    canDeactivate: [
      CanDeactivateService,
    ]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    CanDeactivateService,
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
