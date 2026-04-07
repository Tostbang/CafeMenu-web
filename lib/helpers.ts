
import Cookies from "js-cookie"

export function getToken() {
  return Cookies.get('token');
}
export function updateToken(token: string) {
  Cookies.set('token', token, { expires: 10 });
}
export function deleteToken() {
  Cookies.remove('token');
}


export function convertToTRYLira(input: number) {
  return `₺${input.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export const toNumberSafe = (value: string | number | null | undefined): number => {
  if (value == null) return 0;
  if (typeof value === "number") return value;

  const parsed = Number(value);
  return isNaN(parsed) ? 0 : parsed;
};

export const toStringSafe = (
  value: string | number | null | undefined | unknown,
): string => {
  return value == null ? "" : String(value);
};
