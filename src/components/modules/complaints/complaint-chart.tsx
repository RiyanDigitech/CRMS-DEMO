"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import Card from "antd/es/card/Card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/widgets/charts";
import ComplaintService from "@/services/complaints.service";
import { DatePicker } from "antd";

const chartConfig = {
  views: {
    label: "Complaints",
  },
  pending: {
    label: "Pending",
    color: "#FFF176",
  },
  inProgress: {
    label: "InProgress",
    color: "#FFB74D",
  },
  resolved: {
    label: "Resolved",
    color: "#81C784",
  },
  rejected: {
    label: "Rejected",
    color: "#E57373",
  },
  closed: {
    label: "Closed",
    color: "#FF8A65",
  },
} satisfies ChartConfig;

const { RangePicker } = DatePicker;

export function ComplaintCharts() {
  const { useFetchComplaintStats } = ComplaintService();
  const [selectedDate, setSelectedDate] = React.useState<string[]>();
  const { data: statsData } = useFetchComplaintStats(
    selectedDate && selectedDate[0],
    selectedDate && selectedDate[1]
  );

  function onChange(_: any, dateString: string[]) {
    setSelectedDate(dateString);
  }

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("pending");

  const charts = React.useMemo(() => {
    return statsData?.data || [];
  }, [statsData]);

  const total = charts.reduce(
    (totals, { pending, inProgress, resolved, closed, rejected }) => ({
      pending: totals.pending + pending,
      inProgress: totals.inProgress + inProgress,
      resolved: totals.resolved + resolved,
      closed: totals.closed + closed,
      rejected: totals.rejected + rejected,
    }),
    { pending: 0, inProgress: 0, resolved: 0, closed: 0, rejected: 0 }
  );

  return (
    <Card>
      <div className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-1 py-5 sm:py-6">
          <h2 className="font-[700]  text-[#323C47] text-xl">
            Quick Statistics
          </h2>
          <p className="text-[#A9B9C6] text-[15px] font-[400]">
            List of ticket opened by Customer
          </p>
          <div className="w-full max-w-[500px]">
            <RangePicker onChange={onChange} />
          </div>
        </div>
        <div className="flex">
          {["pending", "inProgress", "resolved", "closed", "rejected"].map(
            (key) => {
              const chart = key as keyof typeof chartConfig;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart]?.label ?? "Unknown"}
                  </span>
                  {chart === "pending" && (
                    <span
                      className={`text-lg font-bold leading-none sm:text-3xl !text-[#FFF176]`}
                    >
                      {total[key as keyof typeof total].toLocaleString()}
                    </span>
                  )}
                  {chart === "inProgress" && (
                    <span
                      className={`text-lg font-bold leading-none sm:text-3xl !text-[#FFB74D]`}
                    >
                      {total[key as keyof typeof total].toLocaleString()}
                    </span>
                  )}
                  {chart === "resolved" && (
                    <span
                      className={`text-lg font-bold leading-none sm:text-3xl !text-[#81C784]`}
                    >
                      {total[key as keyof typeof total].toLocaleString()}
                    </span>
                  )}
                  {chart === "closed" && (
                    <span
                      className={`text-lg font-bold leading-none sm:text-3xl !text-[#FF8A65]`}
                    >
                      {total[key as keyof typeof total].toLocaleString()}
                    </span>
                  )}
                  {chart === "rejected" && (
                    <span
                      className={`text-lg font-bold leading-none sm:text-3xl !text-[#E57373]`}
                    >
                      {total[key as keyof typeof total].toLocaleString()}
                    </span>
                  )}
                </button>
              );
            }
          )}
        </div>
      </div>
      <div className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={charts}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </div>
    </Card>
  );
}
