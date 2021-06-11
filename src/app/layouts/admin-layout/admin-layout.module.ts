import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { EmployeeComponent } from '../../employee/employee.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AddEmployeeComponent } from '../../add-employee/add-employee.component';
import { EditEmployeeComponent } from '../../edit-employee/edit-employee.component';
import { ViewEmployeeComponent } from '../../view-employee/view-employee.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TrainingCerticationComponent } from '../../training-certication/training-certication.component';
import { BulkQrcodeComponent } from '../../bulk-qrcode/bulk-qrcode.component';
import { NgxSpinnerModule } from "ngx-spinner";  
import { EquipmentsComponent } from '../../equipments/equipments.component';  
import { AddequipmentsComponent } from '../../addequipments/addequipments.component';
import { EditEquipmentComponent } from '../../edit-equipment/edit-equipment.component';
import { ViewEquipmentComponent } from '../../view-equipment/view-equipment.component';
import { ManageEquipmentCategoriesComponent} from '../../manage-equipment-categories/manage-equipment-categories.component';
import { ManageEquipmentItemsComponent} from '../../manage-equipment-items/manage-equipment-items.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    NgxQRCodeModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NgxSpinnerModule
  ],
  declarations: [
    DashboardComponent,
    TableListComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    ViewEmployeeComponent,
    TrainingCerticationComponent,
    BulkQrcodeComponent,
    EquipmentsComponent,
    AddequipmentsComponent,
    ViewEquipmentComponent,
    EditEquipmentComponent,
    ManageEquipmentCategoriesComponent,
    ManageEquipmentItemsComponent
    
  ]
})

export class AdminLayoutModule {}
