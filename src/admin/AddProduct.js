import React, { useState, useEffect } from "react";
import { getCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import { Select } from "react-materialize";
import AdminDashboard from "../user/AdminDashBoard";

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    catgory: "",
    loading: false,
    error: "",
    createdProduct: "",
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    // photo,
    categories,
    // category,
    // loading,
    error,
    createdProduct,
    formData,
  } = values;

  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            photo: "",
            price: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .catch();
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => {
    if (createdProduct) {
      return (
        <h4
          className="teal-text"
          style={{ display: createdProduct ? "" : "none" }}
        >
          {createdProduct} created successfully
        </h4>
      );
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create product</h4>;
    }
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="input-field">
        <input
          onChange={handleChange("photo")}
          type="file"
          name="photo"
          accept="image"
        />
      </div>

      <div className="row">
        <div className="input-field col s12">
          <input
            id="name"
            type="text"
            className="validate"
            onChange={handleChange("name")}
            value={name}
          />
          <label className="active" htmlFor="name">
            Name
          </label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <textarea
            onChange={handleChange("description")}
            name="description"
            id="description"
            value={description}
            style={{ maxWidth: "100%", minWidth: "100%" }}
            className="materialize-textarea"
          />
          <label className="active" htmlFor="description">
            Descrption
          </label>
        </div>
      </div>

      <div className="row">
        <div className="input-field col s12">
          <label className="active" htmlFor="price">
            Price
          </label>
          <input
            onChange={handleChange("price")}
            type="number"
            value={price}
            id="price"
          />
        </div>
      </div>
      <div className="input-field col s12">
        <Select
          multiple={false}
          onChange={handleChange("category")}
          options={{
            classes: "",
            dropdownOptions: {
              alignment: "left",
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              coverTrigger: true,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250,
            },
          }}
          value=""
        >
          <option disabled value="">
            Choose Category
          </option>
          {categories &&
            categories.map((cate, index) => {
              return (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              );
            })}
        </Select>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <label htmlFor="stock">Stock</label>
          <input
            onChange={handleChange("stock")}
            type="number"
            value={stock}
            id="stock"
          />
        </div>
      </div>

      <button onClick={onSubmit} className="btn btn-outline-success mb-3">
        Create Product
      </button>
    </form>
  );

  return (
    <AdminDashboard title="ADD PRODUCT" className="container">
      {successMessage()}
      {warningMessage()}
      {createProductForm()}
    </AdminDashboard>
  );
};

export default AddProduct;
