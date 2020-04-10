import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/carthelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const cardTitle = product ? product.name : "";
  const cardPrice = product ? product.price : "";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-flat btn-small darken-4 waves-effect blue white-text"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-flat btn-small waves-effect red white-text"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div class="card">
      <div class="card-image">
        <ImageHelper product={product} />
      </div>
      <div class="card-content">
        <p class="truncate" style={{ fontSize: "12px" }}>
          {cardTitle}
        </p>
        <p class="blue-text">{cardPrice}</p>
      </div>
      {getARedirect(redirect)}

      <div className="card-action">
        {showAddToCart(addtoCart)}
        {showRemoveFromCart(removeFromCart)}
      </div>
    </div>
  );
};

export default Card;
