/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BoardPage from "./pages/BoardPage";
import { Provider } from "react-redux";
import store from "./store";
import AuthPage from "./pages/AuthPage";

const Layout = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
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
        element: <BoardPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
