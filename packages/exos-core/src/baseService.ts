import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface BaseRequestConfig extends AxiosRequestConfig {
  // For now, it's just a clone of AxiosRequestConfig
}

/**
 * Performs a GET operation against our backend
 * @param url {string} The request URL
 * @param config The request configuration
 * @returns A promise that, when fullfilled, returns the response received from the backend
 * @throws An error if something happens
 */
async function get<T>(url: string, config: BaseRequestConfig = {}): Promise<T> {
  const requestConfig = { ...config };
  const response: AxiosResponse<T> = await axios.get(url, requestConfig);
  return response.data;
}

/**
 * Performs a POST operation against our backend
 * @param url The request URL
 * @param config The request configuration
 * @returns A promise that, when fullfilled, returns the response received from the backend
 * @throws An error if something happens
 */
async function post<T>(url: string, body: any = {}, config: BaseRequestConfig = {}): Promise<T> {
  const requestConfig = { ...config };
  const response: AxiosResponse<T> = await axios.post(url, body, requestConfig);
  return response.data;
}

/**
 * Performs an authenticated PUT operation against our backend
 * @param url The request URL
 * @param config The request configuration
 * @returns A promise that, when fullfilled, returns the response received from the backend
 * @throws An error if something happens
 */
async function put<T>(url: string, body: any = {}, config: BaseRequestConfig = {}): Promise<T> {
  const requestConfig = { ...config };
  const response: AxiosResponse<T> = await axios.put(url, body, requestConfig);
  return response.data;
}

/**
 * Performs an authenticated DELETE operation against our backend
 * @param url The request URL
 * @param config The request configuration
 * @returns A promise that, when fullfilled, returns the response received from the backend
 * @throws An error if something happens
 */
async function del<T>(url: string, config: BaseRequestConfig = {}): Promise<T> {
  const requestConfig = { ...config };
  const response: AxiosResponse<T> = await axios.delete(url, requestConfig);
  return response.data;
}

export { get, post, put, del };
