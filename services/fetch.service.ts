
export const handleJSONResponse = (response : Response) => {
    console.log(response);
    return response.json()
    .then(json => {

        if (response.ok) {
            return json;
        } else {
            console.log("REJECT LMAO")
            return Promise.reject(Object.assign({}, json, { status: response.ok, statusText: response.statusText}));
        }
    })
}
export const handleResponse = (response : Response) => {
    const contentType = response.headers.get('content-type');
    if (!contentType) {
        return ;
    }
    if (contentType.includes('application/json')) {
        return handleJSONResponse(response);
    } else {
        throw new Error();
    }
}