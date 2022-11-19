import axios from "axios";
import { getToken } from "../utils";

export const postReq = async (url, payload, headers) => {
  return await axios
    .post(url, payload, {
      headers: {
        Authorization: getToken(),
        ...headers,
      },
    })
    .then((response) => response)
    .catch((error) => {
      return { error: error };
    });
};

export const getReq = async (url, headers) => {
  return await axios
    .get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: getToken(),
        ...headers,
      },
    })
    .then((response) => response)
    .catch((error) => {
      return { error: error };
    });
};

export const  putReq = async (url, payload, headers) => {
  return await axios
    .put(url, payload, {
      headers: {
        Authorization: getToken(),
        ...headers,
      },
    })
    .then((response) => response)
    .catch((error) => {
      return { error: error };
    });
};

//services for b2b site
export const b2bGetReq = async(url) => {
  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => response)
    .catch((error) => {
      return { error: error };
    });
};

export const b2bPostReq = async(url, payload, headers) => {
  return await axios
    .post(url, payload, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        ...headers,
      },
    })
    .then((response) => response)
    .catch((error) => {
      return { error: error };
    });
};

export const b2bPutReq = async(url, payload, headers) => {
  return await axios
    .put(url, payload, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        ...headers,
      },
    })
    .then((response) => response)
    .catch((error) => {
      return { error: error };
    });
};