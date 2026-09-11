import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "https://foodordermanagement-production.up.railway.app";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleRegister = async (event) => {

    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {

      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );


      if (!response.ok) {

        let message = "Registration failed.";

        try {

          const errorData = await response.json();

          if (errorData.message) {
            message = errorData.message;
          }

        } catch (error) {
          // Ignore JSON parsing error
        }

        throw new Error(message);
      }


      const user = await response.json();

      console.log(
        "Registration successful:",
        user
      );


      setSuccess(
        "Registration successful! Redirecting to login..."
      );


      // Go to login page after registration
      setTimeout(() => {
        navigate("/login");
      }, 1500);


    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      setError(
        error.message ||
        "Unable to register."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <main className="login-page">

      <div className="login-container">

        {/* ================= HEADER ================= */}

        <div className="login-header">

          <div className="login-icon">
            📝
          </div>

          <p className="login-label">
            CREATE ACCOUNT
          </p>

          <h1>
            Register
          </h1>

          <span>
            Create your account to start ordering delicious food.
          </span>

        </div>


        {/* ================= FORM ================= */}

        <form
          className="login-form"
          onSubmit={handleRegister}
        >

          {/* NAME */}

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />

          </div>


          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email Address
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
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              minLength="6"
            />

          </div>


          {/* ERROR */}

          {error && (

            <p className="login-error">
              {error}
            </p>

          )}


          {/* SUCCESS */}

          {success && (

            <p className="login-success">
              {success}
            </p>

          )}


          {/* REGISTER BUTTON */}

          <button
            type="submit"
            className="login-submit-btn"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account 📝"}

          </button>

        </form>


        {/* ================= LOGIN LINK ================= */}

        <div className="login-info">

          <p>
            Already have an account?
          </p>

          <Link to="/login">
            Login here
          </Link>

        </div>

      </div>

    </main>
  );
}

export default Register;