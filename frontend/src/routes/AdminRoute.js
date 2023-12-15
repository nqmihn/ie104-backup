import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminRoute = (props) => {
  const role = useSelector((state) => state.user.role);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  if (!isAuthenticated) {
    toast.error("Please Login First");
    return <Navigate to="/login" />;
  }
  if (role !== "ADMIN") {
    toast.error("You dont have permission to access this page");
    return <Navigate to="/" />;
  }
  return <>{props.children}</>;
};
export default AdminRoute;
