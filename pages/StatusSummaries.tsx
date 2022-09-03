import React from "react"
import { Loading } from "../components/Loading"
import { useStatusSummaries } from "../hooks/useStatusSummaries"
import { SummariesChart } from "../components/SummariesChart"
import { StatusSummaryTable } from "../components/StatusSummaryTable"

const StatusSummaries = () => {
  const { loading, statuses } = useStatusSummaries()

  if (loading) return <Loading />

  return (
    <div>
      <StatusSummaryTable statusSummaries={statuses} />
      <SummariesChart statusSummaries={statuses} />
    </div>
  )
}

export default StatusSummaries
