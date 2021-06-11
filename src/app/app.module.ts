import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LogInComponent } from './log-in/log-in.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PublicViewComponent } from './public-view/public-view.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { EquipmentPublicViewComponent } from './equipment-public-view/equipment-public-view.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    CommonModule,
    Ng2SearchPipeModule,
    NgxQRCodeModule,
    NgMultiSelectDropDownModule,
    NgxSpinnerModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LogInComponent,
    ForgotPasswordComponent,
    PublicViewComponent,
    EquipmentPublicViewComponent,
  
   
  

  ],
  providers: [LogInComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
