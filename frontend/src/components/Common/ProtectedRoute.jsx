import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user || (role && user.role) !== role) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string,
};

export default ProtectedRoute;
