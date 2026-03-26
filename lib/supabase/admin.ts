import type {
  AdminDashboardData,
  ButtonClickAnalytics,
  ProductClickAnalytics,
  RecentClickActivity
} from "@/lib/types";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

const IGNORED_ADMIN_BUTTON_KEYS = new Set([
  "category_filter",
  "product_card_select",
  "product_modal_close"
]);

function shouldIgnoreAdminClick(buttonKey: string) {
  return IGNORED_ADMIN_BUTTON_KEYS.has(buttonKey);
}

const EMPTY_DASHBOARD: AdminDashboardData = {
  productAnalytics: [],
  buttonAnalytics: [],
  recentClicks: [],
  totals: {
    totalProducts: 0,
    totalTrackedButtons: 0,
    totalSiteClicks: 0,
    totalProductClicks: 0,
    lastActivityAt: null
  }
};

export async function fetchAdminDashboardData(): Promise<AdminDashboardData> {
  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    return EMPTY_DASHBOARD;
  }

  const [productAnalyticsResult, buttonAnalyticsResult, recentClicksResult] =
    await Promise.all([
      supabase
        .from("product_click_stats")
        .select("*")
        .order("total_clicks", { ascending: false })
        .order("created_at", { ascending: false }),
      supabase
        .from("button_click_stats")
        .select("*")
        .order("total_clicks", { ascending: false }),
      supabase
        .from("site_clicks")
        .select(
          "id, clicked_at, button_key, button_label, page_path, product_id, metadata"
        )
        .order("clicked_at", { ascending: false })
        .limit(60)
    ]);

  if (productAnalyticsResult.error) {
    console.error(
      "Erro ao buscar analytics de produtos:",
      productAnalyticsResult.error.message
    );
  }

  if (buttonAnalyticsResult.error) {
    console.error(
      "Erro ao buscar analytics de botoes:",
      buttonAnalyticsResult.error.message
    );
  }

  if (recentClicksResult.error) {
    console.error(
      "Erro ao buscar atividade recente:",
      recentClicksResult.error.message
    );
  }

  const rawProductAnalytics =
    (productAnalyticsResult.data as
      | (ProductClickAnalytics & { preview_clicks?: number })[]
      | null) ?? [];
  const rawButtonAnalytics =
    (buttonAnalyticsResult.data as ButtonClickAnalytics[] | null) ?? [];
  const rawRecentClicks =
    (recentClicksResult.data as RecentClickActivity[] | null) ?? [];

  const productAnalytics = rawProductAnalytics.map(
    ({ affiliate_clicks, preview_clicks: _previewClicks, ...product }) => ({
      ...product,
      affiliate_clicks,
      total_clicks: affiliate_clicks
    })
  );
  const buttonAnalytics = rawButtonAnalytics.filter(
    (item) => !shouldIgnoreAdminClick(item.button_key)
  );
  const recentClicks = rawRecentClicks
    .filter((item) => !shouldIgnoreAdminClick(item.button_key))
    .slice(0, 12);

  return {
    productAnalytics,
    buttonAnalytics,
    recentClicks,
    totals: {
      totalProducts: productAnalytics.length,
      totalTrackedButtons: buttonAnalytics.length,
      totalSiteClicks: buttonAnalytics.reduce(
        (sum, item) => sum + item.total_clicks,
        0
      ),
      totalProductClicks: productAnalytics.reduce(
        (sum, item) => sum + item.total_clicks,
        0
      ),
      lastActivityAt: recentClicks[0]?.clicked_at ?? null
    }
  };
}
