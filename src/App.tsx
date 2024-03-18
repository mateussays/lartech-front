import Header from "./components/Header/Header";
import { AssociateProvider } from "./contexts/AssociateContexts";
import AssociatesList from "./pages/AssociateList/AssociateList";
import Home from "./pages/Home/Home";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/associates",
    element: <AssociatesList />,
  },

  {
    path: "/associates/:id",
    element: <Home />,
  },
]);

function App() {
  return (
    <AssociateProvider>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <RouterProvider router={router} />
      </div>
    </AssociateProvider>
  );
}

export default App;
