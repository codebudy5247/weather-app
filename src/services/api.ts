import * as axios from "axios";

const apiURL = "http://api.weatherapi.com/v1";
const apiKEY = "dd3e23a5c9ae43d0b3d105826241306";

interface ResponseData {
  data: any;
  status: any;
}
function normalizeServerResponse(serverResponse: any) {
  let response: ResponseData = {
    data: serverResponse.data,
    status: serverResponse.status,
  };

  return response;
}
function normalizeServerError(serverResponse: any) {
  let response: ResponseData = {
    data: serverResponse.response.data.message,
    status: serverResponse.status,
  };

  return response;
}

export async function getWeather(lat: number, lon: number) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/current.json?key=${apiKEY}&q=${lat},${lon}`,
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}
