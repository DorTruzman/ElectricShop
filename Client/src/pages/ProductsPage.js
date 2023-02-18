import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import Sidebar from "../components/Sidebar";
import { getEntities, searchEntity } from "../services/fetchService";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [params, setParams] = useState({});

  useEffect(() => {
    searchEntity({ name: "product", params }).then((productList) => {
      setProducts(productList);
    });

    getEntities({ name: "productType" }).then((productTypeList) => {
      setProductTypes(productTypeList);
    });
  }, [params]);

  return (
    <>
      <Sidebar productTypes={productTypes} searchFunction={setParams} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "240px",
        }}
      >
        {products.map((product) => (
          <>
            <Product
              {...product}
              searchProductsByType={(type) => {
                setParams({ ...params, productType: type });
              }}
            />
            <Product
              {...product}
              searchProductsByType={(type) => {
                setParams({ ...params, productType: type });
              }}
            />
            <Product
              {...product}
              searchProductsByType={(type) => {
                setParams({ ...params, productType: type });
              }}
            />

            <Product
              {...product}
              searchProductsByType={(type) => {
                setParams({ ...params, productType: type });
              }}
            />
          </>
        ))}
      </div>
    </>
  );
}

export default ProductsPage;
