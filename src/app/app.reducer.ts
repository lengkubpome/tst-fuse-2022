import {
    Action,
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer,
} from '@ngrx/store';
import { environment } from '../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import { InjectionToken } from '@angular/core';

export interface AppState {
    router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
    ActionReducerMap<AppState, Action>
>('Root reducers token', {
    factory: (): any => ({
        // [fromCore.coreFeatureKey]: fromCore.coreReducer,
        // [fromShared.sharedFeatureKey]: fromShared.sharedReducer,
        // [fromAuth.authFeatureKey]: fromAuth.reducer,
        router: fromRouter.routerReducer,
        // [fromProduct.productFeatureKey]: fromProduct.productReducer,
    }),
});
export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? []
    : [];
