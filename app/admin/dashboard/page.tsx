import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { requireAdminSession } from "@/lib/admin-session";
import { fetchAdminDashboardData } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();
  const dashboardData = await fetchAdminDashboardData();

  return (
    <AdminDashboard
      initialData={dashboardData}
      adminDisplayName={session.displayName}
    />
  );
}
