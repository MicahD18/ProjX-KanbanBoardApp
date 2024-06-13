/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BoardPage from "./pages/BoardPage";
import { Provider } from "react-redux";
import store from "./store";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/utils/PrivateRoute";
import PublicRoute from "./components/utils/PublicRoute";

const MainLayout = () => {
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

const AuthLayout = () => {
  return (
    <div>
      <Header />
      <main className="bg-cool_gray flex flex-row items-center w-full h-screen justify-center">
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />, // Protecting main layout with PrivateRoute
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <BoardPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <PublicRoute />, // Protecting auth layout with PublicRoute
    children: [
      {
        path: "/sign-in",
        element: <AuthLayout />,
        children: [
          {
            path: "/sign-in",
            element: <SignIn />,
          },
        ],
      },
      {
        path: "/sign-up",
        element: <AuthLayout />,
        children: [
          {
            path: "/sign-up",
            element: <SignUp />,
          },
        ],
      },
    ],
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
