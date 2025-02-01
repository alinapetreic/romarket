import { Severity } from '../../enums/severity-enums';
import { RootState } from '../../store';
import { showToastr } from './slice';
import { Middleware } from '@reduxjs/toolkit';
import { TOASTR_ACTIONS } from './actions';

interface ToastrAction {
    type: typeof TOASTR_ACTIONS[number],
    payload: {
        message: string;
        severity: Severity;
    };
}

const toastrMiddleware: Middleware<{}, RootState> =
    store => next => (action) => {
        const result = next(action);

        const toastrAction = action as ToastrAction;

        if (TOASTR_ACTIONS.includes(toastrAction.type)) {
            store.dispatch(showToastr({
                message: toastrAction.payload.message,
                severity: toastrAction.payload.severity
            }));
        }

        return result;
    };

export default toastrMiddleware;