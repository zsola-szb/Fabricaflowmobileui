import { createBrowserRouter } from "react-router";
import { MobileLayout } from "./components/MobileLayout";
import { Home } from "./screens/Home";
import { Sales } from "./screens/Sales";
import { Manufacturing } from "./screens/Manufacturing";
import { Products } from "./screens/Products";
import { Finance } from "./screens/Finance";
import { More } from "./screens/More";
import { Settings } from "./screens/Settings";
import { WorkOrderDetail } from "./screens/WorkOrderDetail";
import { SaleDetail } from "./screens/SaleDetail";
import { ProductDetail } from "./screens/ProductDetail";
import { POS } from "./screens/POS";
import { TransactionSuccess } from "./screens/TransactionSuccess";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { Logout } from "./screens/Logout";
import { ForgotPassword } from "./screens/ForgotPassword";
import { Packaging } from "./screens/Packaging";
import { Purchases } from "./screens/Purchases";
import { Contacts } from "./screens/Contacts";
import { ContactDetails } from "./screens/ContactDetails";
import { Stock } from "./screens/Stock";
import { StockDetail } from "./screens/StockDetail";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/logout",
    Component: Logout,
  },
  {
    path: "/",
    Component: MobileLayout,
    children: [
      { index: true, Component: Home },
      { path: "sales", Component: Sales },
      { path: "manufacturing", Component: Manufacturing },
      { path: "products", Component: Products },
      { path: "finance", Component: Finance },
      { path: "more", Component: More },
    ],
  },
  {
    path: "/settings",
    Component: Settings,
  },
  {
    path: "/pos",
    Component: POS,
  },
  {
    path: "/transaction-success",
    Component: TransactionSuccess,
  },
  {
    path: "/manufacturing/work-orders/:id",
    Component: WorkOrderDetail,
  },
  {
    path: "/manufacturing/packaging",
    Component: Packaging,
  },
  {
    path: "/sales/:id",
    Component: SaleDetail,
  },
  {
    path: "/products/:id",
    Component: ProductDetail,
  },
  {
    path: "/packaging",
    Component: Packaging,
  },
  {
    path: "/purchases",
    Component: Purchases,
  },
  {
    path: "/contacts",
    Component: Contacts,
  },
  {
    path: "/contacts/:id",
    Component: ContactDetails,
  },
  {
    path: "/stock",
    Component: Stock,
  },
  {
    path: "/stock/:id",
    Component: StockDetail,
  },
]);