import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * Branded Open Graph card, generated at build time so the site ships no
 * external image asset. Applies to every route unless a segment overrides it.
 */
export const alt = `${site.name} — global import & export, automotive parts, contract manufacturing`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#06172b",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 68,
              height: 68,
              borderRadius: 6,
              backgroundColor: "#dc6803",
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            GTS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#ffffff", fontSize: 30, fontWeight: 700 }}>Trade Solutions</div>
            <div style={{ color: "#b2c9e3", fontSize: 17, letterSpacing: 3, marginTop: 6 }}>
              TRADE · AUTOMOTIVE · ENGINEERING
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 96, height: 5, backgroundColor: "#dc6803" }} />
          <div
            style={{
              color: "#ffffff",
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.15,
              marginTop: 28,
              maxWidth: 940,
            }}
          >
            Global Import Export, Automotive Parts & Contract Manufacturing
          </div>
          <div style={{ color: "#b2c9e3", fontSize: 25, marginTop: 24, maxWidth: 900 }}>
            Vehicle trade · Component sourcing · Fabrication · India market entry
          </div>
        </div>
      </div>
    ),
    size,
  );
}
