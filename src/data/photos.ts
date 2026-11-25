/**
 * Credited photographs: the vehicle-type pictures on the vehicle-segment pages
 * and the pictures across the top of category cards. Most come from Wikimedia
 * Commons under Creative Commons BY / BY-SA, which require the photographer
 * and the licence to be shown with the picture, so every one carries a credit
 * that is printed wherever it appears.
 *
 * The site's other photographs (Unsplash and client-supplied, no attribution
 * required) are slots in media.ts instead.
 */

export type PhotoCredit = {
  name: string;
  licence: string;
  licenceUrl: string;
  /** The file's page on Wikimedia Commons. */
  url: string;
};

export type Photo = {
  src: string;
  alt: string;
  credit?: PhotoCredit;
  /** Catalogue cut-outs on a white ground are shown whole rather than cropped. */
  fit?: "cover" | "contain";
  /** CSS `object-position` for the crop, when the subject is not centred. */
  position?: string;
};

/**
 * A credit for a Wikimedia Commons file. `licence` is the short name Commons
 * gives it: "CC BY-SA 4.0", "CC BY 2.0", a ported licence such as
 * "CC BY-SA 2.0 de", "CC0" or "Public domain".
 */
export const cc = (name: string, licence: string, file: string): PhotoCredit => {
  const url = `https://commons.wikimedia.org/wiki/File:${file}`;
  if (licence === "CC0") {
    return { name, licence, licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/", url };
  }
  if (/^public domain$/i.test(licence)) {
    return { name, licence: "Public domain", licenceUrl: "https://creativecommons.org/publicdomain/mark/1.0/", url };
  }
  const version = licence.match(/\d\.\d/)?.[0] ?? "4.0";
  const kind = licence.includes("BY-SA") ? "by-sa" : "by";
  const port = licence.match(/\d\.\d ([a-z]{2})$/)?.[1];
  return {
    name,
    licence,
    licenceUrl: `https://creativecommons.org/licenses/${kind}/${version}/${port ? `${port}/` : ""}`,
    url,
  };
};
