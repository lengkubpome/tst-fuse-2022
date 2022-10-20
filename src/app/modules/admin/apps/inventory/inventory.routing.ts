import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { InventoryListComponent } from './components/list/inventory-list.component';

export const inventoryRoutes: Routes = [
    {
        path: '',
        component: InventoryListComponent,
        children: [{ path: '', component: InventoryListComponent }],
    },
];
