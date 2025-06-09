import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/Login" />;
  }

  return children;
};

// ✅ Validación de props
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
