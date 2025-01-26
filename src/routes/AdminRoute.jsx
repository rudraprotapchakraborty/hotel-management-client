import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({children}) => {

    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <span className="loading loading-infinity loading-lg"></span>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminRoute;
