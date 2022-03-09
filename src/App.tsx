import React from "react";
import { Route, Switch } from "react-router-dom";
import Detail from "./components/Detail";
import Home from "./components/Home";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/images/:id" component={Detail} />
    </Switch>
  );
}
