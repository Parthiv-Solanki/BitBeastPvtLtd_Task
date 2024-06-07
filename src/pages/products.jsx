import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../components/Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchData = async () => {
    try {
      let res = await axios.get("https://dummyjson.com/products");
      const products = res.data.products;
      setProducts(products);
      filterCategories(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterCategories = (products) => {
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    setCategories(categories);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const isInCategory = selectedCategories.length
      ? selectedCategories.includes(product.category)
      : true;
    const isInPriceRange =
      (minPrice === "" || product.price >= minPrice) &&
      (maxPrice === "" || product.price <= maxPrice);
    return isInCategory && isInPriceRange;
  });

  return (
    <>
      <div className="mb-4 App">
        <div>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="mr-2 p-2 border"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="p-2 border"
          />
        </div>
        {categories.map((category, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={category}
              value={category}
              onChange={() => handleCategoryChange(category)}
              checked={selectedCategories.includes(category)}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredProducts.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </>
  );
};

export default Products;
