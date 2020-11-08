import React from "react";
import "./user.scss";
import { useHistory } from "react-router-dom";
import { useTrackedState } from "../../../store/store";

import { Basket } from "../../Basket/Basket";

import { Badge, Drawer, Dropdown, Menu, message } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";

export const User: React.FC = () => {
  const history = useHistory();
  const state = useTrackedState();
  const currentUser = JSON.parse(localStorage.getItem("authUser")!);
  const { fullName, avatar } = currentUser;

  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const toggleIsVisible = () => {
    setIsVisible((prevState: boolean): boolean => !prevState);
  }

  const handleSignOut = () => {
    localStorage.clear();
    history.push("/login");
    message.success("Successfully signed out.")
  }

  const userDropdown = (
    <Menu>
      <Menu.Item onClick={() => history.push("/history")}>History</Menu.Item>
      <Menu.Item onClick={() => history.push("/settings")}>Settings</Menu.Item>
      <Menu.Item onClick={() => handleSignOut()}>Log out</Menu.Item>
    </Menu>
  )

  return (
    <div className="user">
      <Badge count={state.basket.length} showZero style={{ backgroundColor: "rgb(10, 175, 96)" }}>
        <span className="user__basket" onClick={toggleIsVisible}>
          <ShoppingOutlined className="user__basket-icon" />
        </span>
      </Badge>

      <div className="user__picture">
        <img
          className="user__profile-picture"
          src={ avatar ? avatar : "https://images.unsplash.com/photo-1466921583968-f07aa80c526e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"}
          alt="logged user"
        />
      </div>

      <Dropdown overlay={userDropdown} trigger={['click']}>
        <span className="user__name">{fullName}</span>
      </Dropdown>

      <Drawer
        title="Your order"
        placement="right"
        closable={true}
        onClose={toggleIsVisible}
        visible={isVisible}
      >
        <Basket />
      </Drawer>
    </div>
  );
};
