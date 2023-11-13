import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts"

interface InvoiceChartProps {
  paidInvoicesCount: number
  pendingInvoicesCount: number
  draftedInvoicesCount: number
}

export function InvoiceChart({
  pendingInvoicesCount,
  draftedInvoicesCount,
  paidInvoicesCount,
}: InvoiceChartProps) {
  const data = [
    { label: "pending", value: pendingInvoicesCount },
    { label: "paid", value: paidInvoicesCount },
    { label: "drafted", value: draftedInvoicesCount },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="label"
          stroke="hsl(var(--muted))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Bar dataKey="value" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
