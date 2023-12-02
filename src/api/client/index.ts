import axios, {AxiosError, AxiosInstance} from 'axios';
import {backOff} from 'exponential-backoff';

const backOffOptions = {
  delayFirstAttempt: true,
  jitter: 'full',
  numOfAttempts: 25,
  maxDelay: 1000,
  startingDelay: 10,
  timeMultiple: 5,
  retry: (error: unknown) => {
    return (
      axios.isAxiosError(error) &&
      error.response?.status != null &&
      error.response?.status >= 500
    );
  },
} as const;

async function createClient(): Promise<AxiosInstance> {
  return axios.create({
    baseURL: 'https://wger.de/api/v2/',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function post<TRequest, TResponse>(
  path: string,
  payload: TRequest,
): Promise<TResponse> {
  const client = await createClient();

  const response = await backOff(
    async () => client.post<TResponse>(path, payload),
    backOffOptions,
  );
  return response.data;
}

export async function patch<TRequest, TResponse>(
  path: string,
  payload: TRequest,
): Promise<TResponse> {
  const client = await createClient();

  const response = await backOff(
    async () => client.patch<TResponse>(path, payload),
    backOffOptions,
  );
  return response.data;
}

export async function put<TRequest, TResponse>(
  path: string,
  payload: TRequest,
): Promise<TResponse> {
  const client = await createClient();

  const response = await backOff(
    async () => client.put<TResponse>(path, payload),
    backOffOptions,
  );
  return response.data;
}

export async function get<TResponse>(
  path: string,
  queryParams?: {[key: string]: string | number},
): Promise<TResponse> {
  const client = await createClient();

  const response = await backOff(
    async () => client.get<TResponse>(path, {params: queryParams}),
    backOffOptions,
  );
  console.log('response', response);
  return response.data;
}

export async function del<TResponse>(
  path: string,
  queryParams?: {[key: string]: string | number},
): Promise<TResponse> {
  const client = await createClient();

  const response = await backOff(
    async () => client.delete<TResponse>(path, {params: queryParams}),
    backOffOptions,
  );
  return response.data;
}

export const isApiError = (
  error: unknown,
  expectedStatus?: number,
  expectedCode?: string,
): error is AxiosError<{
  code?: string;
  data?: {[key: string]: unknown};
  error?: string;
}> => {
  return (
    axios.isAxiosError(error) &&
    (!expectedStatus || error.response?.status === expectedStatus) &&
    (!expectedCode || error.response?.data.code === expectedCode)
  );
};

export const isNetworkError = (
  error: unknown,
): error is AxiosError<{
  code?: string;
  data?: {[key: string]: unknown};
  error?: string;
}> => {
  return (
    axios.isAxiosError(error) && !error.response && error.code === 'ERR_NETWORK'
  );
};

export const getApiErrorCode = (error: unknown) => {
  return axios.isAxiosError(error) ? error.response?.data.code : null;
};
