import { API_KEY, API_ROOT } from "../constants"
import { createFormDataBody } from "./createFormDataBody"

const AUTH_DATA_KEY = "AUTH_TOKEN"
const MS_IN_10_MINS = 600000

type AuthHeaders = {
  headers: {
    "X-Fixably-Token": string
  }
}

export const getAuthHeaders = async (): Promise<AuthHeaders> => {
  const authData = JSON.parse(sessionStorage.getItem(AUTH_DATA_KEY) ?? "{}")
  const tokenCreatedAt = Number.parseInt(authData.createdAt, 10)

  if (authData.token && tokenCreatedAt && new Date().valueOf() - tokenCreatedAt < MS_IN_10_MINS) {
    return { headers: { "X-Fixably-Token": authData.token } }
  }

  const res = await fetch(new URL("token", API_ROOT).toString(), {
    method: "POST",
    ...createFormDataBody({ Code: API_KEY }),
  })
  const { token } = await res.json()

  sessionStorage.setItem(AUTH_DATA_KEY, JSON.stringify({ token, createdAt: new Date().valueOf() }))

  return { headers: { "X-Fixably-Token": token } }
}
