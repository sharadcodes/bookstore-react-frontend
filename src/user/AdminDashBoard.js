import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import AdminSideBar from "./AdminSideBar";

const AdminDashboard = ({ children }) => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return <AdminSideBar />;
  };

  return (
    <Base title="ADMIN DASHBOARD">
      <span className="card-title chip">
        {name} - {email}
      </span>
      <div className="row">
        <div className="col">{adminLeftSide()}</div>
        <div className="col s10">{children}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
