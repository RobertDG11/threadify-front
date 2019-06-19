import React, { Component } from "react";
import "./App.scss";

import { store, persistor } from "./components/redux/store";
import { Provider } from "react-redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Homepage from "./components/Layout/Homepage";
import Professors from "./components/Cards/SimpleCards";
import { PersistGate } from "redux-persist/integration/react";
import LoginRoute from "./components/Routes/LoginRoute";
import AuthRoute from "./components/Routes/AuthRoute";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { loadLiterals } from "./components/redux/actions/actions";
import loadLang from "./i18n";
import customForm from "./components/Forms/CustomForm";
import setupAxiosInterceptors from "./hoc/Interceptor";
import { bindActionCreators } from "redux";
import { clearAuthentication } from "./components/redux/reducers/authReducer";
import OAuth2RedirectHandler from "./components/Modals/Login/OAuthRedirectHandler";
import Frontpage from "./components/Layout/Frontpage";

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication());

class App extends Component {
  componentWillMount() {
    toast.configure({
      autoClose: 8000,
      draggable: false
    });
    loadLang().then(lang => store.dispatch(loadLiterals(lang)));
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div className="Test">
              <Layout>
                <Switch>
                  <Route exact path="/" component={Homepage} />
                  <Route path="/front" component={Frontpage} />
                  <AuthRoute
                    path="/profesori"
                    type={1}
                    component={Professors}
                  />
                  <LoginRoute exact path="/login" component={Homepage} />
                  <LoginRoute exact path="/register" component={Homepage} />
                  <Route
                    path="/oauth2/redirect"
                    component={OAuth2RedirectHandler}
                  />
                </Switch>
              </Layout>
            </div>
          </PersistGate>
        </Provider>
      </Router>
    );
  }
}

export default App;
