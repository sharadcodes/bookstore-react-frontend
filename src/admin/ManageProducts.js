import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { getProducts, deleteProduct } from "./helper/adminapicall";
import { Chip } from "react-materialize";
import AdminDashboard from '../user/AdminDashBoard';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <AdminDashboard title="MANAGE PRODUCTS">
      <div className="row">
        <div className="col s12">
          <Chip close={false} options={null}>
            Products Count: {products.length}
          </Chip>
          {products.map((prod, index) => (
            <div key={index} className="row">
              <div className="col s8">
                <p className="">{prod.name}</p>
              </div>
              <div className="col s2">
                <Link
                  className="btn"
                  to={`/admin/product/update/${prod._id}`}
                >
                  Update
                </Link>
              </div>
              <div className="col s2">
                <button
                  onClick={() => {
                    deleteThisProduct(prod._id);
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

export default ManageProducts;
