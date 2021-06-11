import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LogInComponent } from './log-in/log-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PublicViewComponent } from './public-view/public-view.component';
import { EquipmentPublicViewComponent } from './equipment-public-view/equipment-public-view.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full',
  },
   {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]}
  // {
  //   path: '**',
  //   redirectTo: 'all-employee'
  // }
  , {
    path: 'log-in',
    component: LogInComponent,
  },
   {
    path: '',
    component: LogInComponent,
  },
   {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'public-view/:id',
    component: PublicViewComponent,
  },
  {
    path: 'equipment-publicview/:id',
    component: EquipmentPublicViewComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
