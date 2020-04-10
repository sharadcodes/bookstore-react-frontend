import React from "react";
import { Link } from "react-router-dom";
export default function AdminSideBar() {
  return (
    <div className="collection">
      <div className="collection-item">
        <Link className="text-success" to="/admin/dashboard">
          HOME
        </Link>
      </div>
      <div className="collection-item">
        <Link className="text-success" to="/admin/create/category">
          CREATE CATEGORY
        </Link>
      </div>
      <div className="collection-item">
        <Link className="text-success" to="/admin/manage/categories">
          MANAGE CATEGORY
        </Link>
      </div>
      <div className="collection-item">
        <Link className="text-success" to="/admin/create/product">
          CREATE PRODUCT
        </Link>
      </div>
      <div className="collection-item">
        <Link className="text-success" to="/admin/manage/products">
          MANAGE PRODUCTS
        </Link>
      </div>
      <div className="collection-item">
        <Link className="text-success" to="/admin/manage/orders">
          MANAGE ORDERS
        </Link>
      </div>
    </div>
  );
}
