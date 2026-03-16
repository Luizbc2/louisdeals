import type { Product } from "@/lib/types";

export const mockProducts: Product[] = [
  {
    id: 1,
    created_at: "2026-03-16T10:00:00.000Z",
    titulo: "Organizador de gaveta ajustavel",
    numero_achado: 101,
    link_afiliado: "https://shopee.com.br/",
    url_imagem:
      "https://images.unsplash.com/photo-1582582429416-47f01bbee4af?auto=format&fit=crop&w=800&q=80",
    categoria: "Casa",
    preco: "R$ 29,90"
  },
  {
    id: 2,
    created_at: "2026-03-16T10:05:00.000Z",
    titulo: "Mini liquidificador portatil USB",
    numero_achado: 202,
    link_afiliado: "https://shopee.com.br/",
    url_imagem:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80",
    categoria: "Cozinha",
    preco: "R$ 49,90"
  },
  {
    id: 3,
    created_at: "2026-03-16T10:10:00.000Z",
    titulo: "Suporte magnetico para celular no carro",
    numero_achado: 303,
    link_afiliado: "https://shopee.com.br/",
    url_imagem:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    categoria: "Tech",
    preco: "R$ 19,90"
  },
  {
    id: 4,
    created_at: "2026-03-16T10:15:00.000Z",
    titulo: "Escova eletrica de limpeza multiuso",
    numero_achado: 404,
    link_afiliado: "https://shopee.com.br/",
    url_imagem:
      "https://images.unsplash.com/photo-1583947582886-f40ec95dd752?auto=format&fit=crop&w=800&q=80",
    categoria: "Casa",
    preco: "R$ 39,90"
  }
];
