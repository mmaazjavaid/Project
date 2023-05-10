const base_url = process.env.REACT_APP_BASE_URL;
console.log("inside api")
export const apiCallRequest = async (
    path,
    method,
    requestPayload
) => {
    const response = await fetch(base_url + path, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: requestPayload ? JSON.stringify(requestPayload) : null,
    });
    try {
        const data = await response?.json();
        return data;
    } catch (error) {
        return response;
    }
};
