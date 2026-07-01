const DEFAULT_BYTES = 200_000_000;
const UNITS = {
  "": 1,
  b: 1,
  k: 1_000,
  kb: 1_000,
  m: 1_000_000,
  mb: 1_000_000,
  g: 1_000_000_000,
  gb: 1_000_000_000,
};

function parseBytes(pathname) {
  const path = pathname.replace(/^\/+/, "").replace(/\/+$/, "");

  if (!path) {
    return DEFAULT_BYTES;
  }

  const match = path.match(/^(\d+)(b|k|kb|m|mb|g|gb)?$/i);
  if (!match) {
    return null;
  }

  const value = Number.parseInt(match[1], 10);
  const unit = (match[2] || "").toLowerCase();

  return Math.floor(value * UNITS[unit]);
}

function speedOrigin(requestUrl) {
  return requestUrl.protocol === "https:"
    ? "https://speed.cloudflare.com"
    : "http://speed.cloudflare.com";
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const origin = speedOrigin(url);

    if (url.pathname.replace(/^\/+|\/+$/g, "") === "locations") {
      return fetch(new Request(`${origin}/locations`, request));
    }

    const bytes = parseBytes(url.pathname);
    if (bytes === null) {
      return new Response("Invalid path format. Use /1024kb, /200mb, /1gb, or /locations.", {
        status: 400,
        headers: {
          "content-type": "text/plain; charset=utf-8",
        },
      });
    }

    return fetch(new Request(`${origin}/__down?bytes=${bytes}`, request));
  },
};
