
// export const baseUrl = "http://localhost:3000/api";
const check = window?.location?.href.split(":")
// export const baseUrl = check[0] === "http" ? "http://localhost:3000/api" : "https://chat-be-one.vercel.app/api";
export const baseUrl = check[0] === "http" ? "http://localhost:3000/api" : "https://chat-be-production-b38b.up.railway.app/api";

export const prepareHeaders = (headers) => {
  // const token = localStorage.getItem("token");
  // if (token) {
  //   headers.set("Authorization", `Bearer ${token}`);
  // }
  return headers;
};
