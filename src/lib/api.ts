import type {
  Banner,
  BannersResponse,
  Category,
  OrderPayload,
  OrderResponse,
  OrderTrackingResponse,
  PlantInfo,
  PlantInfoResponse,
  ProductsResponse,
  SingleProductResponse,
  SuperCategoriesResponse,
  SuperCategory,
} from "@/types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://ec.mis.digital/api2";
const IMAGE_BASE_URL = "https://ec.mis.digital";

export function resolveImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path)) return path;
  return `${IMAGE_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      // ignore non-JSON error bodies
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

export function fetchProducts(params?: {
  page?: number;
  paginate?: number;
  search?: string;
  categoryCode?: number;
}): Promise<ProductsResponse> {
  const search = new URLSearchParams();
  if (params?.page) search.set("page", String(params.page));
  if (params?.paginate) search.set("paginate", String(params.paginate));
  if (params?.search?.trim()) search.set("search", params.search.trim());
  if (params?.categoryCode != null) {
    search.set("categoryCode", String(params.categoryCode));
  }
  const qs = search.toString();
  return request<ProductsResponse>(
    `/site/all-products-paginated${qs ? `?${qs}` : ""}`,
  );
}

export function fetchSuperCategories(): Promise<SuperCategory[]> {
  return request<SuperCategoriesResponse>("/site/super-category").then(
    (res) => res.data ?? [],
  );
}

// The /api/site/all-category/{id} endpoint returns categories under a given
// super-category. The API may return either an array, a `{ data: [...] }`
// envelope, or a single object — handle all three defensively.
export async function fetchCategoriesBySuper(
  superCategoryCode: number,
): Promise<Category[]> {
  const raw = await request<unknown>(`/site/all-category/${superCategoryCode}`);

  if (Array.isArray(raw)) return raw as Category[];
  if (raw && typeof raw === "object") {
    const obj = raw as { data?: unknown; CategoryCode?: unknown };
    if (Array.isArray(obj.data)) return obj.data as Category[];
    if (typeof obj.CategoryCode === "number") return [raw as Category];
  }
  return [];
}

export function fetchProductDetail(
  productCode: string,
): Promise<SingleProductResponse> {
  return request<SingleProductResponse>(
    `/site/product/${encodeURIComponent(productCode)}`,
  );
}

export function placeOrder(payload: OrderPayload): Promise<OrderResponse> {
  return request<OrderResponse>("/site/order", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function trackOrder(saleCode: string): Promise<OrderTrackingResponse> {
  return request<OrderTrackingResponse>(
    `/site/order-tracking?sale_code=${encodeURIComponent(saleCode)}`,
  );
}

export function fetchPlantInfo(plantCode = "P001"): Promise<PlantInfo> {
  return request<PlantInfoResponse>(
    `/site/plant/${encodeURIComponent(plantCode)}`,
  ).then((res) => res.data);
}

export function fetchBanners(): Promise<Banner[]> {
  return request<BannersResponse>("/site/banner").then((res) => res.data ?? []);
}
