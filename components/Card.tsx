import React, { ReactNode } from "react"
import s from "./Card.module.css"

interface CardProps {
  children: ReactNode | ReactNode[]
}

export const Card = ({ children }: CardProps) => (
  <div className={`${s.shadow} p-8 my-2 mx-4 rounded-lg bg-slate-50`}>{children}</div>
)
