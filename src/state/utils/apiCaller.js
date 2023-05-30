const base_url = process.env.REACT_APP_BASE_URL;
export const apiCallRequest = async (path, method, requestPayload, contentType = true) => {
  const response = await fetch(base_url + path, {
    method,
    headers: {
      ...(contentType && { "Content-Type": "application/json" }),
    },
    body: requestPayload ? (contentType ? JSON.stringify(requestPayload) : requestPayload) : null,
  });
  try {
    const data = await response?.json();
    return data;
  } catch (error) {
    return response;
  }
};
