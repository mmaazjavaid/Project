import { configureStore } from "@reduxjs/toolkit";
import { rootReducer, rootSaga } from "./ducks";
import sagaMiddleware from "./middlewares/saga";

export default configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)