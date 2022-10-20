export const enum LoadingState {
    init = 'INIT',
    loading = 'LOADING',
    loaded = 'LOADED',
}

export interface ErrorState {
    errorMsg: string;
}

export type CallState = LoadingState | ErrorState;

// Helper function to extract error, if there is one.
export const getError = (callState: CallState): string | null => {
    if ((callState as ErrorState).errorMsg !== undefined) {
        return (callState as ErrorState).errorMsg;
    }
    return null;
};

// Ref: https://medium.com/angular-in-depth/ngrx-how-and-where-to-handle-loading-and-error-states-of-ajax-calls-6613a14f902d
