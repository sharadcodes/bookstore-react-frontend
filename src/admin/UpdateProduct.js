import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import { Select } from "react-materialize";
import AdminDashboard from "../user/AdminDashBoard";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  //TODO: work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="container green-text"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} updated successfully</h4>
    </div>
  );

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
      <div class="input-field col s12">
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
          <label forHtml="stock">Stock</label>
          <input
            onChange={handleChange("stock")}
            type="number"
            value={stock}
            id="stock"
          />
        </div>
      </div>

      <button onClick={onSubmit} className="btn green">
        Update Product
      </button>
    </form>
  );

  return (
    <AdminDashboard title="MANAGE PRODUCTS">
      {successMessage()}
      {createProductForm()}
    </AdminDashboard>
  );
};

export default UpdateProduct;
