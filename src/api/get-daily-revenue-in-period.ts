import { api } from "@/lib/axios";

export interface GetDailyRevenueInPeriodProps {
  to: Date | undefined;
  from: Date | undefined;
}

export type GetDailyRevenueInPeriodResponse = {
  date: string;
  receipt: number;
}[];

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodProps) {
  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    "/metrics/daily-receipt-in-period",
    { params: { from, to } },
  );

  return response.data;
}
