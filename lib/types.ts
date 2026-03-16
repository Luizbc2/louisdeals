export type Product = {
  id: number;
  created_at: string;
  titulo: string;
  numero_achado: number;
  link_afiliado: string;
  url_imagem: string;
  categoria: string;
  preco?: string | null;
};
