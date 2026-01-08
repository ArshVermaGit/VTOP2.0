import { getParentsList } from "@/lib/admin-actions"
import { ParentManagementClient } from "@/components/admin/ParentManagementClient"

export default async function AdminParentsPage() {
  const parents = await getParentsList()

  return <ParentManagementClient initialParents={parents as any} />
}
