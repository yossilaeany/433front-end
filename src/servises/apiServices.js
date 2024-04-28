import axios from "axios";

export const API_URL="http://localhost:3005/";
export const TOKEN_KEY="MyToken";


// for logging
export const doApiGet = async (_url) => {
  try {
    let resp = await axios({
      method: "GET",
      url: _url,
      headers: {
        "x-api-key": localStorage[TOKEN_KEY],
      },
    });
    return resp.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// for all requests to the server
export const doApiMethod = async (_url, _method, _body = {}) => {
    try {
        let resp = await axios({
        url: _url,
        method: _method,
        data: _body,
        headers: {
            "x-api-key": localStorage[TOKEN_KEY]
        }
        });
        return resp.data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }   
}


