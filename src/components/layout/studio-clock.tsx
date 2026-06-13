"use client";

import * as React from "react";

function formatIst(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  }).format(date);
}

/** Live studio time. Renders nothing until mounted to avoid hydration drift. */
function StudioClock() {
  const [time, setTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    const tick = () => setTime(formatIst(new Date()));
    tick();
    const interval = window.setInterval(tick, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="dim-label tabular-nums">
      New Delhi — {time ?? "--:--"} IST
    </span>
  );
}

export { StudioClock };
