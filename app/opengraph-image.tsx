import { ImageResponse } from "next/og";

export const alt =
  "Mike Zhao — Data · Engineering · Design. Where analytical thinking meets creative execution.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        padding: "62px 76px 58px",
        backgroundColor: "#0b1724",
        color: "#f5f2ea",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <svg
        width="440"
        height="330"
        viewBox="0 0 440 330"
        style={{ position: "absolute", right: -16, top: -22, opacity: 0.65 }}
        aria-hidden="true"
      >
        {Array.from({ length: 9 }, (_, index) => (
          <path
            key={index}
            d={`M ${20 + index * 32} -20 C ${350 - index * 9} 90, ${80 + index * 23} 180, 460 350`}
            stroke="#35475a"
            strokeWidth="2"
            fill="none"
          />
        ))}
      </svg>

      <div style={{ display: "flex", fontSize: 27, fontWeight: 700, letterSpacing: 2 }}>
        MIKE ZHAO
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1048, gap: 28 }}>
        <div
          style={{
            display: "flex",
            fontSize: 77,
            fontWeight: 700,
            letterSpacing: -3.7,
            lineHeight: 1.08,
          }}
        >
          Data · Engineering · Design
        </div>
        <div style={{ display: "flex", color: "#b8c4cf", fontSize: 31, lineHeight: 1.3 }}>
          Where analytical thinking meets creative execution.
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 17 }}>
        <div style={{ display: "flex", width: 52, height: 4, backgroundColor: "#c64a2c" }} />
        <div style={{ display: "flex", color: "#a9b8c5", fontSize: 21, fontWeight: 700, letterSpacing: 2 }}>
          MIKEZHAO.DEV
        </div>
      </div>
    </div>,
    size,
  );
}
