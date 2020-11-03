import React from "react";
import "./menu.scss";

import HamburgerMenu from "react-hamburger-menu";

export const Menu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const toggleIsMenuOpen = () => {
    setIsMenuOpen((prevState: boolean): boolean => !prevState);
  };

  return (
    <div className="menu">
      <span className="menu__hamburger">
        <HamburgerMenu
          color="black"
          width={20}
          height={15}
          animationDuration={0.25}
          isOpen={isMenuOpen}
          menuClicked={toggleIsMenuOpen}
        />
      </span>

      <div className="menu__title">
        <span className="menu__heading">Order</span>
        <span> something</span>
      </div>

      <div className="menu__hamburger-menu"
        style={isMenuOpen ? { display: "flex" } : { display: "none" }}
      >
        <nav className="menu__nav">
          <ul className="menu__list">
            <li className="menu__link">About</li>
            <li className="menu__link">Contact</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
