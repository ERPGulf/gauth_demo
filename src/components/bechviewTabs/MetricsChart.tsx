import ChartComponent from "./ChartComponent";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getMetrics } from "@/utils/api/dashboard/API-metrics";
import {
  selectedHostname,
  selectedServerCloudPlatform,
} from "@/redux/slices/CloudserverSlice";
import { Metric } from "@/types/metrics-types";

interface MetricChartProps {
  dataIndex: number;
  columns: number;
}

const MetricChart = ({ dataIndex, columns }: MetricChartProps) => {
  const hostname = useSelector(selectedHostname);
  const cloudPlatform = useSelector(selectedServerCloudPlatform);
  const { data } = useQuery({
    queryKey: ["Metrics", hostname, cloudPlatform],
    queryFn: () =>
      hostname && cloudPlatform
        ? getMetrics(hostname, cloudPlatform)
        : Promise.resolve([]),
    enabled: Boolean(hostname),
  });

  if (!data?.[dataIndex]?.metrics) {
    return <div className="justiify-center">Loading </div>;
  }

  const metricsData = data[dataIndex].metrics as Metric[];

  return (
    <div className="flex flex-col space-y-4">
      <div className={`grid grid-cols-${columns} gap-4`}>
        {metricsData.map((metric, index) =>
          metric ? (
            <ChartComponent
              key={index}
              title={metric.title || "No Title"}
              description={metric.description || "No Description"}
              data={metric.points.map((point) => ({
                x: point.X,
                y: point.Y,
              }))}
              unit={metric.unit || "%"}
            />
          ) : null,
        )}
      </div>
    </div>
  );
};

export default MetricChart;
