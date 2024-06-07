import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const navigate = useNavigate();

  return (
    <section
      className="text-gray-600 body-font"
      onClick={() => {
        navigate(`product/${product.id}`);
      }}
    >
      <div className="container px-5 pt-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="p-4">
            <div className="bg-gray-100 p-6 rounded-lg">
              <img
                className="h-40 rounded w-full object-cover object-center mb-6"
                src={product.images[0]}
                alt="content"
              />
              <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                {product.title}
              </h3>
              <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                Category : {product.category}
              </h2>
              <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                Price : {product.price}
              </h2>
              <p className="leading-relaxed text-base">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
