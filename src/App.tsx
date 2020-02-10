import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import "./App.css";
import { LeftMenu } from "./LeftMenu";

function App() {
  const [isCollapsed, setisCollapsed] = useState(false);
  const onClick = () => setisCollapsed(!isCollapsed);

  return (
    <BrowserRouter>
      <div className={`Container ${isCollapsed ? "Container--collapsed" : ""}`}>
        <LeftMenu isCollapsed={isCollapsed} />
        <div className="PageContainer">
          <div className="TopSearch">
            <button className="TopSearch-icon" onClick={onClick}>
              <Icon name="sidebar" />
            </button>
            <span>
              <Icon name="sign-out" />
              Logout
            </span>
          </div>
          <Switch>
            <Route
              path="/"
              component={() => (
                <div className="PageContainer-content">Page Content</div>
              )}
            />
          </Switch>
          <div className="Footer">Footer</div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
