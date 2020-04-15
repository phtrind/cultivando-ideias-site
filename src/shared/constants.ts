const debugUrl = "http://localhost:5003/cultivando-ideias/us-central1/api/";
const prodUrl = "https://us-central1-cultivando-ideias.cloudfunctions.net/api/";
const url = process.env.NODE_ENV === "development" ? debugUrl : prodUrl;

export const postsServiceApi = `${url}posts/`;
export const authorsServiceApi = `${url}authors/`;
