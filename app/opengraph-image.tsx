import { ImageResponse } from "next/og";
export const alt = "Mike Zhao — Project Delivery · Analytics · Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#f5f2ea",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "80px",
        justifyContent: "space-between",
        color: "#1b201d",
      }}
    >
      <div style={{ fontSize: 30 }}>Mike Zhao</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 64, letterSpacing: -3 }}>
          Understanding systems.
        </div>
        <div style={{ fontSize: 64, letterSpacing: -3, color: "#b83e25" }}>
          Building better ways to work.
        </div>
      </div>
      <div style={{ fontSize: 24, color: "#b83e25" }}>
        Project Delivery · Analytics · Software
      </div>
    </div>,
    size,
  );
}
