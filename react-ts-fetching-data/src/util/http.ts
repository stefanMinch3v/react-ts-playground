// aleternatives - https://github.com/TanStack/query and zod
export async function get<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch the data.");
  }

  const result = response.json() as unknown;
  return result as T;
}