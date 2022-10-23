import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from './state';
import * as ProductActions from './state/product.actions';

@Component({
    selector: 'product',
    template: '<router-outlet></router-outlet>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
    constructor(private store: Store<ProductState>) {}

    ngOnInit(): void {
        this.store.dispatch(ProductActions.loadProducts());
    }
}
