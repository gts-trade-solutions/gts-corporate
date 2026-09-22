import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

/**
 * Branded Open Graph card using the supplied local logo.
 * Applies to every route unless a segment overrides it.
 */
export const alt = `${site.name} — global import & export, automotive parts, contract manufacturing`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/images/gts-logo.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

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
          backgroundColor: "#001a41",
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
              padding: "12px 18px",
              borderRadius: 4,
              backgroundColor: "#ffffff",
            }}
          >
            {/* next/og renders plain image elements from the embedded local asset. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={277} height={86} alt="GTS Integrated Solutions" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#ffffff", fontSize: 30, fontWeight: 700 }}>Trade Solutions</div>
            <div style={{ color: "#b5c8e2", fontSize: 17, letterSpacing: 3, marginTop: 6 }}>
              TRADE · AUTOMOTIVE · ENGINEERING
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 96, height: 5, backgroundColor: "#e10000" }} />
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
          <div style={{ color: "#b5c8e2", fontSize: 25, marginTop: 24, maxWidth: 900 }}>
            Vehicle trade · Component sourcing · Fabrication · India market entry
          </div>
        </div>
      </div>
    ),
    size,
  );
}
