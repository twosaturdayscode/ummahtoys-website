const wpBaseUrl = process.env.NEXT_PUBLIC_WP_BASE_URL;
export const nextBaseUrl = process.env.NEXT_PUBLIC_NEXT_BASE_URL;

const authString = Buffer.from(
  process.env.CKEY + ":" + process.env.CSECRET,
  "utf-8"
);

const headers = new Headers();
headers.append("Authorization", "Basic " + authString.toString("base64"));
headers.append("Content-Type", "application/json");

async function wooGet(endpoint) {
  const response = await fetch(wpBaseUrl + endpoint, {
    headers: headers,
  });
  return await response.json();
}

async function wooPost(endpoint, body) {
  const response = await fetch(wpBaseUrl + endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  return await response.json();
}

export async function getWooProducts() {
  return await wooGet("/products?per_page=100&status=published");
}

export async function getWooCategories() {
  return await wooGet("/products/categories");
}

export async function getWooProductById(id) {
  return await wooGet(`/products/${id}`);
}

export async function getWooProductBySlug(slug) {
  return await wooGet(`/products/?slug=${slug}`);
}

export async function createWooOrder(data) {
  return await wooPost("/orders", data);
}

export async function createNextOrder(data) {
  const response = await fetch(nextBaseUrl + "/api/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function updateWooOrder(id, data) {
  return await wooPost(`/orders/${id}`, data);
}
