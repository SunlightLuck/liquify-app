import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useMemo, useState } from "react";
import { gapi } from "gapi-script";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Rewards from "./pages/Rewards";
import Validators from "./pages/Validators";
import Myaddresses from "./pages/Myaddresses";
import Profile from "./pages/Profile";
import Getintouch from "pages/Getintouch";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, setUserData } from "store/userReducer";
import useComponentWillMount from "component-will-mount-hook";

const clientId =
  "1078180254414-nfkktkghoviu0jksa5efqlrumq6449jf.apps.googleusercontent.com";

const App = () => {
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const dispatch = useDispatch();
  const { email } = useSelector(userSelector);
  const localData = localStorage.getItem("auth");

  useComponentWillMount(() => {
    if (localStorage.getItem("auth"))
      dispatch(setUserData(JSON.parse(localStorage.getItem("auth"))));
  });

  useMemo(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/getintouch">
            <Getintouch />
          </Route>
          <Route exact path="/home">
            {localData ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/rewards">
            {localData ? <Rewards /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/validators">
            {localData ? <Validators /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/myaddresses">
            {localData ? <Myaddresses /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/myprofile">
            {localData ? <Profile /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
