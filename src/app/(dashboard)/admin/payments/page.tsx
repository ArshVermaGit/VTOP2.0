import { getAllPayments } from "@/lib/admin-actions"
import { PaymentManagementClient } from "@/sections/admin/PaymentManagementClient"

export default async function AdminPaymentsPage() {
  const payments = await getAllPayments()

  return <PaymentManagementClient initialPayments={payments as unknown as Parameters<typeof PaymentManagementClient>[0]['initialPayments']} />
}
