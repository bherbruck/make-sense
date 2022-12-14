import { Action, applyMiddleware, createStore, Middleware } from 'redux';
import { AppState, rootReducer } from './store';

const localStoragePersistor: Middleware<AppState> = (store) => (next) => (action) => {
    if (!action.type.startsWith('@@LABELS/')) return next(action);
    const result = next(action);
    const labelsState = store.getState().labels
    console.log({labelsState})
    localStorage.setItem('labels', JSON.stringify(labelsState));
    return result;
};

export default function configureStore() {
    return createStore(
        rootReducer,
        // @ts-ignore
        applyMiddleware(localStoragePersistor),
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}

