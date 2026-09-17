import { ImageResponse } from "next/og";
import { person } from "@/data/resume";

export const runtime = "edge";
export const alt = `${person.name} — ${person.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated share card. Kept to system fonts and flat color so it renders
 * without fetching any font binaries at the edge.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 1, background: "#2A2A2A" }} />
          <div
            style={{
              fontSize: 18,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#8A8A8A",
              fontFamily: "monospace",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.05,
              color: "#F5F5F5",
              letterSpacing: -2,
            }}
          >
            {person.name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 34,
              fontStyle: "italic",
              color: "#D4D4D4",
            }}
          >
            {person.titles.join("  ·  ")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #2A2A2A",
            paddingTop: 28,
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#8A8A8A",
            fontFamily: "monospace",
          }}
        >
          <div>2 IEEE Publications</div>
          <div>{person.location}</div>
        </div>
      </div>
    ),
    size
  );
}
