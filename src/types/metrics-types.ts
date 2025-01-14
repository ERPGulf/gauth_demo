export interface ChartData {
  x: string;
  y: number;
}

export interface Metrics {
  title: string;
  description: string;
  unit: string;
  data: ChartData[];
}

export interface Metric {
  title: string;
  description: string;
  unit: string;
  points: { X: string; Y: number }[];
}
