import { RequireAuth } from "@/features/auth/RequireAuth";
import { AdminPanel } from "@/features/admin/AdminPanel";

export default function AdminPage() {
  return (
    <RequireAuth role="admin">
      <AdminPanel />
    </RequireAuth>
  );
}
