import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = "https://foodordermanagement-production.up.railway.app";

function Menu() {

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const categoryId =
    searchParams.get("category");


  // =================================================
  // GET LOGGED-IN USER
  // =================================================

  const storedUser =
    localStorage.getItem("user");

  const user =
    storedUser
      ? JSON.parse(storedUser)
      : null;

  const userId =
    user ? user.id : null;


  // =================================================
  // LOAD FOODS
  // =================================================

  useEffect(() => {

    if (categoryId) {

      loadCategoryFoods(categoryId);

    } else {

      loadFoods();

    }

  }, [categoryId]);


  // =================================================
  // LOAD ALL FOODS
  // =================================================

  const loadFoods = async () => {

    setLoading(true);

    try {

      const response = await fetch(
        `${API_URL}/foods`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load foods"
        );
      }

      const data =
        await response.json();

      setFoods(data);

    } catch (error) {

      console.error(
        "Error loading foods:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // =================================================
  // LOAD CATEGORY FOODS
  // =================================================

  const loadCategoryFoods = async (id) => {

    setLoading(true);

    try {

      const response = await fetch(
        `${API_URL}/foods/category/${id}`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load category foods"
        );
      }

      const data =
        await response.json();

      setFoods(data);

    } catch (error) {

      console.error(
        "Error loading category foods:",
        error
      );

      setFoods([]);

    } finally {

      setLoading(false);

    }

  };


  // =================================================
  // ADD TO CART
  // =================================================

  const handleAddToCart = async (foodId) => {

    // -----------------------------------------------
    // CHECK LOGIN
    // -----------------------------------------------

    if (!userId) {

      alert(
        "Please login before adding food to cart."
      );

      return;

    }


    try {

      console.log(
        "Adding food to cart:",
        {
          userId: userId,
          foodId: foodId,
          quantity: 1
        }
      );


      const response = await fetch(
        `${API_URL}/cart/add`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            userId: userId,

            foodId: foodId,

            quantity: 1,

          }),
        }
      );


      if (!response.ok) {

        const errorText =
          await response.text();

        console.error(
          "Add to cart failed:",
          errorText
        );

        throw new Error(
          "Failed to add food to cart"
        );

      }


      const data =
        await response.json();

      console.log(
        "Food added to cart:",
        data
      );


      alert(
        "Food added to cart successfully! 🛒"
      );


    } catch (error) {

      console.error(
        "Add to cart error:",
        error
      );

      alert(
        "Unable to add food to cart."
      );

    }

  };


  // =================================================
  // PAGE
  // =================================================

  return (

    <main className="menu-page">


      {/* =================================================
          MENU HEADER
          ================================================= */}

      <section className="menu-header">

        <p className="small-title">
          OUR MENU
        </p>

        <h1>
          Delicious Foods 🍴
        </h1>

        <p>
          Freshly prepared and ready to order
        </p>

      </section>


      {/* =================================================
          LOADING
          ================================================= */}

      {loading && (

        <div className="loading">

          <div className="loader"></div>

          <p>
            Loading delicious foods...
          </p>

        </div>

      )}


      {/* =================================================
          NO FOOD
          ================================================= */}

      {!loading &&
        foods.length === 0 && (

        <div className="empty-menu">

          <div className="empty-menu-icon">
            🍽️
          </div>

          <h2>
            No foods found
          </h2>

          <p>
            Please check again later.
          </p>

        </div>

      )}


      {/* =================================================
          FOOD GRID
          ================================================= */}

      {!loading &&
        foods.length > 0 && (

        <div className="menu-food-grid">

          {foods.map((food) => (

            <div
              className="menu-food-card"
              key={food.id}
            >


              {/* =================================================
                  FOOD IMAGE
                  ================================================= */}

              <div className="menu-food-image">

                {food.imageUrl ? (

                  <img
                    src={food.imageUrl}
                    alt={food.name}

                    onError={(e) => {

                      e.currentTarget.style.display =
                        "none";

                    }}

                  />

                ) : (

                  <div className="no-food-image">
                    🍽️
                  </div>

                )}

              </div>


              {/* =================================================
                  FOOD INFORMATION
                  ================================================= */}

              <div className="menu-food-info">

                <h3>
                  {food.name}
                </h3>


                <p className="menu-food-description">

                  {food.description}

                </p>


                <div className="menu-food-bottom">

                  <span className="menu-food-price">

                    ₹{food.price}

                  </span>


                  <button
                    className="add-btn"

                    onClick={() =>
                      handleAddToCart(food.id)
                    }
                  >

                    Add to Cart 🛒

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>

  );

}

export default Menu;