import React from "react"
import { StatusSummary } from "../hooks/useStatusSummaries"

interface StatusSummaryTableProps {
  statusSummaries: StatusSummary[]
}

export const StatusSummaryTable = ({ statusSummaries }: StatusSummaryTableProps) => {
  const totalOfTotals = statusSummaries.reduce((acc, curr) => acc + curr.total, 0)

  return (
    <div>
      <table className="w-full lg:w-64">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-2 pr-4">ID</th>
            <th className="text-left py-2 pr-4">Description</th>
            <th className="text-left py-2">Count</th>
          </tr>
        </thead>

        <tbody>
          {statusSummaries.map((status) => (
            <tr className="border-b border-gray-200" key={status.id}>
              <td className="py-2">{status.id}</td>
              <td className="py-2">{status.description}</td>
              <td className="py-2">{status.total}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td></td>
            <th className="text-right pr-2" scope="row">
              Total count
            </th>
            <td className="font-bold">{totalOfTotals}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
