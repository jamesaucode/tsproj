export const makeJsonRequest = async (url: string) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      return json; // returns a promise that needs to be resolved
    }
    return ;
  } catch (error) {
    throw new error();
  }
};
