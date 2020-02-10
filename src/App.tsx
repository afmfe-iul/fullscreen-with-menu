import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import logo from "./assets/logo512.png";
import "./App.css";

function App() {
  const [isCollapsed, setisCollapsed] = useState(false);
  const onClick = () => setisCollapsed(!isCollapsed);

  const menuItems = [];
  for (let i = 0; i < 15; i++) {
    const onClick = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      // structure:
      const aTag = ev.currentTarget;
      const parentMenu = aTag.parentElement;
      let closedSubmenu = false;

      const activeMenuItems = document.getElementsByClassName(
        "MenuItem--active"
      );

      for (let i = 0; i < activeMenuItems.length; i++) {
        const e = activeMenuItems[i];
        if (e) {
          e.classList.remove("MenuItem--active");
          const subMenu = e.lastElementChild as HTMLElement;
          if (subMenu) {
            subMenu.style.maxHeight = "";
          }
          if (e === parentMenu) {
            closedSubmenu = true;
          }
        }
      }

      if (closedSubmenu || parentMenu === null) {
        console.log("early return");
        return;
      }

      parentMenu.classList.add("MenuItem--active");
      const subMenu = aTag.nextElementSibling as HTMLElement | null;
      if (!subMenu) {
        return;
      }
      if (subMenu.style.maxHeight) {
        const a = subMenu.style.display;
        console.log(subMenu.style);
        console.log("removing sub active");
        subMenu.style.maxHeight = "";
        subMenu.classList.remove("SubMenu--active");
      } else {
        // const a = subMenu.style.display;
        // console.log(subMenu.style);
        subMenu.classList.add("SubMenu--active");
        subMenu.style.maxHeight = subMenu.scrollHeight + "px";
      }
    };

    const subMenuItems = (menuNumber: number) => {
      const result = [];
      for (let i = 0; i < 10; i++) {
        const key = `#${menuNumber}-${i}`;

        result.push(
          <li key={key}>
            <a href={key}>
              <Icon className="SubMenuItem-icon" name="home" />
              <span className="SubMenuItem-title">Title {key}</span>
            </a>
          </li>
        );
      }
      return result;
    };
    menuItems.push(
      <li key={i} className="MenuItem">
        <a href={`#${i}`} onClick={onClick}>
          <Icon className="MenuItem-icon" name="home" />
          <span className="MenuItem-title">Title {i}</span>
          {i % 2 === 0 ? (
            <Icon className="MenuItem-arrow" name="arrow down" />
          ) : null}
        </a>
        {i % 2 === 0 ? (
          <ul className="SubMenuItem">{subMenuItems(i)}</ul>
        ) : null}
      </li>
    );
  }

  return (
    <div className={`Container ${isCollapsed ? "Container--collapsed" : ""}`}>
      <div className="LeftMenu">
        <div className="CvIcon">
          <img className="CvIcon-img" src={logo} />
          <span className="CvIcon-title">App Name</span>
        </div>
        <ul className="MenuItems">{menuItems}</ul>
      </div>
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
        <div className="PageContainer-content">Page Content</div>
        <div className="Footer">Footer</div>
      </div>
    </div>
  );
}

export default App;
