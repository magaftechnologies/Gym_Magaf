import { createFileRoute } from "@tanstack/react-router";
import { SchedulePage } from "@/components/site/SchedulePage";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/schedule")({
  head: () =>
    pageHead(
      "Class schedule",
      "Browse MEGA GYM's weekly timetable and request a strength, conditioning or recovery session.",
    ),
  component: SchedulePage,
});
