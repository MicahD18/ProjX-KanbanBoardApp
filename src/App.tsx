/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BoardsPage from "./pages/BoardsPage";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-row">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <BoardsPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
