import React, { useMemo, useState } from "react";
import logo from "./assets/logo512.png";
import { MenuEntry, MenuItem } from "./MenuItem";

let collapsible: number | null = null;

interface Props {
  readonly isCollapsed: boolean;
}

export const LeftMenu = ({ isCollapsed }: Props) => {
  const [activeCollapsible, setActiveCollapsible] = useState(collapsible);

  const menuItems = useMemo(() => {
    const result = [];
    for (let i = 0; i < 15; i++) {
      let subMenuItems: undefined | MenuEntry[];
      if (i % 2 === 0) {
        subMenuItems = undefined;
      } else {
        subMenuItems = [];
        for (let j = 0; j < 10; j++) {
          subMenuItems.push({
            iconName: "home",
            linksTo: `/${i}-${j}`,
            title: `Submenu ${i}-${j}`
          });
        }
      }

      const title = `Menu ${i}`;
      const linksTo = `/${i}`;
      const iconName = "home";
      const onCollapsibleMenuClick = () =>
        setActiveCollapsible(s => (i === s ? null : i));

      result.push(
        <MenuItem
          key={i}
          item={{ title, linksTo, iconName }}
          subMenuItems={subMenuItems}
          isExpanded={activeCollapsible === i}
          onExpand={onCollapsibleMenuClick}
          isLeftCollapsed={isCollapsed}
        />
      );
    }
    return result;
  }, [activeCollapsible, isCollapsed]);

  return (
    <div className="LeftMenu">
      <div className="CvIcon">
        <img className="CvIcon-img" src={logo} alt="app-logo" />
        <span className="CvIcon-title">App Name</span>
      </div>
      <ul className="MenuItems">{menuItems}</ul>
    </div>
  );
};
