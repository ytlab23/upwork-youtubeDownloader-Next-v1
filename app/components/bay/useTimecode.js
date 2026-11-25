"use client";
import { useEffect, useRef, useState } from "react";

const FPS = 25;

/** Milliseconds as editor timecode, HH:MM:SS:FF at 25 frames per second. */
export function formatTimecode(ms) {
  const totalFrames = Math.max(0, Math.floor((ms / 1000) * FPS));
  const frames = totalFrames % FPS;
  const totalSeconds = Math.floor(totalFrames / FPS);
  const pad = (value) => String(value).padStart(2, "0");
  return `${pad(Math.floor(totalSeconds / 3600))}:${pad(Math.floor(totalSeconds / 60) % 60)}:${pad(totalSeconds % 60)}:${pad(frames)}`;
}

/** Runs while `running` is true; otherwise shows the last measured duration. */
export function useTimecode(running, settledMs) {
  const [ms, setMs] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    if (!running) return undefined;
    const started = performance.now();
    const tick = () => {
      setMs(performance.now() - started);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [running]);

  return formatTimecode(running ? ms : settledMs);
}
