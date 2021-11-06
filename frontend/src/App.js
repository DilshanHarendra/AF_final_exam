import React, {Component} from 'react';

import './App.css';
import Home from "./Views/HomePage";
import Header from "./Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch ,BrowserRouter as Router} from 'react-router-dom';

import AddNewPost from "./Views/AddNewPost";
import ViewPost from "./Views/ViewPost";
import AllPosts from "./Views/AllPosts";
import UpdatePost from "./Views/UpdatePost";
import Login from "./Views/Login";

class App extends Component{


  render() {
      return (

          <Router>
              <div className="App">
                  <Header/>
                  <Switch>
                      <Route path="/" exact component={Home} />
                      <Route path="/lessons" exact component={AllPosts}/>
                      <Route path="/addnewpost" exact component={AddNewPost}/>
                      <Route path="/viewpost/:id" exact component={ViewPost}/>
                      <Route path="/updatepost/:id" exact component={UpdatePost}/>
                      <Route path="/login" exact component={Login}/>
                   </Switch>

              </div>
          </Router>

      );
  }


}

export default App;
