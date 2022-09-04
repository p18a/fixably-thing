import { useCallback, useEffect, useRef, useState } from "react"
import * as RT from "runtypes"
import { API_ROOT } from "../constants"
import { createFormDataBody } from "../utils/createFormDataBody"
import { getAuthHeaders } from "../utils/getAuthHeader"

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
    const authHeaders = await getAuthHeaders()

    const statusesRes = await fetch(new URL("statuses", API_ROOT).toString(), {
      ...authHeaders,
    })

    const statuses = StatusesResRT.check(await statusesRes.json())

    const promises = statuses.map(async (status) => {
      const searchRes = await fetch(new URL("search/statuses", API_ROOT).toString(), {
        ...authHeaders,
        ...createFormDataBody({ Criteria: status.description }),
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
