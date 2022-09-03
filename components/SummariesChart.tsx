import React, { useEffect, useRef } from "react"
import { select, scaleLinear, scaleBand, axisBottom, axisLeft } from "d3"
import { StatusSummary } from "../hooks/useStatusSummaries"

const drawChart = (statuses: StatusSummary[], chart: HTMLDivElement) => {
  const total = statuses.reduce((acc, curr) => acc + curr.total, 0)

  const margin = { top: 20, right: 30, bottom: 40, left: 90 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom

  select(chart).selectAll("*").remove()

  const svg = select(chart)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  const x = scaleLinear().domain([0, total]).range([0, width])

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")

  const y = scaleBand()
    .range([0, height])
    .domain(statuses.map((d) => d.description))
    .padding(0.1)

  svg.append("g").call(axisLeft(y))

  svg
    .selectAll("myRect")
    .data(statuses)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", (d) => y(d.description) ?? 0)
    .attr("width", (d) => x(d.total))
    .attr("height", y.bandwidth())
    .attr("fill", "#2563eb")
}

interface SummariesChartProps {
  statusSummaries: StatusSummary[]
}

export const SummariesChart = ({ statusSummaries }: SummariesChartProps) => {
  const chart = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chart.current || !statusSummaries.length) return

    drawChart(statusSummaries, chart.current)
  }, [statusSummaries])

  return <div ref={chart} />
}
