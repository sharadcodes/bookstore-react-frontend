import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper/index";
import { createCategory } from "./helper/adminapicall";
import AdminDashboard from "../user/AdminDashBoard";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create category</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <label>ENTER CATEGORY NAME</label>
      <input
        type="text"
        onChange={handleChange}
        value={name}
        autoFocus
        required
        placeholder="Ex. ICSE, CBSE etc"
      />
      <button onClick={onSubmit} className="btn">
        Create
      </button>
    </form>
  );

  return (
    <AdminDashboard title="CREATE CATEGORY">
      {successMessage()}
      {warningMessage()}
      {myCategoryForm()}
    </AdminDashboard>
  );
};

export default AddCategory;
