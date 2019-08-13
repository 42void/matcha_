import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ForgotPwd from "./components/ForgotPwd";
import ResetPwd from "./components/ResetPwd";
import MyProfile from "./components/MyProfile";
import MemberProfile from "./components/MemberProfile";
import Inbox from "./components/chat/Inbox";
import Visits from "./components/Visits"

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgotPassword" component={ForgotPwd} />
            <Route path="/resetPassword" component={ResetPwd} />
            <Route path="/home" component={Home} />
            <Route path="/myprofile" component={MyProfile}/>
            <Route path="/profile/:memberId" component={MemberProfile}/>
            <Route path="/inbox" component={Inbox}/>
            <Route path="/visits" component={Visits}/>

          </div>
        </Router>
      </div>
    );
  }
}

export default App;
