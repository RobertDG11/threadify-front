import React from "react";
import { Switch, Route } from "react-router-dom";

import Thread from "./Thread";
import CreateThread from "./CreateThread";
import Frontpage from "../Layout/Frontpage";
import AuthRoute from "../Routes/AuthRoute";

const ThreadRoutes = ({ match }) => (
  <Switch>
    <AuthRoute exact path={`${match.url}/new`} component={Frontpage} />
    <Route exact path={`${match.url}/:id`} component={Thread} />
  </Switch>
);

export default ThreadRoutes;
