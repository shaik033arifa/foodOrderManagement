import { Link } from "react-router-dom";

function Home() {
  return (
    <main>

      {/* ================= HERO ================= */}

      <section className="home-hero">

        <div className="home-hero-content">

          <p className="small-title">
            WELCOME TO TASTYBITE
          </p>

          <h1>
            Delicious Food,
            <br />
            Delivered To You 🍴
          </h1>

          <p className="hero-text">
            Discover delicious meals, order your favourites,
            and enjoy fresh food at your doorstep.
          </p>

          <Link
            to="/menu"
            className="menu-btn"
          >
            Explore Menu
          </Link>

        </div>


        <div className="home-hero-food">
          🍛
        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="home-features">

        <div className="section-heading">

          <p>
            WHY TASTYBITE
          </p>

          <h2>
            Everything You Love
          </h2>

          <span>
            Fresh food, fast delivery and easy ordering.
          </span>

        </div>


        <div className="feature-grid">

          {/* FEATURE 1 */}

          <div className="feature-card">

            <div className="feature-icon">
              🍽️
            </div>

            <h3>
              Delicious Food
            </h3>

            <p>
              Enjoy delicious meals prepared with
              fresh ingredients.
            </p>

          </div>


          {/* FEATURE 2 */}

          <div className="feature-card">

            <div className="feature-icon">
              🚀
            </div>

            <h3>
              Fast Delivery
            </h3>

            <p>
              Get your favourite food delivered
              quickly to your doorstep.
            </p>

          </div>


          {/* FEATURE 3 */}

          <div className="feature-card">

            <div className="feature-icon">
              🛒
            </div>

            <h3>
              Easy Ordering
            </h3>

            <p>
              Browse the menu, add food to your cart
              and place your order easily.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CALL TO ACTION ================= */}

      <section className="home-cta">

        <div>

          <p className="small-title">
            HUNGRY?
          </p>

          <h2>
            Find Your Favourite Food 🍴
          </h2>

          <p>
            Explore our delicious menu and order
            your favourite meal today.
          </p>

          <Link
            to="/menu"
            className="menu-btn"
          >
            View Menu
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Home;