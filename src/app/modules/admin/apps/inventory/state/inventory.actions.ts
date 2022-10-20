import { IProduct, IProductOption } from './../models/inventory.model';
import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction('[Inventory] Load Inventory');

export const loadProductsSuccess = createAction(
    '[Inventory] Load Inventory Inventory Product Success',
    props<{ products: IProduct[] }>()
);

export const loadProductsFailure = createAction(
    '[Inventory] Load Inventory Inventory Product Failure',
    props<{ errorMessage: string }>()
);

export const addProduct = createAction(
    '[Inventory] Add Inventory',
    props<{ product: IProduct }>()
);

export const addProductSuccess = createAction(
    '[Inventory] Add Inventory Inventory Product Success'
    // props<{ product: IProduct }>()
);

export const addProductFailure = createAction(
    '[Inventory] Add Inventory Inventory Product Failure',
    props<{ errorMessage: string }>()
);

export const updateProduct = createAction(
    '[Inventory] Update Inventory',
    props<{ updateProduct: IProduct }>()
);
export const updateProductSuccess = createAction(
    '[Inventory] Update Inventory Inventory Product Success'
    // props<{ updateProduct: IProduct }>()
);
export const updateProductFailure = createAction(
    '[Inventory] Update Inventory Inventory Product Failure',
    props<{ errorMessage: string }>()
);

export const deleteProduct = createAction(
    '[Inventory] Delete Inventory',
    props<{ product: IProduct }>()
);

export const deleteProductSuccess = createAction(
    '[Inventory] Delete Inventory Inventory Product Success'
);

export const deleteProductFailure = createAction(
    '[Inventory] Delete Inventory Inventory Product Failure',
    props<{ errorMessage: string }>()
);

// Inventory Product Option

export const loadProductOptions = createAction(
    '[Inventory] Load Inventory Inventory Product Options'
);

export const loadProductOptionsSuccess = createAction(
    '[Inventory] Load Inventory Product Options Success',
    props<{ productOptions: IProductOption[] }>()
);

export const loadProductOptionsFailure = createAction(
    '[Inventory] Load Inventory Product Options Failure',
    props<{ errorMessage: string }>()
);

export const addProductOption = createAction(
    '[Inventory] Add Inventory Product Option',
    props<{ option: IProductOption }>()
);

export const addProductOptionSuccess = createAction(
    '[Inventory] Add Inventory Product Option Success'
);

export const addProductOptionFailure = createAction(
    '[Inventory] Add Inventory Product Option Failure',
    props<{ errorMessage: string }>()
);

export const updateProductOption = createAction(
    '[Inventory] Update Inventory Product Option',
    props<{ updateOption: IProductOption }>()
);
export const updateProductOptionSuccess = createAction(
    '[Inventory] Update Inventory Product Option Success'
);
export const updateProductOptionFailure = createAction(
    '[Inventory] Update Inventory Product Option Failure',
    props<{ errorMessage: string }>()
);

export const deleteProductOption = createAction(
    '[Inventory] Delete Inventory Product Option',
    props<{
        deleteOption: IProductOption;
    }>()
);

export const deleteProductOptionSuccess = createAction(
    '[Inventory] Delete Inventory Product Option Success',
    props<{ deleteOption: IProductOption }>()
);

export const deleteProductOptionFailure = createAction(
    '[Inventory] Delete Inventory Product Option Failure',
    props<{ errorMessage: string }>()
);

export const addProductHistory = createAction(
    '[Inventory] Add Inventory Product History',
    props<{ newData: IProduct; oldData: IProduct }>()
);

export const addProductHistorySuccess = createAction(
    '[Inventory] Add Inventory Product History Success'
    // props<{ history: IProductHistory }>()
);

export const swapProductOption = createAction(
    '[Inventory] Swap Inventory Product Option',
    props<{
        option1: IProductOption;
        option2: IProductOption;
    }>()
);

export const swapProductOptionSuccess = createAction(
    '[Inventory] Swap Inventory Product Option Success'
);
export const swapProductOptionFailure = createAction(
    '[Inventory] Swap Inventory Product Option Failure',
    props<{ errorMessage: string }>()
);

export const productActionFailure = createAction(
    '[Inventory] Inventory Product Action Failure',
    props<{ errorMessage: string }>()
);
