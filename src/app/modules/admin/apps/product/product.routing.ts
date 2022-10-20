import { Routes } from '@angular/router';
import { ProductListComponent } from './list/product-list.component';
import { ProductComponent } from './product.component';

export const productRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'product',
    },
    {
        path: 'product',
        component: ProductComponent,
        children: [{ path: '', component: ProductListComponent }],
    },
];
