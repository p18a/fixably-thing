import React from "react"
import { StatusSummary } from "../hooks/useStatusSummaries"

interface StatusSummaryTableProps {
  statusSummaries: StatusSummary[]
}

export const StatusSummaryTable = ({ statusSummaries }: StatusSummaryTableProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {statusSummaries.map((status) => (
            <tr>
              <td>{status.id}</td>
              <td>{status.description}</td>
              <td>{status.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
