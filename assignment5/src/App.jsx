import {
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";

import "./App.css";

// ==========================================
// PRODUCT DATA
// ==========================================

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 55000,
    image: "💻",
    description:
      "A powerful laptop suitable for programming, studying and everyday work.",
    details:
      "15.6-inch Full HD display, 8GB RAM, 512GB SSD and long battery life.",
  },

  {
    id: 2,
    name: "Smartphone",
    price: 25000,
    image: "📱",
    description:
      "A modern smartphone with a beautiful display and powerful performance.",
    details:
      "6.5-inch display, 128GB storage, dual camera and fast charging.",
  },

  {
    id: 3,
    name: "Headphones",
    price: 3000,
    image: "🎧",
    description:
      "Comfortable wireless headphones with clear and powerful sound.",
    details:
      "Wireless connectivity, noise reduction and up to 20 hours of battery life.",
  },

  {
    id: 4,
    name: "Smart Watch",
    price: 5000,
    image: "⌚",
    description:
      "A smart watch for fitness tracking and everyday notifications.",
    details:
      "Heart-rate tracking, step counter, notifications and water resistance.",
  },
];

// ==========================================
// CONTEXT
// ==========================================

const CartContext = createContext();

// ==========================================
// REDUCER
// ==========================================

function cartReducer(cart, action) {
  switch (action.type) {
    // Add product to cart
    case "ADD_TO_CART": {
      const existingProduct = cart.find(
        (item) => item.id === action.product.id
      );

      // If product already exists
      if (existingProduct) {
        return cart.map((item) =>
          item.id === action.product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // If product is new
      return [
        ...cart,
        {
          ...action.product,
          quantity: 1,
        },
      ];
    }

    // Remove product
    case "REMOVE_FROM_CART":
      return cart.filter(
        (item) => item.id !== action.id
      );

    // Increase quantity
    case "INCREASE_QUANTITY":
      return cart.map((item) =>
        item.id === action.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

    // Decrease quantity
    case "DECREASE_QUANTITY":
      return cart
        .map((item) =>
          item.id === action.id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0);

    default:
      return cart;
  }
}

// ==========================================
// CART PROVIDER
// ==========================================

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    []
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ==========================================
// PRODUCT LIST
// ==========================================

function ProductList() {
  const { dispatch } = useContext(CartContext);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  return (
    <section className="products-section">

      <div className="section-title">
        <h2>🛍️ Product List</h2>
        <p>Choose a product to view more details</p>
      </div>

      <div className="product-grid">

        {products.map((product) => (

          <div
            className="product-card"
            key={product.id}
            onClick={() =>
              setSelectedProduct(product)
            }
          >

            {/* Product Image */}

            <div className="product-image">
              {product.image}
            </div>

            {/* Product Name */}

            <h3>{product.name}</h3>

            {/* Price */}

            <p className="product-price">
              ₹{product.price.toLocaleString()}
            </p>

            {/* Hover Details */}

            <div className="hover-details">

              <p>{product.description}</p>

              <span>
                Click to view full details →
              </span>

            </div>

            {/* Add To Cart */}

            <button
              className="add-button"
              onClick={(event) => {

                // Prevent card click
                event.stopPropagation();

                dispatch({
                  type: "ADD_TO_CART",
                  product: product,
                });

              }}
            >
              🛒 Add to Cart
            </button>

          </div>

        ))}

      </div>

      {/* ======================================
          PRODUCT DETAILS POPUP
          ====================================== */}

      {selectedProduct && (

        <div
          className="popup-background"
          onClick={() =>
            setSelectedProduct(null)
          }
        >

          <div
            className="product-popup"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Close Button */}

            <button
              className="close-button"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              ✕
            </button>

            {/* Large Product Image */}

            <div className="popup-image">
              {selectedProduct.image}
            </div>

            {/* Product Name */}

            <h2>
              {selectedProduct.name}
            </h2>

            {/* Product Price */}

            <h3 className="popup-price">
              ₹
              {selectedProduct.price.toLocaleString()}
            </h3>

            {/* Description */}

            <p>
              {selectedProduct.description}
            </p>

            {/* Additional Details */}

            <div className="details-box">

              <strong>
                Product Details
              </strong>

              <p>
                {selectedProduct.details}
              </p>

            </div>

            {/* Add From Popup */}

            <button
              className="popup-add-button"
              onClick={() => {

                dispatch({
                  type: "ADD_TO_CART",
                  product: selectedProduct,
                });

                setSelectedProduct(null);

              }}
            >
              🛒 Add to Cart
            </button>

          </div>

        </div>

      )}

    </section>
  );
}

// ==========================================
// SHOPPING CART
// ==========================================

function ShoppingCart() {

  const { cart, dispatch } =
    useContext(CartContext);

  // Coupon state

  const [coupon, setCoupon] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const [couponMessage, setCouponMessage] =
    useState("");

  // ==========================================
  // SUBTOTAL
  // ==========================================

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  // ==========================================
  // DISCOUNT
  // ==========================================

  const discountAmount =
    (subtotal * discount) / 100;

  // ==========================================
  // PRICE AFTER DISCOUNT
  // ==========================================

  const priceAfterDiscount =
    subtotal - discountAmount;

  // ==========================================
  // GST
  // ==========================================

  const gst =
    priceAfterDiscount * 0.18;

  // ==========================================
  // GRAND TOTAL
  // ==========================================

  const grandTotal =
    priceAfterDiscount + gst;

  // ==========================================
  // APPLY COUPON
  // ==========================================

  function applyCoupon() {

    if (coupon.toUpperCase() === "SAVE10") {

      setDiscount(10);

      setCouponMessage(
        "✅ Coupon applied! 10% discount added."
      );

    } else {

      setDiscount(0);

      setCouponMessage(
        "❌ Invalid coupon code."
      );

    }
  }

  return (

    <section className="cart-section">

      <div className="section-title">

        <h2>🛒 Shopping Cart</h2>

        <p>
          Manage your selected products
        </p>

      </div>

      {/* ======================================
          EMPTY CART
          ====================================== */}

      {cart.length === 0 ? (

        <div className="empty-cart">

          <div className="empty-icon">
            🛒
          </div>

          <h3>
            Your cart is empty
          </h3>

          <p>
            Add some products to your cart.
          </p>

        </div>

      ) : (

        <>

          {/* ====================================
              CART ITEMS
              ==================================== */}

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                {/* Product Information */}

                <div className="cart-product">

                  <div className="cart-image">
                    {item.image}
                  </div>

                  <div>

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      ₹
                      {item.price.toLocaleString()}
                    </p>

                  </div>

                </div>

                {/* Quantity */}

                <div className="quantity-control">

                  <button
                    onClick={() =>
                      dispatch({
                        type:
                          "DECREASE_QUANTITY",
                        id: item.id,
                      })
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch({
                        type:
                          "INCREASE_QUANTITY",
                        id: item.id,
                      })
                    }
                  >
                    +
                  </button>

                </div>

                {/* Item Total */}

                <div className="item-total">

                  ₹
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString()}

                </div>

                {/* Remove */}

                <button
                  className="remove-button"
                  onClick={() =>
                    dispatch({
                      type:
                        "REMOVE_FROM_CART",
                      id: item.id,
                    })
                  }
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          {/* ====================================
              COUPON
              ==================================== */}

          <div className="coupon-section">

            <h3>
              🎟️ Coupon Code
            </h3>

            <div className="coupon-input">

              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(event) =>
                  setCoupon(event.target.value)
                }
              />

              <button
                onClick={applyCoupon}
              >
                Apply
              </button>

            </div>

            <p className="coupon-hint">
              Try <strong>SAVE10</strong> for
              10% discount.
            </p>

            {couponMessage && (

              <p className="coupon-message">
                {couponMessage}
              </p>

            )}

          </div>

          {/* ====================================
              BILL SUMMARY
              ==================================== */}

          <div className="bill-summary">

            <h3>
              💰 Bill Summary
            </h3>

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <span>
                ₹
                {subtotal.toLocaleString()}
              </span>

            </div>

            <div className="summary-row discount-row">

              <span>
                Discount ({discount}%)
              </span>

              <span>
                - ₹
                {discountAmount.toLocaleString()}
              </span>

            </div>

            <div className="summary-row">

              <span>
                GST (18%)
              </span>

              <span>
                ₹
                {gst.toLocaleString()}
              </span>

            </div>

            <hr />

            <div className="grand-total">

              <span>
                Grand Total
              </span>

              <span>
                ₹
                {grandTotal.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </span>

            </div>

          </div>

        </>

      )}

    </section>
  );
}

// ==========================================
// MAIN APP
// ==========================================

function App() {

  return (

    <CartProvider>

      <div className="app">

        {/* Header */}

        <header className="header">

          <h1>
            🛒 Online Shopping Cart
          </h1>

          <p>
            Simple Shopping Experience
          </p>

        </header>

        {/* Products */}

        <ProductList />

        {/* Cart */}

        <ShoppingCart />

        {/* Footer */}

        <footer>

          <p>
            Online Shopping Cart | GST: 18% |
            Coupon: SAVE10
          </p>

        </footer>

      </div>

    </CartProvider>
  );
}

export default App;