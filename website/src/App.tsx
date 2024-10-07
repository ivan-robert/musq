import "./App.css";
import { RouterProvider } from "react-router-dom";
import { baseRouter } from "./navigation/router";

function App() {
  return <RouterProvider router={baseRouter} />;
}

export default App;
