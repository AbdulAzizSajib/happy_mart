import { fetchProducts } from "@/lib/api";
import { ProductDetailClient } from "./ProductDetailClient";

export async function generateStaticParams() {
  try {
    const res = await fetchProducts({ page: 1, limit: 100 });
    return res.data.map((p) => ({ id: p.ProductCode }));
  } catch {
    // API unreachable at build time — emit no static pages. In dev the
    // route still works because Next renders dynamic routes on-demand.
    return [];
  }
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductDetailClient key={id} productCode={id} />;
}
