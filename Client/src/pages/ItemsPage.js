import React from "react";
import Item from "../components/Item";
import { items } from "../mockData";

function ItemsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {items.map((item) => (
        <Item {...item} />
      ))}
    </div>
  );
}

export default ItemsPage;
