import React, { useEffect, useState } from "react";
import { API } from "../backend";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API}/categories`)
      .then((r) => r.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <React.Fragment>
      <div>
        <div className="scroll-menu-wrapper">
          <small>CATEGORIES</small>
          <small>Scroll left →</small>
        </div>
        <div className="scrollmenu pl-3 pr-3 font-weight-bold">
          {categories &&
            categories.map((cat, index) => {
              return (
                <Link
                  className="waves-effect white deep-orange-text"
                  to="/"
                  key={index}
                >
                  {cat.name}
                </Link>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
}
