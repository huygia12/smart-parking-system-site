import { AdminLayout, UserLayout } from "@/layout";
import {
  CustomerManagement,
  HomePage,
  Login,
  PageNotFound,
  ParkingStates,
  Unauthorized,
} from "@/pages";
import { userService } from "@/services";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import { Role } from "@/types/enum";
import { AuthProvider } from "@/context";
import PreventUserLoginRoute from "./prevent-user-login-route";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <UserLayout />
      </AuthProvider>
    ),
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        id: "parking_status",
        path: "parkingStatus",
        element: <ParkingStates />,
      },
      {
        path: "login",
        element: (
          <PreventUserLoginRoute>
            <Login />
          </PreventUserLoginRoute>
        ),
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
  {
    path: "staff",
    element: (
      <AuthProvider>
        <ProtectedRoute allowedRoles={[Role.STAFF]}>
          <AdminLayout />
        </ProtectedRoute>
      </AuthProvider>
    ),
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        id: "customer_management",
        loader: userService.apis.getCustomers,
        element: <CustomerManagement />,
      },
    ],
  },
]);

export default routes;
