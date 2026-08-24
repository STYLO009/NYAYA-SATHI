import { createBrowserRouter } from "react-router";
import { HomePage } from "./HomePage";
import { LoginPage } from "./components/LoginPage";
import { SignUpPage } from "./components/SignUpPage";
import { LawyerLoginPage } from "./components/LawyerLoginPage";
import { LawyerSignUpPage } from "./components/LawyerSignUpPage";
import { UserDashboard } from "./components/UserDashboard";
import { LawyerDashboardPage } from "./components/LawyerDashboardPage";

export const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/login", Component: LoginPage },
  { path: "/signup", Component: SignUpPage },
  { path: "/login-lawyer", Component: LawyerLoginPage },
  { path: "/signup-lawyer", Component: LawyerSignUpPage },
  { path: "/dashboard", Component: UserDashboard },
  { path: "/dashboard-lawyer", Component: LawyerDashboardPage },
]);
