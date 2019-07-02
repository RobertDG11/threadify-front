import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import rootReducer from "./reducers/rootReducer";
import authReducer from "./reducers/authReducer";
import schedulerReducer from "./reducers/schedulerReducer";
import literalsReducer from "./reducers/literalsReducer";
import formReducer from "./reducers/formReducer";
import threadReducer from "./reducers/threadReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import postReducer from "./reducers/postReducer";

const persistConfigCarousel = {
  key: "showCarousel",
  storage,
  blacklist: ["registerSucces", "professors"]
};

const persistConfigAuth = {
  key: "auth",
  storage,
  blacklist: ["successMessage", "errorMessage"]
};

const persistConfigForm = {
  key: "form",
  storage
};

const persistedReducerCarousel = persistReducer(
  persistConfigCarousel,
  rootReducer
);
const persistedReducerAuth = persistReducer(persistConfigAuth, authReducer);

const persistedReducerForm = persistReducer(persistConfigForm, formReducer);

const reducer = combineReducers({
  form: reduxFormReducer,
  showCarousel: persistedReducerCarousel,
  auth: persistedReducerAuth,
  scheduler: schedulerReducer,
  literals: literalsReducer,
  formCustom: persistedReducerForm,
  posts: postReducer,
  threads: threadReducer
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
