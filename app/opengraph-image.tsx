import { ImageResponse } from "next/og";
export const alt = "Mike Zhao — Data · Analytics Engineering · Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#f7f7f4",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "80px",
        justifyContent: "space-between",
        color: "#181816",
      }}
    >
      <div style={{ fontSize: 30 }}>Mike Zhao</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 64, letterSpacing: -3 }}>
          Understanding systems.
        </div>
        <div style={{ fontSize: 64, letterSpacing: -3, color: "#315c49" }}>
          Building better ways to work.
        </div>
      </div>
      <div style={{ fontSize: 24, color: "#315c49" }}>
        Data · Analytics Engineering · Software
      </div>
    </div>,
    size,
  );
}
