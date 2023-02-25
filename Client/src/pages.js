import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";

const pages = [
  {
    url: "/home",
    name: "דף הבית",
    component: <ProductsPage />,
    showForCustomer: true,
    showForAdmin: true,
  },
  {
    url: "/cart",
    name: "סל הקניות",
    component: <CartPage />,
    showForCustomer: true,
    showForAdmin: false,
  },
  {
    url: "/admin",
    name: "ניהול",
    component: <AdminPage />,
    showForCustomer: false,
    showForAdmin: true,
  },
];

export default pages;
