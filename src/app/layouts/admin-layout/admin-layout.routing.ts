import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component'; 
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { EmployeeComponent } from '../../employee/employee.component';
import { AddEmployeeComponent } from '../../add-employee/add-employee.component';
import { EditEmployeeComponent } from '../../edit-employee/edit-employee.component';
import { ViewEmployeeComponent } from '../../view-employee/view-employee.component';
import { LogInComponent } from '../../log-in/log-in.component';
import { TrainingCerticationComponent } from '../../training-certication/training-certication.component';
import { BulkQrcodeComponent } from '../../bulk-qrcode/bulk-qrcode.component';
import { EquipmentsComponent } from '../../equipments/equipments.component';  
import { AddequipmentsComponent } from '../../addequipments/addequipments.component';
import { EditEquipmentComponent } from '../../edit-equipment/edit-equipment.component';
import { ViewEquipmentComponent } from '../../view-equipment/view-equipment.component';
import { ManageEquipmentCategoriesComponent} from '../../manage-equipment-categories/manage-equipment-categories.component';
import { ManageEquipmentItemsComponent} from '../../manage-equipment-items/manage-equipment-items.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'all-employee',        component: EmployeeComponent },
    { path: 'add-employee',        component: AddEmployeeComponent },
    { path: 'edit-employee',        component: EditEmployeeComponent },
    { path: 'view-employee/:id',        component: ViewEmployeeComponent },
    { path: 'training-certication',        component: TrainingCerticationComponent },
    { path: 'bulk-qrcode',        component: BulkQrcodeComponent },
    { path: 'all-equipments',        component: EquipmentsComponent },
    { path: 'add-equipments',        component: AddequipmentsComponent },
    { path: 'edit-equipments',        component: EditEquipmentComponent },
    { path: 'view-equipments/:id',        component: ViewEquipmentComponent },
    { path: 'manage-equipment-categories', component: ManageEquipmentCategoriesComponent},
    { path: 'manage-equipment-items', component: ManageEquipmentItemsComponent },

    // { path: '',        component: LogInComponent },


];
