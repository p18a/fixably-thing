import { useCallback, useEffect, useRef, useState } from "react"
import * as RT from "runtypes"
import { API_ROOT } from "../constants"
import { createFormData } from "../utils/createFormData"
import { getAuthToken } from "../utils/getAuthToken"

const StatusesResRT = RT.Array(
  RT.Record({
    id: RT.Number,
    description: RT.String,
  })
)

const SearchResRT = RT.Record({
  total: RT.Number,
})

export interface StatusSummary {
  id: number
  description: string
  total: number
}

export const useStatusSummaries = () => {
  const initialized = useRef(false)
  const [loading, setLoading] = useState(true)
  const [statuses, setStatuses] = useState<StatusSummary[]>([])

  const fetchSummaryData = useCallback(async () => {
    const token = await getAuthToken()

    const statusesRes = await fetch(new URL("statuses", API_ROOT).toString(), {
      headers: { "X-Fixably-Token": token },
    })

    const statuses = StatusesResRT.check(await statusesRes.json())

    const promises = statuses.map(async (status) => {
      const searchRes = await fetch(new URL("search/statuses", API_ROOT).toString(), {
        headers: { "X-Fixably-Token": token },
        body: createFormData({ Criteria: status.description }),
        method: "POST",
      })

      const searchData = SearchResRT.check(await searchRes.json())

      return {
        ...status,
        total: searchData.total,
      }
    })

    const statusSummaries = await Promise.all(promises)

    setStatuses(statusSummaries.sort((a, b) => b.total - a.total))
    setLoading(false)
  }, [])

  useEffect(() => {
    if (initialized.current) return

    fetchSummaryData()

    initialized.current = true
  }, [fetchSummaryData])

  return { loading, statuses }
}
