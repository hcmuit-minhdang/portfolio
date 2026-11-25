"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("vi-VN", {
  timeZone: "Asia/Ho_Chi_Minh",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}

const currentSecond = () => Math.floor(Date.now() / 1000);

// Giờ Việt Nam, bất kể người xem ở múi giờ nào. Server không hiện giờ
// vì trang được dựng sẵn.
export function Clock() {
  const second = useSyncExternalStore<number | null>(
    subscribe,
    currentSecond,
    () => null,
  );

  return (
    <time className="tabular-nums">
      {second === null ? "--:--:--" : format.format(second * 1000)}
    </time>
  );
}
