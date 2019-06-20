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

const restToObject = (...args : any) => {
}

export const makePostRequest = async (url: string, ...args : any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(...args)
    });
    if (response.ok) {
      const json = await response.json(); 
      return json;
    }
  } catch (error) {
    throw new error();
  }
}