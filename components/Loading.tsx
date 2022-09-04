import React from "react"
import { Spinner } from "./Spinner"

export const Loading = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <Spinner />
    <span className="mt-2 font-bold">Loading...</span>
  </div>
)
