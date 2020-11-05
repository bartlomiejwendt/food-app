import React from "react";
import "./usersettings.scss";
import { useHistory } from "react-router-dom";

import { Avatar, Divider, Popconfirm } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export const UserSettings: React.FC = () => {
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem("authUser")!);
  const { avatar, firstName, lastName, email }= currentUser;

  const [uploadFile, setUploadFile] = React.useState<any>();

  const handleUpdateAvatar = (e: any) => {
    const picture: any = e.target.files[0];
    setUploadFile(picture);
  }

  return (
    <div className="user-settings">
      <header className="user-settings__header">
        <h1 className="user-settings__title">Account settings</h1>
        <CloseOutlined onClick={() => history.push("/")} style={{ fontSize: "1.25rem", cursor: "pointer" }} />
      </header>

      <div className="user-settings__photo-wrapper">
        <h2>Your avatar</h2>
        <div className="user-settings__photo">
          <Avatar
            size={48}
            src={ uploadFile ? URL.createObjectURL(uploadFile) : (
              avatar ? avatar : "https://images.unsplash.com/photo-1547046136-81b530776144?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
            )}
          />

          <label
            htmlFor="user-settings__file"
            className="user-settings__upload"
          >
            Upload
          </label>
          <input
            id="user-settings__file"
            type="file"
            accept=".png, .svg, .jpg, .jpeg"
            style={{ display: "none" }}
            onChange={(e) => handleUpdateAvatar(e)}
          />
        </div>
      </div>

      <Divider />

      <div className="user-settings__name">
        <h3>Full name</h3>
        <input
          className="user-settings__input"
          type="text"
          name="fullName"
          placeholder={firstName + " " + lastName}
          defaultValue={firstName + " " + lastName}
        />
      </div>

      <div className="user-settings__email">
        <h3>Email address</h3>
        <input
          disabled
          className="user-settings__input"
          type="email"
          name="email"
          defaultValue={email}
        />
      </div>

      <Divider />

      <div className="user-settings__delete">
        <h3>Delete account</h3>
        <div className="user-settings__warning">
          <div className="user-settings__warning-inner">
            <p className="user-settings__paragraph">By deleting your account you will lose all your data</p>
            <p className="user-settings__paragraph">and access to this account <span className="user-settings--red">permanently.</span></p>
          </div>

          <Popconfirm
            title="Are you sure delete this account?"
            okText="Delete"
            cancelText="No"
          >
            <h4 className="user-settings__delete-account">Delete account</h4>
          </Popconfirm>
        </div>
      </div>

      <Divider />

      <div className="user-settings__user-key">
        <span>Show my unique key</span>
      </div>

      <div className="user-settings__save-changes">
        <button className="user-settings__button">Save changes</button>
      </div>
    </div>
  );
};