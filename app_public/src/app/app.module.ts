import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeListComponent } from './home-list/home-list.component';
import { DistancePipe } from './pipes/distance.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FrameworkComponent } from './views/framework/framework.component';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './views/homepage/homepage.component';


@NgModule({
  declarations: [
    HomeListComponent,
    DistancePipe,
    FrameworkComponent,
    AboutComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomepageComponent},
      {path: 'about', component: AboutComponent},
    ])
  ],
  providers: [],
  bootstrap: [
    FrameworkComponent,
  ]
})
export class AppModule {
}
