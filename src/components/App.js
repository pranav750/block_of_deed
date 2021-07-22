import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../index.css";
import Info from "./Info/Info";
import Properties from "./Properties/Properties";
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import Add from "./Add/Add";
import Update from "./Update/Update";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:id/add">
          <Home />
        </Route>
        <Route exact path="/:id/update">
          <Home />
        </Route>
        <Route exact path="/admin/:address">
          <Info />
        </Route>
        <Route exact path="/admin/add/admin/:address">
          <Add user="admin" />
        </Route>
        <Route exact path="/admin/add/owner/:address">
          <Add user="owner" />
        </Route>
        <Route exact path="/admin/add/property/:address">
          <Add user="property" />
        </Route>
        <Route exact path="/admin/update/property/:address">
          <Update />
        </Route>
        <Route exact path="/admin/owner/properties/:address">
          <Properties />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
