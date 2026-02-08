import { getParentsList } from "@/lib/admin-actions"
import { ParentManagementClient } from "@/sections/admin/ParentManagementClient"

export default async function AdminParentsPage() {
  const parents = await getParentsList()

  return <ParentManagementClient initialParents={parents as unknown as Parameters<typeof ParentManagementClient>[0]['initialParents']} />
}
