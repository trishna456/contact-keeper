//check to see if a token is passed in,
//if yes then set it to the global header ie.default headers
//if not then delete it from the global header

import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
