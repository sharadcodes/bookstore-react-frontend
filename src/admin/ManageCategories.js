import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { getCategories, deleteCategory } from "./helper/adminapicall";
import { Chip } from "react-materialize";
import AdminDashboard from "../user/AdminDashBoard";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <AdminDashboard title="MANAGE categories">
      <div className="row">
        <div className="col s12">
          <Chip close={false} options={null}>
            Category Count: {categories.length}
          </Chip>
          {categories.map((cat, index) => (
            <div key={index} className="row">
              <div className="col s8">
                <p className="">{cat.name}</p>
              </div>
              <div className="col s2">
                <Link
                  className="btn"
                  to={`/admin/category/update/${cat._id}`}
                >
                  Update
                </Link>
              </div>
              <div className="col s2">
                <button
                  onClick={() => {
                    deleteThisCategory(cat._id);
                  }}
                  className="btn red"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminDashboard>
  );
};

export default ManageCategories;
