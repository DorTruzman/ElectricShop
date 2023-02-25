import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";

const pages = [
  {
    url: "/home",
    name: "דף הבית",
    component: <ProductsPage />,
    showForAdmin: true,
  },
  {
    url: "/cart",
    name: "סל הקניות",
    component: <CartPage />,
    showForAdmin: false,
  },
];

export default pages;
