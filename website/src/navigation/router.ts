import { createBrowserRouter } from "react-router-dom";
import { SignupConfirm } from "./pages/SignupConfirm.page";
import { HomePage } from "./pages/Home.page";

export const baseRouter = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/signup-confirm", Component: SignupConfirm },
]);
