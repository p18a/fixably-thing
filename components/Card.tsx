import React, { ReactNode } from "react"
import s from "./Card.module.css"

interface CardProps {
  children: ReactNode | ReactNode[]
}

export const Card = ({ children }: CardProps) => (
  <div className={`${s.shadow} p-8 m-2 mb-4 lg:m-4 rounded-lg bg-slate-50`}>{children}</div>
)
