import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './product.component';

export const productRoutes: Routes = [
    {
        path: '',
        component: ProductComponent,
        children: [{ path: '', component: ProductListComponent }],
    },
];
