import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080";

function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const navigate = useNavigate();


  // =================================================
  // GET LOGGED-IN USER
  // =================================================

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch {
    user = null;
  }

  const userId = user ? user.id : null;


  // =================================================
  // LOAD CART
  // =================================================

  useEffect(() => {

    if (!userId) {

      setCartItems([]);
      setLoading(false);

      return;
    }

    loadCart();

  }, [userId]);


  const loadCart = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        `${API_URL}/cart/${userId}`
      );

      if (!response.ok) {

        throw new Error(
          "Failed to load cart"
        );

      }

      const data = await response.json();

      console.log(
        "Cart data:",
        data
      );

      setCartItems(data);

    } catch (error) {

      console.error(
        "Error loading cart:",
        error
      );

      setCartItems([]);

    } finally {

      setLoading(false);

    }

  };


  // =================================================
  // TOTAL
  // =================================================

  const getTotal = () => {

    return cartItems.reduce(
      (total, item) => {

        const price =
          Number(item.food?.price || 0);

        const quantity =
          Number(item.quantity || 0);

        return total + price * quantity;

      },
      0
    );

  };


  // =================================================
  // UPDATE QUANTITY
  // =================================================

  const updateQuantity = async (
    foodId,
    newQuantity
  ) => {

    if (newQuantity < 1) {
      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/cart/${userId}/update/${foodId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            quantity: newQuantity,
          }),
        }
      );

      if (!response.ok) {

        throw new Error(
          "Failed to update quantity"
        );

      }

      await loadCart();

    } catch (error) {

      console.error(
        "Update quantity error:",
        error
      );

      alert(
        "Unable to update quantity."
      );

    }

  };


  // =================================================
  // REMOVE ITEM
  // =================================================

  const removeItem = async (foodId) => {

    try {

      const response = await fetch(
        `${API_URL}/cart/${userId}/remove/${foodId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {

        throw new Error(
          "Failed to remove item"
        );

      }

      await loadCart();

      alert(
        "Food removed from cart 🗑️"
      );

    } catch (error) {

      console.error(
        "Remove cart error:",
        error
      );

      alert(
        "Unable to remove item."
      );

    }

  };


  // =================================================
  // CLEAR CART
  // =================================================

  const clearCart = async () => {

    if (cartItems.length === 0) {
      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/cart/${userId}/clear`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {

        throw new Error(
          "Failed to clear cart"
        );

      }

      setCartItems([]);

      alert(
        "Cart cleared successfully 🗑️"
      );

    } catch (error) {

      console.error(
        "Clear cart error:",
        error
      );

      alert(
        "Unable to clear cart."
      );

    }

  };


  // =================================================
  // PLACE ORDER
  // =================================================

  const placeOrder = async () => {

    // Check login
    if (!userId) {

      alert(
        "Please login before placing an order."
      );

      navigate("/login");

      return;
    }


    // Check empty cart
    if (cartItems.length === 0) {

      alert(
        "Your cart is empty."
      );

      return;
    }


    try {

      setPlacingOrder(true);


      console.log(
        "Placing order for user:",
        userId
      );


      const response = await fetch(
        `${API_URL}/orders/place/${userId}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      // Check response
      if (!response.ok) {

        const errorText =
          await response.text();

        console.error(
          "Place order failed:",
          errorText
        );

        throw new Error(
          "Failed to place order"
        );

      }


      // Get created order
      const order =
        await response.json();


      console.log(
        "Order created successfully:",
        order
      );


      // Success message
      alert(
        `Order placed successfully! 🎉\n\n` +
        `Order #${order.id}\n` +
        `Total: ₹${Number(
          order.totalAmount || 0
        ).toFixed(2)}`
      );


      // Go to My Orders
      navigate("/orders");


    } catch (error) {

      console.error(
        "Place order error:",
        error
      );

      alert(
        "Unable to place order. Please try again."
      );

    } finally {

      setPlacingOrder(false);

    }

  };


  // =================================================
  // LOADING
  // =================================================

  if (loading) {

    return (

      <main className="cart-section">

        <div className="loading">

          <div className="loader"></div>

          <p>
            Loading your cart...
          </p>

        </div>

      </main>

    );

  }


  // =================================================
  // EMPTY CART
  // =================================================

  if (cartItems.length === 0) {

    return (

      <main className="cart-section">

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h3>
            Your Cart is Empty
          </h3>

          <p>
            Add some delicious food to your cart.
          </p>


          <button
            className="menu-btn"
            onClick={() =>
              navigate("/menu")
            }
          >
            Continue Shopping
          </button>

        </div>

      </main>

    );

  }


  // =================================================
  // CART PAGE
  // =================================================

  return (

    <main className="cart-section">


      {/* ================= HEADING ================= */}

      <div className="section-heading">

        <p>
          YOUR CART
        </p>

        <h2>
          Shopping Cart 🛒
        </h2>

        <span>
          Review your items before placing your order.
        </span>

      </div>



      {/* ================= CART CONTAINER ================= */}

      <div className="cart-container">


        {/* ================= CART ITEMS ================= */}

        <div className="cart-items">

          {cartItems.map((item) => {

            const price =
              Number(item.food?.price || 0);

            const quantity =
              Number(item.quantity || 0);

            const foodId =
              item.food?.id;


            return (

              <div
                className="cart-item"
                key={item.id}
              >


                {/* FOOD ICON */}

                <div className="cart-food-icon">
                  🍽️
                </div>


                {/* FOOD DETAILS */}

                <div className="cart-food-details">

                  <h3>
                    {item.food?.name || "Food"}
                  </h3>

                  <p>
                    ₹{price}
                  </p>

                </div>


                {/* QUANTITY */}

                <div className="cart-quantity">

                  <button
                    className="quantity-btn"
                    onClick={() =>
                      updateQuantity(
                        foodId,
                        quantity - 1
                      )
                    }
                    disabled={quantity <= 1}
                  >
                    −
                  </button>


                  <span className="quantity-number">
                    {quantity}
                  </span>


                  <button
                    className="quantity-btn"
                    onClick={() =>
                      updateQuantity(
                        foodId,
                        quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>


                {/* ITEM TOTAL */}

                <div className="cart-item-total">

                  ₹{(
                    price * quantity
                  ).toFixed(2)}

                </div>


                {/* REMOVE */}

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeItem(foodId)
                  }
                  disabled={placingOrder}
                >
                  Remove
                </button>


              </div>

            );

          })}

        </div>



        {/* ================= SUMMARY ================= */}

        <div className="cart-summary">

          <h3>
            Order Summary
          </h3>


          <p>
            Items: {cartItems.length}
          </p>


          <h2>
            Total: ₹{getTotal().toFixed(2)}
          </h2>


          {/* CLEAR CART */}

          <button
            className="clear-cart-btn"
            onClick={clearCart}
            disabled={placingOrder}
          >
            Clear Cart 🗑️
          </button>


          {/* PLACE ORDER */}

          <button
            className="checkout-btn"
            onClick={placeOrder}
            disabled={placingOrder}
          >

            {placingOrder
              ? "Placing Order..."
              : "Place Order"}

          </button>

        </div>


      </div>

    </main>

  );

}

export default Cart;