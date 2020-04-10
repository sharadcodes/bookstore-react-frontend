import React, { useState, useEffect } from "react";
import { updateCategory, getCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import AdminDashboard from "../user/AdminDashBoard";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [catName, setCatName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatedCategory, setUpdatedCategory] = useState(false);

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setCatName(data.name);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    updateCategory(match.params.categoryId, user._id, token, {
      name: catName,
      ok: "asdasdasdas",
    }).then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setUpdatedCategory(true);
        setLoading(false);
      }
    });
  };

  const handleChange = () => (event) => {
    setCatName(event.target.value);
  };

  const errorMessage = () => (
    <span className="red-text">{error ? error : ""}</span>
  );
  const loadingMessage = () => (
    <span className="blue-text">{loading ? "Loading ..." : ""}</span>
  );

  const successMessage = () => (
    <span className="green-text">
      {updatedCategory ? `Category update successfully` : ""}
    </span>
  );

  const createCategoryForm = () => (
    <form>
      <input
        id="name"
        name="name"
        type="text"
        className="validate"
        onChange={handleChange()}
        value={catName}
      />

      <button onClick={onSubmit} className="btn btn-outline-success mb-3">
        Update Category
      </button>
    </form>
  );

  return (
    <AdminDashboard title="UPDATE CATEGORY">
      {errorMessage()}
      {loadingMessage()}
      {successMessage()}
      {createCategoryForm()}
    </AdminDashboard>
  );
};

export default UpdateCategory;
