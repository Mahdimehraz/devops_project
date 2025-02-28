import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { checkAuthLoader } from "./util/checkAuthLoader";

const router = createBrowserRouter([
  { index: true, element: <HomePage /> ,loader:checkAuthLoader },
  { path: "login", element: <Login /> },
  { path: "Signup", element: <Signup /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
