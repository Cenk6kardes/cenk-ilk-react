const httpFetch = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error("An error occured while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  return await response.json();
};

export default httpFetch;
