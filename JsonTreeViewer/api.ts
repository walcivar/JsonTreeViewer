export const fetchData = async (fetchUrl: string): Promise<any[]> => {
    // Make your HTTP request here and return the JSON data
    const response = await fetch(fetchUrl, {
        method: "POST", // Use the appropriate HTTP method
        headers: {
          "Content-Type": "application/json", // Replace with the appropriate content type
          // Add any other headers you need, e.g., authorization token
        },
      });
    const data = await response.json();
    return data;
};