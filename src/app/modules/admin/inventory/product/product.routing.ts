import { Routes } from '@angular/router';
import { ProductDetailComponent } from './components/detail/product-detail.component';
import { ProductListComponent } from './components/list/product-list.component';
import { CanDeactivateProductDetails } from './guards/product.guard';
import { ProductComponent } from './product.component';

export const productRoutes: Routes = [
    {
        path: '',
        component: ProductComponent,
        children: [
            {
                path: '',
                component: ProductListComponent,
                children: [
                    {
                        path: ':id',
                        component: ProductDetailComponent,
                        canDeactivate: [CanDeactivateProductDetails],
                    },
                ],
            },

            { path: '**', redirectTo: '', pathMatch: 'full' },
        ],
    },
];
