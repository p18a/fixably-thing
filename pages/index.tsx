import type { NextPage } from "next"
import { Card } from "../components/Card"
import { Loading } from "../components/Loading"
import { StatusSummaryTable } from "../components/StatusSummaryTable"
import { SummariesChart } from "../components/SummariesChart"
import { useStatusSummaries } from "../hooks/useStatusSummaries"

const Home: NextPage = () => {
  const { loading, statuses } = useStatusSummaries()

  if (loading) return <Loading />

  return (
    <div className="flex flex-col w-full h-screen bg-slate-100 items-center">
      <h1 className="text-3xl font-bold mt-12 mb-8">Status statistics</h1>
      <div className="flex flex-col lg:flex-row w-full justify-center items-stretch">
        <Card>
          <StatusSummaryTable statusSummaries={statuses} />
        </Card>
        <Card>
          <SummariesChart statusSummaries={statuses} />
        </Card>
      </div>
    </div>
  )
}

export default Home
