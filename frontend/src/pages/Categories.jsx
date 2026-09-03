import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080";

function Categories() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  // ================= LOAD CATEGORIES =================

  useEffect(() => {
    loadCategories();
  }, []);


  const loadCategories = async () => {

    try {

      const response = await fetch(
        `${API_URL}/categories`
      );

      if (!response.ok) {
        throw new Error("Failed to load categories");
      }

      const data = await response.json();

      setCategories(data);
      setLoading(false);

    } catch (error) {

      console.error(
        "Error loading categories:",
        error
      );

      setLoading(false);
    }
  };


  // ================= CATEGORY ICON =================

  const getCategoryIcon = (categoryName) => {

    const name =
      categoryName.toLowerCase();


    if (name.includes("soup")) {
      return "🍲";
    }

    if (name.includes("starter")) {
      return "🥗";
    }

    if (name.includes("biryani")) {
      return "🍚";
    }

    if (name.includes("chinese")) {
      return "🥡";
    }

    if (name.includes("roti")) {
      return "🫓";
    }

    if (
      name.includes("curry") ||
      name.includes("main course")
    ) {
      return "🍛";
    }

    if (name.includes("dessert")) {
      return "🍰";
    }

    return "🍽️";
  };


  // ================= OPEN CATEGORY =================

  const openCategory = (categoryId) => {

    navigate(`/menu?category=${categoryId}`);

  };


  // ================= OPEN ALL =================

  const openAllFoods = () => {

    navigate("/menu");

  };


  return (

    <main className="categories-page">


      {/* ================= HEADER ================= */}

      <section className="categories-section">

        <div className="section-heading">

          <p>
            EXPLORE
          </p>

          <h1>
            Food Categories 🍽️
          </h1>

          <span>
            Choose your favourite category
          </span>

        </div>


        {/* ================= LOADING ================= */}

        {loading && (

          <div className="loading">

            <div className="loader"></div>

            <p>
              Loading categories...
            </p>

          </div>

        )}


        {/* ================= CATEGORY BUTTONS ================= */}

        {!loading && categories.length > 0 && (

          <div className="category-buttons">


            {/* ALL */}

            <button
              className="category-btn active"
              onClick={openAllFoods}
            >

              <span className="category-icon">
                🍽️
              </span>

              <span>
                All
              </span>

            </button>


            {/* DATABASE CATEGORIES */}

            {categories.map((category) => (

              <button
                key={category.id}
                className="category-btn"
                onClick={() =>
                  openCategory(category.id)
                }
              >

                <span className="category-icon">
                  {getCategoryIcon(category.name)}
                </span>

                <span>
                  {category.name}
                </span>

              </button>

            ))}

          </div>

        )}


        {/* ================= NO CATEGORIES ================= */}

        {!loading && categories.length === 0 && (

          <div className="empty-menu">

            <div className="empty-menu-icon">
              📂
            </div>

            <h2>
              No categories found
            </h2>

            <p>
              Please check again later.
            </p>

          </div>

        )}

      </section>

    </main>

  );
}

export default Categories;