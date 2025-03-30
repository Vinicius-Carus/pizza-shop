import { http, HttpResponse } from "msw";
import { GetDailyRevenueInPeriodResponse } from "../get-daily-revenue-in-period";

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>("/metrics/daily-receipt-in-period", () => {
  return HttpResponse.json([
    { date: "2023-10-01", receipt: 31443 },
    { date: "2023-10-02", receipt: 643 },
    { date: "2023-10-03", receipt: 6745665 },
    { date: "2023-10-04", receipt: 21345 },
    { date: "2023-10-05", receipt: 5463 },
    { date: "2023-10-06", receipt: 43432 },
    { date: "2023-10-07", receipt: 2233 },
  ]);
});
