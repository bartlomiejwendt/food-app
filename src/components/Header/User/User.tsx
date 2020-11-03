import React from "react";
import "./user.scss";

import { Badge, Drawer } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";

export const User: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const toggleIsVisible = () => {
    setIsVisible((prevState: boolean): boolean => !prevState);
  }

  return (
    <div className="user">
      <Badge count={1} showZero style={{ backgroundColor: "rgb(10, 175, 96)" }}>
        <span className="user__basket" onClick={toggleIsVisible}>
          <ShoppingOutlined className="user__basket-icon" />
        </span>
      </Badge>

      <div className="user__picture">
        <img
          className="user__profile-picture"
          src="https://images.unsplash.com/photo-1466921583968-f07aa80c526e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
          alt="logged user"
        />
      </div>

      <span className="user__name">Jan Kowalski</span>

      <Drawer
        title="Your order"
        placement="right"
        closable={true}
        onClose={toggleIsVisible}
        visible={isVisible}
      >
        Basket
      </Drawer>
    </div>
  );
};
