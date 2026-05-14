export interface Variant {
  VariantId: number;
  SKU: string | null;
  BarCode: string | null;
  SellingPrice: number;
  Color: string | null;
  Size: string | null;
  Stock: number;
  Images: string[];
}

export interface ApiProduct {
  ProductCode: string;
  ProductName: string;
  CategoryCode: number | null;
  CategoryName: string | null;
  Variants: Variant[];
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

export interface ProductsResponse {
  statusCode: number;
  message: string;
  pagination: Pagination;
  data: ApiProduct[];
}

export interface SuperCategory {
  SuperCategoryCode: number;
  SuperCategoryName: string;
  Active: string;
}

export interface SuperCategoriesResponse {
  statusCode: number;
  message: string;
  data: SuperCategory[];
}

export interface Category {
  CategoryCode: number;
  CategoryName: string;
  Active: string;
  SuperCategoryCode: number;
}

export interface SingleProductResponse {
  statusCode: number;
  message: string;
  data: ApiProduct;
}

export interface SaleProduct {
  product_code: string;
  VariantId: number | null;
  price: number;
  quantity: number;
  total: number;
}

export interface BillingAddress {
  full_name: string;
  mobile: string;
  address: string;
  country_id: number;
  city_id: number;
  area_id: number;
  note: string;
}

export interface OrderPayload {
  sale_products: SaleProduct[];
  sub_total: number;
  total: number;
  shipping_cost: number;
  CustomerCode: string;
  billing_address: BillingAddress;
  user: { id: number };
  payment_method_id: number;
}

export interface OrderResponse {
  statusCode: number;
  message: string;
  IssueNo?: string;
}

export interface OrderTrackingItem {
  ProductCode: string;
  ProductName: string;
  VariantId: number | null;
  SKU: string | null;
  BarCode: string | null;
  UnitPrice: number;
  Net: number;
}

export interface OrderTrackingData {
  IssueNo: string;
  IssueDate: string;
  CustomerCode: string;
  OrderStatus: string;
  ShippingCost: number;
  PaymentMethodId: number;
  BillingAddress: {
    full_name: string;
    mobile: string;
    address: string;
  };
  Items: OrderTrackingItem[];
}

export interface OrderTrackingResponse {
  statusCode: number;
  message: string;
  data: OrderTrackingData;
}

export interface PlantInfo {
  PlantCode: string;
  PlantName: string;
  PlantAddress: string;
  PlantEmail: string;
  PlantPhone: string;
  Active: string;
  ImagePath: string | null;
  Remarks: string | null;
}

export interface PlantInfoResponse {
  data: PlantInfo;
}
