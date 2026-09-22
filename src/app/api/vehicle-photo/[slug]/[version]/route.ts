import { getVehicleModelPhoto } from "@/lib/vehicle-models-store";

/**
 * Serves a model photograph uploaded through the admin.
 *
 * The `version` segment is the photograph's update time. It makes every URL
 * unique to one revision, which is what lets the response be cached
 * indefinitely: replacing the picture changes the URL the pages link to, so
 * nothing has to be purged.
 */
export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string; version: string }> },
) {
  const { slug } = await params;
  const photo = await getVehicleModelPhoto(slug);

  if (!photo) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(photo.bytes), {
    headers: {
      "Content-Type": photo.mime_type,
      "Content-Length": String(photo.bytes.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
