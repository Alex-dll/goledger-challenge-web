import axios from "axios";

const baseUrl = "http://ec2-100-25-136-128.compute-1.amazonaws.com/api/";

export const http = axios.create({
  baseURL: baseUrl as string,
});
