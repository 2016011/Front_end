import logo from './logo.svg';
import './App.css';

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import List_Visitor_Component from './components/List_Visitor_Component';
import CreateVisitorComponent from './components/Create_Visitor';

import EventBus from "./common/EventBus";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        AuthService.logout();
        this.setState({
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

        return ( <
            div >
            <
            Router >
            <
            nav className = "navbar navbar-expand navbar-dark bg-dark" >
            <
            Link to = { "/" }
            className = "navbar-brand" >
            Visitor Management System <
            /Link> <
            div className = "navbar-nav mr-auto" >
            <
            li className = "nav-item" >
            <
            Link to = { "/home" }
            className = "nav-link" >
            Home <
            /Link> <
            /li>

            {
                showModeratorBoard && ( <
                    li className = "nav-item" >
                    <
                    Link to = { "/mod" }
                    className = "nav-link" >
                    Moderator Board <
                    /Link> <
                    /li>
                )
            }

            {
                showAdminBoard && ( <
                    li className = "nav-item" >
                    <
                    Link to = { "/admin" }
                    className = "nav-link" >
                    Admin Board <
                    /Link> <
                    /li>
                )
            }

            {
                currentUser && ( <
                    li className = "nav-item" >
                    <
                    Link to = { "/user" }
                    className = "nav-link" >
                    User <
                    /Link> <
                    Link to = { "/visitors" }
                    className = "nav-link" >
                    ViewVisitors <
                    /Link> <
                    /li>
                )
            } <
            /div>

            {
                currentUser ? ( <
                    div className = "navbar-nav ml-auto" >
                    <
                    li className = "nav-item" >
                    <
                    Link to = { "/profile" }
                    className = "nav-link" > { currentUser.username } <
                    /Link>

                    <
                    /li> <
                    li className = "nav-item" >
                    <
                    a href = "/login"
                    className = "nav-link"
                    onClick = { this.logOut } >
                    LogOut <
                    /a> <
                    /li> <
                    /div>
                ) : ( <
                    div className = "navbar-nav ml-auto" >
                    <
                    li className = "nav-item" >
                    <
                    Link to = { "/login" }
                    className = "nav-link" >
                    Login <
                    /Link> <
                    /li>

                    <
                    li className = "nav-item" >
                    <
                    Link to = { "/register" }
                    className = "nav-link" >
                    Sign Up <
                    /Link> <
                    /li> <
                    /div>
                )
            } <
            /nav>

            <
            div className = "container mt-3" >
            <
            Switch >
            <
            Route exact path = {
                ["/", "/home"] }
            component = { Home }
            /> <
            Route exact path = "/login"
            component = { Login }
            /> <
            Route exact path = "/register"
            component = { Register }
            /> <
            Route exact path = "/profile"
            component = { Profile }
            /> <
            Route exact path = "/visitors"
            component = { List_Visitor_Component }
            /> <
            Route path = "/add-visitor/:id"
            component = { CreateVisitorComponent }
            /> <
            Route path = "/user"
            component = { BoardUser }
            /> <
            Route path = "/mod"
            component = { BoardModerator }
            /> <
            Route path = "/admin"
            component = { BoardAdmin }
            /> <
            /Switch> <
            /div>

            { /*<AuthVerify logOut={this.logOut}/> */ } <
            /Router> <
            /div>
        );
    }
}


/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

export default App;