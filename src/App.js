import React, { Component } from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Navbar from "./components/Navbar";
import News from "./components/News";

// 40b5c56bdd1a433190a6e7f7c0ffe286

export default class App extends Component {
  state = {
    progress: 0,
  };
  setProgress = (updatedProgress) => {
    console.log("I am being runned", updatedProgress);
    this.setState = {
      progress: updatedProgress,
    };
  };
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color="#f11946"
            height={4}
            progress={this.state.progress}
            onLoaderFinished={this.setProgress(0)}
          />
          <Switch>
            <Route path="/business" exact>
              <News
                setProgress={this.setProgress}
                key="business"
                pageSize={10}
                country="in"
                category="business"
              />
            </Route>
            <Route path="/sports" exact>
              <News
                setProgress={this.setProgress}
                key="sports"
                pageSize={10}
                country="in"
                category="sports"
              />
            </Route>
            <Route path="/technology" exact>
              <News
                setProgress={this.setProgress}
                key="technology"
                pageSize={10}
                country="in"
                category="technology"
              />
            </Route>
            <Route path="/entertainment" exact>
              <News
                setProgress={this.setProgress}
                key="entertainment"
                pageSize={10}
                country="in"
                category="entertainment"
              />
            </Route>
            <Route path="/" exact>
              <News
                setProgress={this.setProgress}
                key="general"
                pageSize={5}
                country="in"
                category="general"
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
