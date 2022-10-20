import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { InventoryListComponent } from './list/inventory-list.component';

export const inventoryRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inventory',
    },
    {
        path: 'inventory',
        component: InventoryComponent,
        children: [{ path: '', component: InventoryListComponent }],
    },
];
