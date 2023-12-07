import { ContentLayout } from "@/components";
import { PieChart } from "@/features";
import { BugSeverityData, BugStatusData, BugTrendOverTimeData, UserPerformance, } from "@/utils";
import { BugSeverityChart } from "@/features/dashboard/components/BugSeverityChart.tsx";
import { useBoolean } from "usehooks-ts";
import { BugTrendOverTimeLineChart } from "@/features/dashboard/components/BugTrendOverTimeLineChart.tsx";
import { UserPerformanceDayWiseChart } from "@/features/dashboard/components/UserPerformanceDayWiseChart.tsx";
import { useGetUser } from "@/hooks/useGetUser.ts";


export const Dashboard = () => {
  const user = useGetUser();
  const isDataAvailable = useBoolean(user?.email === "kk@gmail.com");
  return (
    <ContentLayout title={"Dashboard"}>
      {isDataAvailable.value ?
        <div className={"flex flex-col gap-8"}>
          <div className={"mt-4"}>Dummy Data charts</div>
          <div className={"flex flex-col gap-4 h-[60vh] md:flex-row"}>
            <div className={"border-2 rounded-lg  h-full w-full flex flex-col gap-2 p-2"}>
              <div>
                <div className={"text-xl font-semibold text-center"}>Bugs Overview By Status</div>
              </div>
              <div className={"h-5/6"}>
                <PieChart data={BugStatusData}/>
              </div>
            </div>
            <div className={"border-2 rounded-lg h-full w-full flex flex-col gap-2 p-2"}>
              <div>
                <div className={"text-xl font-semibold text-center"}>Bugs Per Project</div>
              </div>
              <div className={"h-5/6"}>
                <BugSeverityChart data={BugSeverityData}/>
              </div>
            </div>
          </div>
          <div className={"h-[60vh]"}>
            <div className={"border-2 rounded-lg h-full w-full flex flex-col gap-2 p-2"}>
              <div>
                <div className={"text-xl font-semibold text-center"}>Bugs Trend</div>
              </div>
              <div className={"h-5/6"}>
                <BugTrendOverTimeLineChart data={BugTrendOverTimeData}/>
              </div>
            </div>
          </div>
          <div className={"h-[60vh]"}>
            <div className={"border-2 rounded-lg h-full w-full flex flex-col gap-4 p-2"}>
              <div>
                <div className={"text-xl font-semibold text-center"}>Bug Solved</div>
              </div>
              <div className={"h-4/6"}>
                <UserPerformanceDayWiseChart data={UserPerformance}/>
              </div>
            </div>
          </div>
        </div>
        :
        <div>Not Enough Data </div>
      }
    </ContentLayout>
  );
};
