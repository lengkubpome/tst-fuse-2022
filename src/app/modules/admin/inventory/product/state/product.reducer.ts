import { IProduct, IProductOption } from './../models/product.model';
import { Action, createReducer, on, State } from '@ngrx/store';
import { CallState, LoadingState, ErrorState } from '@shared/models/call-state';
import * as ProductActions from './product.actions';

export const productFeatureKey = 'product';

export interface ProductState {
    products: IProduct[];
    productOptions: IProductOption[];
    callState: CallState;
}

const initialState: ProductState = {
    products: [],
    productOptions: [],
    callState: LoadingState.init,
};

export const productReducer = createReducer<ProductState>(
    initialState,
    // Load Product
    on(
        ProductActions.loadProducts,
        (state): ProductState => ({
            ...state,
            callState: LoadingState.loading,
        })
    ),

    on(
        ProductActions.loadProductsSuccess,
        (state, action): ProductState => ({
            ...state,
            products: action.products,
            // callState: LoadingState.loaded,
        })
    ),
    on(
        ProductActions.loadProductsFailure,
        (state, action): ProductState => ({
            ...state,
            callState: { errorMsg: action.errorMessage },
        })
    ),

    // Add Product
    on(
        ProductActions.addProduct,
        (state): ProductState => ({
            ...state,
            callState: LoadingState.loading,
        })
    ),
    on(
        ProductActions.addProductSuccess,
        (state, action): ProductState => ({
            ...state,
            // products: [...state.products, action.product],
            callState: LoadingState.loaded,
        })
    ),
    on(
        ProductActions.addProductFailure,
        (state, action): ProductState => ({
            ...state,
            callState: { errorMsg: action.errorMessage },
        })
    ),
    // Update Product
    on(
        ProductActions.updateProduct,
        (state): ProductState => ({
            ...state,
            callState: LoadingState.loading,
        })
    ),
    on(
        ProductActions.updateProductSuccess,
        (state, action): ProductState => ({
            ...state,
            callState: LoadingState.loaded,
        })
    ),
    on(
        ProductActions.updateProductFailure,
        (state, action): ProductState => ({
            ...state,
            callState: { errorMsg: action.errorMessage },
        })
    ),

    // Add Product History
    on(
        ProductActions.addProductHistory,
        (state): ProductState => ({
            ...state,
            callState: LoadingState.loading,
        })
    ),
    on(
        ProductActions.addProductHistorySuccess,
        (state, action): ProductState => ({
            ...state,
            callState: LoadingState.loading,
        })
    ),
    // Delete Product
    on(
        ProductActions.deleteProduct,
        (state): ProductState => ({
            ...state,
            callState: LoadingState.loading,
        })
    ),
    on(
        ProductActions.deleteProductSuccess,
        (state, action): ProductState => ({
            ...state,
            callState: LoadingState.loaded,
        })
    ),
    on(
        ProductActions.deleteProductFailure,
        (state, action): ProductState => ({
            ...state,
            callState: { errorMsg: action.errorMessage },
        })
    ),
    // TODO: Product Option
    on(
        ProductActions.loadProductOptions,
        (state): ProductState => ({
            ...state,
            callState: LoadingState.loading,
        })
    ),
    on(
        ProductActions.loadProductOptionsSuccess,
        (state, action): ProductState => ({
            ...state,
            productOptions: action.productOptions,
            callState: LoadingState.loaded,
        })
    ),
    on(
        ProductActions.loadProductOptionsFailure,
        (state, action): ProductState => ({
            ...state,
            callState: { errorMsg: action.errorMessage },
        })
    ),

    on(
        ProductActions.addProductOption,
        (state): ProductState => ({
            ...state,
            callState: LoadingState.loading,
        })
    ),
    on(
        ProductActions.addProductOptionSuccess,
        (state, action): ProductState => ({
            ...state,
            callState: LoadingState.loaded,
        })
    ),
    on(
        ProductActions.addProductOptionFailure,
        (state, action): ProductState => ({
            ...state,
            callState: { errorMsg: action.errorMessage },
        })
    ),
    on(
        ProductActions.updateProductOption,
        (state): ProductState => ({
            ...state,
            callState: LoadingState.loading,
        })
    ),
    on(
        ProductActions.updateProductOptionSuccess,
        (state, action): ProductState => ({
            ...state,
            callState: LoadingState.loaded,
        })
    ),
    on(
        ProductActions.updateProductOptionFailure,
        (state, action): ProductState => ({
            ...state,
            callState: { errorMsg: action.errorMessage },
        })
    ),
    on(
        ProductActions.deleteProductOption,
        (state): ProductState => ({
            ...state,
            callState: LoadingState.loading,
        })
    ),

    on(
        ProductActions.deleteProductOptionSuccess,
        (state): ProductState => ({
            ...state,
            callState: LoadingState.loaded,
        })
    ),

    on(
        ProductActions.deleteProductOptionFailure,
        (state, action): ProductState => ({
            ...state,
            callState: { errorMsg: action.errorMessage },
        })
    ),

    on(
        ProductActions.swapProductOption,
        (state): ProductState => ({
            ...state,
            callState: LoadingState.loading,
        })
    ),
    on(
        ProductActions.swapProductOptionSuccess,
        (state, action): ProductState => ({
            ...state,
            callState: LoadingState.loaded,
        })
    ),
    on(
        ProductActions.swapProductOptionFailure,
        (state, action): ProductState => ({
            ...state,
            callState: { errorMsg: action.errorMessage },
        })
    ),
    on(
        ProductActions.addProductFailure,
        (state, action): ProductState => ({
            ...state,
            callState: { errorMsg: action.errorMessage },
        })
    )
);
