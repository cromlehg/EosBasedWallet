import axios from 'axios';

const http = axios.create({
  headers: {},
  contentType: 'text/json'
});

export default http;
