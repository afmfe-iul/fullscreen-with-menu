import React from "react";
import { Icon, SemanticICONS } from "semantic-ui-react";
import AnimateHeight from "react-animate-height";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

export interface MenuEntry {
  readonly title: string;
  readonly iconName: SemanticICONS;
  readonly linksTo: string;
}

interface Props extends RouteComponentProps {
  readonly item: MenuEntry;
  readonly isLeftCollapsed: boolean;
  readonly isExpanded?: boolean;
  readonly onExpand?: () => void;
  readonly subMenuItems?: ReadonlyArray<MenuEntry>;
}

export const MenuItem = withRouter((props: Props) => {
  const { isLeftCollapsed, subMenuItems, isExpanded, onExpand } = props;
  const { title, iconName, linksTo } = props.item;
  const { pathname } = props.location;
  const active =
    pathname === linksTo ||
    isExpanded ||
    (subMenuItems && subMenuItems.find(e => pathname === e.linksTo));
  const subMenuHeight = isExpanded ? "auto" : 0;

  return (
    <li className={`MenuItem${active ? " MenuItem--active" : ""}`}>
      <Link to={subMenuItems ? "#" : linksTo} onClick={onExpand}>
        <Icon className="MenuItem-icon" name={iconName} />
        <span className="MenuItem-title">{title}</span>
        {subMenuItems && (
          <Icon
            className="MenuItem-arrow"
            name={isExpanded ? "arrow down" : "arrow left"}
          />
        )}
      </Link>
      {subMenuItems && (
        <AnimateHeight
          className="SubMenuItem"
          easing="ease-out"
          duration={isLeftCollapsed && !active ? 0 : 500}
          height={subMenuHeight}
        >
          <ul>
            {subMenuItems.map((entry, index) => {
              return (
                <li key={index}>
                  <Link to={entry.linksTo}>
                    <Icon className="SubMenuItem-icon" name={entry.iconName} />
                    <span className="SubMenuItem-title">{entry.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </AnimateHeight>
      )}
    </li>
  );
});
