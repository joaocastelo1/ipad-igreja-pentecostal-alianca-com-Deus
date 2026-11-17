import type { CSSProperties } from "react";

const embers = [
  { left: "8%", top: "68%", delay: "0s", duration: "13s", drift: "16px" },
  { left: "16%", top: "34%", delay: "2.4s", duration: "16s", drift: "-12px" },
  { left: "27%", top: "78%", delay: "4.1s", duration: "14s", drift: "20px" },
  { left: "39%", top: "22%", delay: "1.3s", duration: "18s", drift: "-18px" },
  { left: "48%", top: "58%", delay: "5.6s", duration: "15s", drift: "14px" },
  { left: "58%", top: "40%", delay: "3.2s", duration: "17s", drift: "-16px" },
  { left: "67%", top: "72%", delay: "0.8s", duration: "14s", drift: "18px" },
  { left: "76%", top: "28%", delay: "4.8s", duration: "19s", drift: "-14px" },
  { left: "85%", top: "62%", delay: "2s", duration: "16s", drift: "12px" },
  { left: "92%", top: "18%", delay: "6.2s", duration: "15s", drift: "-20px" },
  { left: "33%", top: "88%", delay: "7.5s", duration: "18s", drift: "10px" },
  { left: "72%", top: "90%", delay: "5.1s", duration: "17s", drift: "-10px" },
];

export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="ambient-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="ambient-stars" />
      <div className="ambient-stars ambient-stars--near" />
      <div className="ambient-band ambient-band--gold" />
      <div className="ambient-band ambient-band--fire" />
      <div className="ambient-glow ambient-glow--gold" />
      <div className="ambient-glow ambient-glow--fire" />

      {embers.map((ember, index) => (
        <span
          key={index}
          className="ember ambient-ember"
          style={
            {
              left: ember.left,
              top: ember.top,
              "--delay": ember.delay,
              "--duration": ember.duration,
              "--drift": ember.drift,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
