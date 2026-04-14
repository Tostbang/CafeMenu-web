
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
const URL = "https://tostbangadminswagger.azurewebsites.net/api";

type Options = {
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'OPTIONS';
  secure?: boolean;
  headers?: HeadersInit;
  body?: object;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number | false;
  bodyType?: 'json' | 'file';
};
export async function FetchData(
  path: string,
  {
    method = 'GET',
    secure = false,
    headers,
    body,
    cache = 'force-cache',
    tags,
    bodyType = 'json',
    revalidate = false,
  }: Options = {},
) {
  try {
    const response = await fetch(`${URL}${path}`, {
      method,
      headers: {
        ...(bodyType === 'json' && { 'Content-Type': 'application/json' }),
        Authorization: secure ? `Bearer ${await getToken()}` : '',
        "Accept-Language": (await cookies()).get("locale")?.value ?? "tr",
        ...(bodyType === 'json' && { Accept: 'text/plain' }),
        ...headers,
      },
      body: bodyType === 'json' ? JSON.stringify(body) : (body as FormData),
      ...(!revalidate && { cache }),
      ...{ next: { tags, ...(revalidate && { revalidate }) } },
    });
    // ...(cache !== 'no-store' && { revalidate })
    if (!response.ok) {
      if (response.status === 401) {
        if (method !== "GET") {
          await deleteToken()
        }
        redirect('/login');
      }

      throw new Error("beklenmeyen bir hata oluştu", { cause: { type: response.type, status: response.status, statusText: response.statusText } });
    }
    const result = await response.json();

    if (result && result.code && result.code !== '200') {
      throw new Error(result.errors[0] ?? result.message ?? "beklenmeyen bir hata oluştu");
    }
    /* Debugger(
      {
        url: `${URL}${path}`,
        method,
        headers: {
          ...(bodyType === 'json' && { 'Content-Type': 'application/json' }),
          Authorization: secure ? `Bearer ${await getToken()}` : '',
          ...(bodyType === 'json' && { Accept: 'text/plain' }),
          ...headers,
        },
        body: bodyType === 'json' ? JSON.stringify(body) : body,
        ...(!revalidate && { cache }),
        ...{ next: { tags, ...(revalidate && { revalidate }) } },
      },
      {
        url: response.url,
        headers: response.headers,
        statusText: response.statusText,
        status: response.status,
        ok: response.ok,
        body: result,
      },
    ); */
    return { success: true, ...result };
  } catch (error) {
    if (error instanceof Error) {
      /* Debugger(
        {
          url: `${URL}${path}`,
          method,
          headers: {
            ...(bodyType === 'json' && { 'Content-Type': 'application/json' }),
            Authorization: secure ? `Bearer ${await getToken()}` : '',
            ...(bodyType === 'json' && { Accept: 'text/plain' }),
            ...headers,
          },
          body: bodyType === 'json' ? JSON.stringify(body) : body,
          ...(!revalidate && { cache }),
          ...{ next: { tags, ...(revalidate && { revalidate }) } },
        },
        {
          url: error.name,
          headers: error.stack,
          statusText: error.message,
          status: error.cause,
          ok: error.cause,
          body: error?.cause ? error.cause : error,
        },
        true,
      ); */
      return { success: false, errors: [error.message] };
    }
  }
}

export async function getToken() {
  return (await cookies()).get('token')?.value;
}
export async function updateToken(token: string) {
  (await cookies()).set('token', token);
}
export async function deleteToken() {
  (await cookies()).delete('token');
}

export const TAGS = {
  brands: "brands",
  about: "about",
  socialMedia: "socialMedia",
  jobPosts: "jobPosts",
  jobApplications: "jobApplications",
  projects: "projects",
  categories: "categories",
  announcements: "announcements",
  qrLinks: "qrLinks",
  employees: "employees",
  leaveRequests: "leaveRequests",
  leaveRequestsEmployee: "leaveRequestsEmployee",
}


/* function Debugger(request: unknown, response: unknown, error: boolean = false) {
  const logNet = debug('http');
  if (error) {
    logNet('>>>>>> REQUEST', request);
    logNet('=========================================');

    logNet('>>>>>> RESPONSE ERROR', response);
    logNet('=========================================');
  } else {
    logNet('>>>>>> REQUEST', request);
    logNet('=========================================');

    logNet('>>>>>> RESPONSE', response);
    logNet('=========================================');
  }
} */
