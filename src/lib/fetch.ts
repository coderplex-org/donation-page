import fetch from 'isomorphic-unfetch';

export default async function<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);
  const contentType = res.headers.get('content-type');
  if (!res.ok) {
    const data = contentType.includes('application/json') ? await res.json() : await res.text();
    const error = new Error();
    error.message = data ? (data.message ? data.message : data) : res.statusText;
    throw error;
  }
  const data = contentType.includes('application/json') ? await res.json() : await res.text();
  return data;
}
