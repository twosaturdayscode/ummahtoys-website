import { nextBaseUrl } from "../api";

export const isServer = () => {
  return typeof window === "undefined";
};

export const isClient = () => {
  return !isServer();
};

/**
 * Converts a string value that represents a float number into an actual float number.
 * @param {string} value string representing a float number
 */
export const getFloatFromString = (value) => {
  return parseFloat(parseFloat(value).toFixed(2));
};

/**
 * Search in the cart if there is already the product. If found it returns its index.
 * @param {wooProduct} newProduct
 * @param {Product[]} cart
 * @returns {number | null} The index of the product in the cart, if there is none returns -1
 */
export const getProductIndex = (newProduct, cart) => {
  return cart.findIndex((product) => product.id === newProduct.id);
};

export const getProductIndexById = (id, cart) => {
  return cart.findIndex((product) => product.id === id);
};

/**
 * Create the object to be sent to woocommerce. For more information
 * see https://woocommerce.github.io/woocommerce-rest-api-docs/#create-an-order
 * @returns An object with all order params
 */
export const prepareWooOrder = (cart, userData) => {
  const lineItems = cart.map((product) => {
    return {
      product_id: product.id,
      quantity: product.quantity,
    };
  });

  const shippingInfo = {
    first_name: userData.name,
    last_name: userData.lastname,
    address_1: userData.address,
    address_2: userData.addressNotes,
    city: userData.city,
    state: userData.state,
    postcode: userData.postalCode,
    country: "IT",
    email: userData.email,
    phone: userData.phone,
  };

  const shippingLines = [
    {
      method_title: userData.shippingMethod,
      method_id: 1,
      total: userData.shippingMethod === "ritiro" ? "0" : "5.99",
    },
  ];

  const feeLines = [
    {
      name: "Supplemento contrassegno",
      total: "3",
    },
  ];

  const order = {
    payment_method:
      userData.shippingMethod === "ritiro" ? "bacs" : userData.paymentMethod,
    set_paid: false,
    billing: shippingInfo,
    shipping: shippingInfo,
    line_items: lineItems,
    shipping_lines: shippingLines,
    fee_lines: userData.paymentMethod === "cod" ? feeLines : [],
  };

  return order;
};

/**
 * Return stripe session object to be passed to the stripe instance.
 */
export const prepareStripe = (order) => {
  const lineItems = order.line_items.map((product) => {
    return {
      quantity: product?.quantity ?? 0,
      name: product?.name ?? "",
      amount: Math.round(product.price * 100),
      currency: "eur",
    };
  });

  const sessionData = {
    success_url:
      nextBaseUrl +
      `/result?order=${order.id}&email=${order.billing.email}&status=success`,
    cancel_url: nextBaseUrl + `/result?status=fail`,
    customer_email: order.billing.email,
    line_items: lineItems,
    payment_method_types: ["card"],
    mode: "payment",
    metadata: {
      orderId: order.id,
    },
    shipping_options: [
      {
        name: "Strandard Express",
        type: "fixed_amount",
        fixed_amount: {
          amount: 699,
          currency: "eur",
        },
      },
    ],
  };

  return sessionData;
};

export const manageRitiro = (order) => {};

export const manageStripe = (order) => {};
export const managePaypal = (order) => {};
export const manageCod = (order) => {};
