import { NgModule } from '@angular/core';
import { productRoutes } from './product.routing';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StoreModule } from '@ngrx/store';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './components/list/product-list.component';
import * as fromProduct from './state';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effects';
import { ProductService } from './services/product.service';
import { ProductDetailComponent } from './components/detail/product-detail.component';

@NgModule({
    declarations: [
        ProductComponent,
        ProductListComponent,
        ProductDetailComponent,
    ],
    imports: [
        RouterModule.forChild(productRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        SharedModule,
        StoreModule.forFeature(
            fromProduct.productFeatureKey,
            fromProduct.productReducer
        ),
        EffectsModule.forFeature([ProductEffects]),
    ],
    providers: [ProductService],
})
export class ProductModule {}
