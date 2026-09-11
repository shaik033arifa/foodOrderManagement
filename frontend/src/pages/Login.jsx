import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "https://foodordermanagement-production.up.railway.app";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async (event) => {

    event.preventDefault();

    setError("");


    // ===================================================
    // BASIC VALIDATION
    // ===================================================

    if (!email || !password) {

      setError("Please enter email and password.");

      return;
    }


    try {

      setLoading(true);


      // =================================================
      // CALL BACKEND LOGIN API
      // =================================================

      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );


      // =================================================
      // HANDLE LOGIN ERROR
      // =================================================

      if (!response.ok) {

        let errorMessage = "Invalid email or password.";

        try {

          const errorData = await response.json();

          if (errorData.message) {
            errorMessage = errorData.message;
          }

        } catch (error) {

          console.log("Could not read error response.");

        }

        throw new Error(errorMessage);
      }


      // =================================================
      // GET USER DATA
      // =================================================

      const user = await response.json();

      console.log("Login successful:", user);


      // =================================================
      // SAVE USER IN LOCAL STORAGE
      // =================================================

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );


      // =================================================
      // TELL APP.JSX THAT LOGIN IS SUCCESSFUL
      // =================================================

      window.dispatchEvent(
        new Event("userLogin")
      );


      // =================================================
      // REDIRECT BASED ON ROLE
      // =================================================

      if (user.role === "ADMIN") {

        navigate("/admin/orders");

      } else {

        navigate("/");

      }


    } catch (error) {

      console.error("Login error:", error);

      setError(
        error.message || "Unable to login. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="login-page">

      <div className="login-container">


        {/* =================================================
            LOGIN HEADER
            ================================================= */}

        <div className="login-header">

          <div className="login-icon">
            👤
          </div>

          <p className="login-label">
            WELCOME BACK
          </p>

          <h1>
            Login
          </h1>

          <span>
            Login to continue to TastyBite
          </span>

        </div>


        {/* =================================================
            ERROR MESSAGE
            ================================================= */}

        {error && (

          <div
            style={{
              background: "#ffe8e8",
              color: "#d00000",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {error}
          </div>

        )}


        {/* =================================================
            LOGIN FORM
            ================================================= */}

        <form
          className="login-form"
          onSubmit={handleLogin}
        >


          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-submit-btn"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login"
            }

          </button>

        </form>


        {/* =================================================
            REGISTER LINK
            ================================================= */}

        <div className="login-info">

          <p>
            Don't have an account?{" "}

            <Link to="/register">
              Register here
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}


export default Login;