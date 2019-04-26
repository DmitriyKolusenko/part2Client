import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, Input } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { AutorizationComponent } from './autorization/autorization.component';
import { ProductsComponent } from './products/products.component';
import { ClientsComponent } from './clients/clients.component';
import { TsShopFilterPipe } from './pipes/ts-shop-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { SalesstatisticsComponent } from './salesstatistics/salesstatistics.component';
import { BucketComponent } from './bucket/bucket.component';



const appRoutes: Routes = [
  {path: 'bucket', component: BucketComponent},
  { path: 'autorization', component: AutorizationComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'orders', component: OrdersComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'salesstatistics', component: SalesstatisticsComponent},
  { path: '',
    redirectTo: '/autorization',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    BucketComponent,
    AutorizationComponent,
    ClientsComponent,
    ProductsComponent,
    OrdersComponent,
    ProfileComponent,
    SalesstatisticsComponent,
    TsShopFilterPipe

  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule {

 }