import { getAllUsers } from "@/lib/admin-actions"
import { UserManagementClient } from "@/sections/admin/UserManagementClient"

export default async function UserManagementPage() {
  const users = await getAllUsers()
  
  return <UserManagementClient users={users} />
}
