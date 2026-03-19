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

export const router = createBrowserRouter([
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
    path: "/sales/:id",
    Component: SaleDetail,
  },
  {
    path: "/products/:id",
    Component: ProductDetail,
  },
]);