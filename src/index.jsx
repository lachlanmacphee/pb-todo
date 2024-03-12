/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";

import Login from "./routes/Login";
import Signup from "./routes/Signup";
import App from "./routes/App";
import NotFound from "./routes/NotFound";

render(
  () => (
    <Router>
      <Route path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/app" component={App} />
      <Route path="*404" component={NotFound} />
    </Router>
  ),
  document.getElementById("root")
);
