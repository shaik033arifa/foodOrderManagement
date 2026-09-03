import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  // =====================================================
  // GET LOGGED-IN USER
  // =====================================================

  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;


  // =====================================================
  // USER NOT LOGGED IN
  // =====================================================

  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // =====================================================
  // CHECK USER ROLE
  // =====================================================

  if (role && user.role !== role) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }


  // =====================================================
  // ACCESS ALLOWED
  // =====================================================

  return children;

}


export default ProtectedRoute;