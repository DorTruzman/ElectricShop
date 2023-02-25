import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";

const pages = [
  {
    url: "/home",
    name: "דף הבית",
    component: <ProductsPage />,
  },
  {
    url: "/cart",
    name: "סל הקניות",
    component: <CartPage />,
  },
];

export default pages;
