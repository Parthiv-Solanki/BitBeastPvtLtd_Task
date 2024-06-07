import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  let { id } = useParams();

  const [product, setProduct] = useState([]);

  const getProductById = async () => {
    try {
      let res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getProductById();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }
  console.log("Product==>", product);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 pt-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="p-4">
            <div className="bg-gray-100 p-6 rounded-lg">
              <img
                className="h-40 rounded w-full object-contain object-center mb-6"
                src={product.images && product.images[0]}
                alt={product.title}
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

export default ProductPage;
