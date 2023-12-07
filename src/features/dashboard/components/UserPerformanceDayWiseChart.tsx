import React from 'react';
import { ResponsiveTimeRange } from "@nivo/calendar";

type UserPerformanceDayWiseChartProps = {
  data: { value: number, day: string }[]
}
export const UserPerformanceDayWiseChart = ({ data /* see data tab */ }: UserPerformanceDayWiseChartProps) => (
  <ResponsiveTimeRange
    data={data}
    from={new Date(new Date().getFullYear(), 0, 1)}
    to={new Date()}
    emptyColor="#E9ECE9FF"
    colors={["rgb(229,245,224)", "rgb(199, 233, 192)", "rgb(161, 217, 155)", "rgb(116, 196, 118)", "rgb(65, 171, 93)", "rgb(35, 139, 69)", "rgb(0, 109, 44)", "rgb(0, 68, 27)"]}
    margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
    dayBorderWidth={2}
    dayBorderColor="#ffffff"
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'row',
        justify: false,
        itemCount: 4,
        itemWidth: 42,
        itemHeight: 36,
        itemsSpacing: 14,
        itemDirection: 'right-to-left',
        translateX: -60,
        translateY: -60,
        symbolSize: 20
      }
    ]}
  />
);