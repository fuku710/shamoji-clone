const BASE_URL = "http://localhost:5000";

export const apiClient = async (path: string, method: "GET" | "POST" | "PATCH" | "DELETE", options?: { accessToken?: string; json?: object }) => {
  const headers = new Headers();
  if (method == "POST" || method == "PATCH") {
    headers.append("Content-Type", "application/json");
  }
  if (options && options.accessToken) {
    headers.append("Authorization", `jwt ${options.accessToken}`);
  }
  if (options && options.json) {
    return fetch(`${BASE_URL}${path}`, {
      method,
      headers: headers,
      body: JSON.stringify(options.json),
    });
  } else {
    return fetch(`${BASE_URL}${path}`, {
      method,
      headers: headers,
    });
  }
};
