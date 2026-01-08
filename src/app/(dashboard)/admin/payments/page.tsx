import { getAllPayments } from "@/lib/admin-actions"
import { PaymentManagementClient } from "@/components/admin/PaymentManagementClient"

export default async function AdminPaymentsPage() {
  const payments = await getAllPayments()

  return <PaymentManagementClient initialPayments={payments as any} />
}
