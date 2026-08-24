export const getToken = (): string | null => localStorage.getItem('nyaya_token');
export const setToken = (t: string): void => localStorage.setItem('nyaya_token', t);
export const clearToken = (): void => localStorage.removeItem('nyaya_token');

export type StoredUser = { name: string; email: string; phoneNumber?: string; profilePicture?: string };

export const getUser = (): StoredUser | null => {
  const raw = localStorage.getItem('nyaya_user');
  return raw ? JSON.parse(raw) : null;
};
export const setUser = (u: StoredUser): void =>
  localStorage.setItem('nyaya_user', JSON.stringify(u));
export const clearUser = (): void => localStorage.removeItem('nyaya_user');

export type LawyerUser = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  primaryPracticeArea?: string;
  yearsOfExperience?: number;
  BarCouncilEnrollment?: string;
  profilePicture?: string;
};

export const getLawyer = (): LawyerUser | null => {
  const raw = localStorage.getItem('nyaya_lawyer');
  return raw ? JSON.parse(raw) : null;
};
export const setLawyer = (lawyer: LawyerUser): void =>
  localStorage.setItem('nyaya_lawyer', JSON.stringify(lawyer));
export const clearLawyer = (): void => localStorage.removeItem('nyaya_lawyer');

function authHeaders(): Record<string, string> {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<any> {
  const isFormData = options.body instanceof FormData;
  const res = await fetch(`/api${path}`, {
    ...options,
    headers: {
      ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
      ...authHeaders(),
      ...(options.headers ?? {}),
    },
  });
  const responseText = await res.text();
  let data: any = {};
  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      if (!res.ok) throw new Error(responseText);
    }
  }
  if (!res.ok) throw new Error(data.message ?? data.error ?? 'Request failed');
  return data;
}
