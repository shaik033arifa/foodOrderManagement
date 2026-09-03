import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);


  // =================================================
  // GET LOGGED-IN USER
  // =================================================

  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const userId = user ? user.id : null;


  // =================================================
  // LOAD ORDERS
  // =================================================

  useEffect(() => {

    if (!userId) {
      setLoading(false);
      setError("Please login to view your orders.");
      return;
    }

    loadOrders();

  }, [userId]);


  const loadOrders = async () => {

    try {

      setLoading(true);
      setError("");

      console.log(
        "Loading orders for user:",
        userId
      );

      const response = await fetch(
        `${API_URL}/orders/user/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to load orders");
      }

      const data = await response.json();

      console.log(
        "Orders for user",
        userId,
        ":",
        data
      );

      setOrders(data);

    } catch (error) {

      console.error(
        "Error loading orders:",
        error
      );

      setError(
        "Unable to load your orders."
      );

    } finally {

      setLoading(false);

    }

  };


  // =================================================
  // VIEW ORDER DETAILS
  // =================================================

  const viewOrderDetails = async (order) => {

    try {

      setSelectedOrder(order);
      setOrderItems([]);
      setDetailsLoading(true);

      const response = await fetch(
        `${API_URL}/orders/${order.id}/items`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load order details"
        );
      }

      const data = await response.json();

      console.log(
        "Order Items:",
        data
      );

      setOrderItems(data);

    } catch (error) {

      console.error(
        "Order details error:",
        error
      );

      alert(
        "Unable to load order details."
      );

      setSelectedOrder(null);

    } finally {

      setDetailsLoading(false);

    }

  };


  // =================================================
  // CLOSE DETAILS
  // =================================================

  const closeOrderDetails = () => {

    setSelectedOrder(null);
    setOrderItems([]);

  };


  // =================================================
  // GET STATUS NUMBER
  // =================================================

  const getStatusStep = (status) => {

    switch (status) {

      case "PLACED":
        return 1;

      case "CONFIRMED":
        return 2;

      case "PREPARING":
        return 3;

      case "OUT FOR DELIVERY":
      case "OUT_FOR_DELIVERY":
        return 4;

      case "DELIVERED":
        return 5;

      case "CANCELLED":
        return 0;

      default:
        return 1;
    }

  };


  // =================================================
  // STATUS LABEL
  // =================================================

  const getStatusLabel = (status) => {

    switch (status) {

      case "PLACED":
        return "Order Placed";

      case "CONFIRMED":
        return "Confirmed";

      case "PREPARING":
        return "Preparing";

      case "OUT FOR DELIVERY":
      case "OUT_FOR_DELIVERY":
        return "Out for Delivery";

      case "DELIVERED":
        return "Delivered";

      case "CANCELLED":
        return "Cancelled";

      default:
        return "Order Placed";
    }

  };


  // =================================================
  // STATUS ICON
  // =================================================

  const getStatusIcon = (step) => {

    switch (step) {

      case 1:
        return "📝";

      case 2:
        return "✅";

      case 3:
        return "👨‍🍳";

      case 4:
        return "🛵";

      case 5:
        return "🎉";

      default:
        return "📦";
    }

  };


  // =================================================
  // LOADING
  // =================================================

  if (loading) {

    return (

      <main className="orders-page">

        <div className="loading">

          <div className="loader"></div>

          <p>
            Loading your orders...
          </p>

        </div>

      </main>

    );

  }


  // =================================================
  // ERROR
  // =================================================

  if (error) {

    return (

      <main className="orders-page">

        <div className="empty-orders">

          <div className="empty-orders-icon">
            ⚠️
          </div>

          <h2>
            Something went wrong
          </h2>

          <p>
            {error}
          </p>

          <button
            className="menu-btn"
            onClick={loadOrders}
          >
            Try Again
          </button>

        </div>

      </main>

    );

  }


  // =================================================
  // EMPTY ORDERS
  // =================================================

  if (orders.length === 0) {

    return (

      <main className="orders-page">

        <div className="section-heading">

          <p>
            YOUR ORDERS
          </p>

          <h1>
            My Orders 📦
          </h1>

          <span>
            Track and review your previous orders.
          </span>

        </div>


        <div className="empty-orders">

          <div className="empty-orders-icon">
            📦
          </div>

          <h2>
            No Orders Yet
          </h2>

          <p>
            You haven't placed any orders yet.
          </p>

        </div>

      </main>

    );

  }


  // =================================================
  // MAIN PAGE
  // =================================================

  return (

    <main className="orders-page">


      {/* PAGE HEADING */}

      <div className="section-heading">

        <p>
          YOUR ORDERS
        </p>

        <h1>
          My Orders 📦
        </h1>

        <span>
          Track and review your previous orders.
        </span>

      </div>


      {/* ORDER LIST */}

      <div className="orders-container">

        {orders.map((order) => {

          const status =
            order.status || "PLACED";

          return (

            <div
              className="order-card"
              key={order.id}
            >

              {/* ORDER HEADER */}

              <div className="order-header">

                <div>

                  <h2>
                    Order #{order.id}
                  </h2>

                  <p>

                    {order.orderDate
                      ? new Date(
                          order.orderDate
                        ).toLocaleString()
                      : "Date unavailable"}

                  </p>

                </div>


                <span
                  className={`order-status ${status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {getStatusLabel(status)}
                </span>

              </div>


              {/* ORDER INFORMATION */}

              <div className="order-info">

                <div>

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹
                    {Number(
                      order.totalAmount || 0
                    ).toFixed(2)}
                  </strong>

                </div>


                <div>

                  <span>
                    Status
                  </span>

                  <strong>
                    {getStatusLabel(status)}
                  </strong>

                </div>

              </div>


              {/* VIEW DETAILS */}

              <button
                className="view-order-btn"
                onClick={() =>
                  viewOrderDetails(order)
                }
              >
                Track Order & View Details
              </button>

            </div>

          );

        })}

      </div>


      {/* =================================================
          ORDER DETAILS MODAL
          ================================================= */}

      {selectedOrder && (

        <div className="order-details-overlay">

          <div className="order-details-modal">


            {/* HEADER */}

            <div className="order-details-header">

              <div>

                <p>
                  ORDER DETAILS
                </p>

                <h2>
                  Order #{selectedOrder.id} 📦
                </h2>

              </div>


              <button
                className="close-details-btn"
                onClick={closeOrderDetails}
              >
                ✕
              </button>

            </div>


            {/* ORDER DATE */}

            <div className="details-date">

              <span>
                Order Date
              </span>

              <strong>

                {selectedOrder.orderDate
                  ? new Date(
                      selectedOrder.orderDate
                    ).toLocaleString()
                  : "Date unavailable"}

              </strong>

            </div>


            {/* CURRENT STATUS */}

            <div className="details-status">

              <span>
                Current Status
              </span>

              <span
                className={`order-status ${
                  (
                    selectedOrder.status ||
                    "PLACED"
                  )
                    .toLowerCase()
                    .replaceAll(" ", "-")
                }`}
              >

                {getStatusLabel(
                  selectedOrder.status ||
                  "PLACED"
                )}

              </span>

            </div>


            {/* TRACKING */}

            <div className="tracking-section">

              <h3>
                Track Your Order 🚴
              </h3>


              {selectedOrder.status === "CANCELLED" ? (

                <div className="cancelled-order">

                  <div className="cancelled-icon">
                    ❌
                  </div>

                  <h4>
                    Order Cancelled
                  </h4>

                  <p>
                    This order has been cancelled.
                  </p>

                </div>

              ) : (

                <div className="tracking-timeline">

                  {[
                    "PLACED",
                    "CONFIRMED",
                    "PREPARING",
                    "OUT FOR DELIVERY",
                    "DELIVERED"
                  ].map((step, index) => {

                    const stepNumber =
                      index + 1;

                    const currentStep =
                      getStatusStep(
                        selectedOrder.status ||
                        "PLACED"
                      );

                    const completed =
                      stepNumber <= currentStep;

                    const current =
                      stepNumber === currentStep;


                    return (

                      <div
                        className={`tracking-step ${
                          completed
                            ? "completed"
                            : ""
                        } ${
                          current
                            ? "current"
                            : ""
                        }`}
                        key={step}
                      >

                        <div className="tracking-icon">

                          {getStatusIcon(
                            stepNumber
                          )}

                        </div>


                        <div className="tracking-content">

                          <strong>
                            {getStatusLabel(step)}
                          </strong>

                          <span>

                            {current
                              ? "Current status"
                              : completed
                                ? "Completed"
                                : "Pending"}

                          </span>

                        </div>


                        {stepNumber < 5 && (

                          <div
                            className={`tracking-line ${
                              stepNumber <
                              currentStep
                                ? "completed"
                                : ""
                            }`}
                          ></div>

                        )}

                      </div>

                    );

                  })}

                </div>

              )}

            </div>


            {/* ORDER ITEMS */}

            <h3 className="details-items-title">
              Ordered Items
            </h3>


            {detailsLoading ? (

              <div className="details-loading">

                <div className="loader"></div>

                <p>
                  Loading order items...
                </p>

              </div>

            ) : orderItems.length === 0 ? (

              <div className="no-order-items">

                <p>
                  No items found for this order.
                </p>

              </div>

            ) : (

              <div className="details-items">

                {orderItems.map((item) => (

                  <div
                    className="details-item"
                    key={item.id}
                  >

                    <div className="details-food-icon">
                      🍽️
                    </div>


                    <div className="details-food-info">

                      <h4>
                        {item.food?.name ||
                          "Food Item"}
                      </h4>

                      <p>

                        ₹
                        {Number(
                          item.price || 0
                        ).toFixed(2)}

                        {" × "}

                        {item.quantity}

                      </p>

                    </div>


                    <strong>

                      ₹
                      {(
                        Number(
                          item.price || 0
                        ) *
                        Number(
                          item.quantity || 0
                        )
                      ).toFixed(2)}

                    </strong>

                  </div>

                ))}

              </div>

            )}


            {/* TOTAL */}

            <div className="details-total">

              <span>
                Order Total
              </span>

              <strong>

                ₹
                {Number(
                  selectedOrder.totalAmount || 0
                ).toFixed(2)}

              </strong>

            </div>


            {/* CLOSE */}

            <button
              className="close-order-btn"
              onClick={closeOrderDetails}
            >
              Close
            </button>


          </div>

        </div>

      )}

    </main>

  );

}

export default Orders;