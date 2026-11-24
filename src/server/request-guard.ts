import { definePlugin } from "nitro"

/** `%2D` for `-`, `%41` for `A`…: characters a URL never needs to encode */
const NEEDLESSLY_ENCODED = /%(2D|2E|5F|7E|3[0-9]|4[1-9A-F]|5[0-9A]|6[1-9A-F]|7[0-9A])/i

/**
 * Whether the path could name a page: valid percent-encoding, no control characters, no segment padded with spaces and
 * nothing encoded without need. `/chi%2Dsiamo` and `/chi-siamo%20` are not other addresses of `/chi-siamo`.
 */
function wellFormed(pathname: string) {
  if (NEEDLESSLY_ENCODED.test(pathname)) return false
  try {
    const decoded = decodeURI(pathname)
    // biome-ignore lint/suspicious/noControlCharactersInRegex: control characters are exactly what is refused
    return !/[\u0000-\u001f]/.test(decoded) && decoded.split("/").every((segment) => segment === segment.trim())
  } catch {
    return false
  }
}

/**
 * Runs before the site's code, on every request.
 *
 * - A path that is not well formed gets the 404 page. The server library otherwise fails while decoding an invalid one
 *   (`/%E0%A4%A`) and never answers the request.
 * - A page is served to whoever asks for it, whatever `Accept` says: link previews and scripts often ask for
 *   `application/json` or nothing in particular, and the router would refuse them with a 406.
 */
export default definePlugin((nitroApp) => {
  const handle = nitroApp.fetch
  nitroApp.fetch = (request) => {
    const url = new URL(request.url)
    if (!wellFormed(url.pathname)) return handle(new Request(new URL("/_not-found", url), request))
    const accept = request.headers.get("accept")
    if (
      request.method === "GET" &&
      accept &&
      !/\*\/\*|text\/html/.test(accept) &&
      !url.pathname.startsWith("/_serverFn/")
    )
      request.headers.set("accept", `text/html, ${accept}`)
    return handle(request)
  }
})
