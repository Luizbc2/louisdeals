import type {
  AdminDashboardData,
  ButtonClickAnalytics,
  ProductClickAnalytics,
  RecentClickActivity
} from "@/lib/types";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

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
        .limit(12)
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

  const productAnalytics =
    (productAnalyticsResult.data as ProductClickAnalytics[] | null) ?? [];
  const buttonAnalytics =
    (buttonAnalyticsResult.data as ButtonClickAnalytics[] | null) ?? [];
  const recentClicks =
    (recentClicksResult.data as RecentClickActivity[] | null) ?? [];

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
