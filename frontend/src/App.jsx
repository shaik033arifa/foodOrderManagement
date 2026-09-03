import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminOrders from "./pages/AdminOrders";
import Contact from "./pages/Contact";

import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

import "./App.css";


function App() {

  // =====================================================
  // GET USER FROM LOCAL STORAGE
  // =====================================================

  const getStoredUser = () => {

    try {

      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return null;
      }

      return JSON.parse(storedUser);

    } catch (error) {

      console.error("Error reading user:", error);

      return null;

    }

  };


  // =====================================================
  // USER STATE
  // =====================================================

  const [user, setUser] = useState(getStoredUser());


  // =====================================================
  // LISTEN FOR LOGIN
  // =====================================================

  useEffect(() => {

    const handleUserLogin = () => {

      setUser(getStoredUser());

    };


    window.addEventListener(
      "userLogin",
      handleUserLogin
    );


    return () => {

      window.removeEventListener(
        "userLogin",
        handleUserLogin
      );

    };

  }, []);


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/";

  };


  return (

    <BrowserRouter>

      {/* =================================================
          SCROLL TO TOP WHEN PAGE CHANGES
          ================================================= */}

      <ScrollToTop />


      <div className="app">


        {/* =================================================
            NAVBAR
            ================================================= */}

        <header className="navbar">

          <div className="navbar-container">


            {/* =================================================
                LOGO
                ================================================= */}

            <Link
              to="/"
              className="logo"
            >
              🍽️ <span>TastyBite</span>
            </Link>


            {/* =================================================
                NAVIGATION
                ================================================= */}

            <nav className="nav-links">


              {/* HOME */}

              <Link to="/">
                Home
              </Link>


              {/* MENU */}

              <Link to="/menu">
                Menu
              </Link>


              {/* CATEGORIES */}

              <Link to="/categories">
                Categories
              </Link>


              {/* CART */}

              <Link to="/cart">
                Cart 🛒
              </Link>


              {/* MY ORDERS */}

              <Link to="/orders">
                My Orders
              </Link>


              {/* CONTACT US */}

              <Link to="/contact">
                Contact Us
              </Link>


              {/* =================================================
                  ADMIN ORDERS
                  ONLY VISIBLE TO ADMIN
                  ================================================= */}

              {user && user.role === "ADMIN" && (

                <Link to="/admin/orders">
                  Admin Orders
                </Link>

              )}


              {/* =================================================
                  LOGIN / USER / LOGOUT
                  ================================================= */}

              {user ? (

                <>

                  {/* USER NAME */}

                  <span className="user-name">
                    👤 {user.name}
                  </span>


                  {/* LOGOUT */}

                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                </>

              ) : (

                /* LOGIN */

                <Link
                  to="/login"
                  className="login-btn"
                >
                  Login
                </Link>

              )}

            </nav>

          </div>

        </header>


        {/* =================================================
            MAIN CONTENT
            ================================================= */}

        <main>

          <Routes>


            {/* =================================================
                HOME
                ================================================= */}

            <Route
              path="/"
              element={<Home />}
            />


            {/* =================================================
                MENU
                ================================================= */}

            <Route
              path="/menu"
              element={<Menu />}
            />


            {/* =================================================
                CATEGORIES
                ================================================= */}

            <Route
              path="/categories"
              element={<Categories />}
            />


            {/* =================================================
                CART
                ================================================= */}

            <Route
              path="/cart"
              element={<Cart />}
            />


            {/* =================================================
                MY ORDERS
                ================================================= */}

            <Route
              path="/orders"
              element={<Orders />}
            />


            {/* =================================================
                CONTACT US
                ================================================= */}

            <Route
              path="/contact"
              element={<Contact />}
            />


            {/* =================================================
                LOGIN
                ================================================= */}

            <Route
              path="/login"
              element={<Login />}
            />


            {/* =================================================
                REGISTER
                ================================================= */}

            <Route
              path="/register"
              element={<Register />}
            />


            {/* =================================================
                PROTECTED ADMIN ORDERS
                ================================================= */}

            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute role="ADMIN">
                  <AdminOrders />
                </ProtectedRoute>
              }
            />


          </Routes>

        </main>


        {/* =====================================================
            FOOTER
            ===================================================== */}

        <footer className="footer">

          <div className="footer-container">


            {/* =================================================
                BRAND
                ================================================= */}

            <div className="footer-section footer-brand">

              <Link
                to="/"
                className="footer-logo"
              >
                🍽️ TastyBite
              </Link>

              <p>
                Delicious food, delivered with love.
              </p>

            </div>


            {/* =================================================
                QUICK LINKS
                ================================================= */}

            <div className="footer-section">

              <h3>
                Quick Links
              </h3>

              <Link to="/">
                Home
              </Link>

              <Link to="/menu">
                Menu
              </Link>

              <Link to="/categories">
                Categories
              </Link>

              <Link to="/contact">
                Contact Us
              </Link>

            </div>


            {/* =================================================
                CUSTOMER
                ================================================= */}

            <div className="footer-section">

              <h3>
                Customer
              </h3>

              <Link to="/cart">
                Cart
              </Link>

              <Link to="/orders">
                My Orders
              </Link>


              {!user && (

                <Link to="/login">
                  Login
                </Link>

              )}


              {user && (

                <button
                  className="footer-logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              )}

            </div>


          </div>


          {/* =================================================
              FOOTER BOTTOM
              ================================================= */}

          <div className="footer-bottom">

            <p>
              © 2026 TastyBite. All Rights Reserved.
            </p>

            <span>
              Training Project
            </span>

          </div>

        </footer>


      </div>

    </BrowserRouter>

  );

}


export default App;