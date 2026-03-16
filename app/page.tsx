import { Header } from "@/components/header";
import { ProductShowcase } from "@/components/product-showcase";
import { fetchProducts } from "@/lib/supabase/products";

export const revalidate = 300;

type HomePageProps = {
  searchParams?: Promise<{
    busca?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const numeroAchado = resolvedSearchParams?.busca;
  const products = await fetchProducts(numeroAchado);

  return (
    <main className="page-shell">
      <Header />
      <ProductShowcase initialProducts={products} />
    </main>
  );
}
