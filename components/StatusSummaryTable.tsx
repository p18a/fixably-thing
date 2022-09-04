import React from "react"
import { StatusSummary } from "../hooks/useStatusSummaries"

interface StatusSummaryTableProps {
  statusSummaries: StatusSummary[]
}

export const StatusSummaryTable = ({ statusSummaries }: StatusSummaryTableProps) => {
  return (
    <div>
      <table className="w-full lg:w-64">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-2 pr-4">ID</th>
            <th className="text-left py-2 pr-4">Description</th>
            <th className="text-left py-2">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {statusSummaries.map((status) => (
            <tr key={status.id}>
              <td className="py-2">{status.id}</td>
              <td className="py-2">{status.description}</td>
              <td className="py-2">{status.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
