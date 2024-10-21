// const check = window?.location?.href.split(":")
// export const baseUrl = check[0] === "http" ? "http://localhost:3005/api/v1" : "https://fyp-be-three.vercel.app/api/v1";

export const baseUrl = "http://localhost:3000/api";

export const prepareHeaders = (headers) => {
  const token = localStorage.getItem("token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};
