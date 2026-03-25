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

export type ClickMetadataValue =
  | string
  | number
  | boolean
  | null
  | undefined;

export type SiteClickPayload = {
  buttonKey: string;
  buttonLabel: string;
  pagePath?: string;
  productId?: number | null;
  metadata?: Record<string, ClickMetadataValue>;
};

export type ProductClickAnalytics = Product & {
  total_clicks: number;
  preview_clicks: number;
  affiliate_clicks: number;
  last_clicked_at: string | null;
};

export type ButtonClickAnalytics = {
  button_key: string;
  button_label: string;
  total_clicks: number;
  last_clicked_at: string | null;
  sample_path: string | null;
};

export type RecentClickActivity = {
  id: number;
  clicked_at: string;
  button_key: string;
  button_label: string;
  page_path: string | null;
  product_id: number | null;
  metadata: Record<string, ClickMetadataValue> | null;
};

export type AdminSession = {
  adminId: string;
  username: string;
  displayName: string;
  exp: number;
};

export type AdminDashboardData = {
  productAnalytics: ProductClickAnalytics[];
  buttonAnalytics: ButtonClickAnalytics[];
  recentClicks: RecentClickActivity[];
  totals: {
    totalProducts: number;
    totalTrackedButtons: number;
    totalSiteClicks: number;
    totalProductClicks: number;
    lastActivityAt: string | null;
  };
};
