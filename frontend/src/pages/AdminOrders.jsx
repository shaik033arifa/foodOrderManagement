import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState(null);


  // =========================================================
  // LOAD ALL ORDERS
  // =========================================================

  useEffect(() => {
    loadOrders();
  }, []);


  const loadOrders = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        `${API_URL}/orders/all`
      );


      if (!response.ok) {

        throw new Error(
          "Failed to load orders"
        );

      }


      const data = await response.json();

      console.log(
        "All orders:",
        data
      );


      setOrders(data);


    } catch (error) {

      console.error(
        "Error loading orders:",
        error
      );

      setOrders([]);

    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // UPDATE ORDER STATUS
  // =========================================================

  const updateOrderStatus = async (
    orderId,
    newStatus
  ) => {

    try {

      setUpdatingOrder(orderId);


      const response = await fetch(
        `${API_URL}/orders/${orderId}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );


      if (!response.ok) {

        const errorText =
          await response.text();

        console.error(
          "Status update failed:",
          errorText
        );

        throw new Error(
          "Failed to update order status"
        );

      }


      const updatedOrder =
        await response.json();


      console.log(
        "Order status updated:",
        updatedOrder
      );


      // Update order directly on screen
      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: updatedOrder.status,
              }
            : order
        )
      );


      alert(
        `Order #${orderId} status updated to ${updatedOrder.status}`
      );


    } catch (error) {

      console.error(
        "Update status error:",
        error
      );


      alert(
        "Unable to update order status."
      );

    } finally {

      setUpdatingOrder(null);

    }

  };


  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {

    if (!date) {
      return "";
    }

    return new Date(date).toLocaleString();

  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (

      <main className="admin-orders-page">

        <div className="loading">

          <div className="loader"></div>

          <p>
            Loading customer orders...
          </p>

        </div>

      </main>

    );

  }


  // =========================================================
  // NO ORDERS
  // =========================================================

  if (orders.length === 0) {

    return (

      <main className="admin-orders-page">

        <section className="admin-orders-header">

          <p className="small-title">
            ADMIN PANEL
          </p>

          <h1>
            Order Management 📦
          </h1>

          <p>
            Manage customer orders and delivery status.
          </p>

        </section>


        <div className="empty-orders">

          <div className="empty-orders-icon">
            📦
          </div>

          <h2>
            No Orders Yet
          </h2>

          <p>
            There are no orders in the system.
          </p>

        </div>

      </main>

    );

  }


  // =========================================================
  // ADMIN ORDERS PAGE
  // =========================================================

  return (

    <main className="admin-orders-page">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="admin-orders-header">

        <p className="small-title">
          ADMIN PANEL
        </p>

        <h1>
          Order Management 📦
        </h1>

        <p>
          Manage customer orders and delivery status.
        </p>

      </section>



      {/* =====================================================
          ORDERS
      ===================================================== */}

      <section className="admin-orders-list">

        {orders.map((order) => {

          const customer =
            order.user || {};


          const currentStatus =
            order.status || "PLACED";


          return (

            <div
              className="admin-order-card"
              key={order.id}
            >


              {/* =================================================
                  ORDER HEADER
              ================================================= */}

              <div className="admin-order-top">

                <div>

                  <h2>
                    Order #{order.id}
                  </h2>

                  <p>
                    {formatDate(
                      order.orderDate
                    )}
                  </p>

                </div>


                <span
                  className={
                    `admin-order-status status-${currentStatus
                      .toLowerCase()
                      .replaceAll(" ", "-")}`
                  }
                >

                  {currentStatus}

                </span>

              </div>



              {/* =================================================
                  CUSTOMER DETAILS
              ================================================= */}

              <div className="admin-order-details">


                <div>

                  <span>
                    Customer
                  </span>

                  <strong>
                    {customer.name || "Unknown"}
                  </strong>

                </div>


                <div>

                  <span>
                    Email
                  </span>

                  <strong>
                    {customer.email || "Unknown"}
                  </strong>

                </div>


                <div>

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹{Number(
                      order.totalAmount || 0
                    ).toFixed(2)}
                  </strong>

                </div>

              </div>



              {/* =================================================
                  STATUS UPDATE
              ================================================= */}

              <div className="admin-status-update">

                <label>
                  Update Order Status
                </label>


                <select
                  value={currentStatus}
                  disabled={
                    updatingOrder === order.id
                  }

                  onChange={(event) =>
                    updateOrderStatus(
                      order.id,
                      event.target.value
                    )
                  }
                >

                  <option value="PLACED">
                    Order Placed
                  </option>

                  <option value="CONFIRMED">
                    Confirmed
                  </option>

                  <option value="PREPARING">
                    Preparing
                  </option>

                  <option value="OUT FOR DELIVERY">
                    Out for Delivery
                  </option>

                  <option value="DELIVERED">
                    Delivered
                  </option>

                  <option value="CANCELLED">
                    Cancelled
                  </option>

                </select>


                {updatingOrder === order.id && (

                  <span className="updating-text">
                    Updating...
                  </span>

                )}

              </div>

            </div>

          );

        })}

      </section>

    </main>

  );

}

export default AdminOrders;