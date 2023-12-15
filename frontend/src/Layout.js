import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import User from "./components/User/UserComponent";
import Admin from "./components/Admin/AdminComponent";
import HomeComponent from "./components/Home/HomeComponent";
import ManageUser from "./components/Admin/Content/ManageUser";
import DashBoard from "./components/Admin/Content/DashBoard";
import LoginComponent from "./components/Auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComponent from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";
import PrivateRoute from "./routes/PrivateRoute";
import { Suspense } from "react";
import UserProfile from "./components/User/Profile/UserProfile";
import ForgotPassword from "./components/Auth/ForgotPassword";
import AdminRoute from "./routes/AdminRoute";
const NotFound = () => {
  return (
    <div className="alert alert-danger container mt-3">
      <h1>URL NOT FOUND</h1>
    </div>
  );
};
const Layout = (props) => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomeComponent />}></Route>
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <ListQuiz />
              </PrivateRoute>
            }
          />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/quiz/:id" element={<DetailQuiz />} />
        </Route>

        <Route
          path="admins"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-quizzes" element={<ManageQuiz />} />
          <Route path="manage-questions" element={<Questions />} />
        </Route>
        <Route path="/login" element={<LoginComponent />}></Route>
        <Route path="/register" element={<RegisterComponent />}></Route>
        <Route path="/forgot" element={<ForgotPassword />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Suspense>
  );
};
export default Layout;
