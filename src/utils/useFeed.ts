import { XMLParser } from "fast-xml-parser";
import feeds from "../data/youtube.json";
import type { Username } from "../model/username";

export const getfeed = async (username: Username) => {
  const proxy = import.meta.env.DEV ? "https://corsproxy.io/?url=" : ""
  const url = "http://www.youtube.com/feeds/videos.xml?channel_id="
  const channels = feeds[username];
  const results: any = [];

  for (const channel of channels) {
    const parser = new XMLParser();

    try {
      const response = await fetch(proxy + url + channel.id);
      const result = await response.text();
      const chan = parser.parse(result);
      const entries = chan?.feed?.entry

      if (!entries) return

      for (const entry of entries) {
        entry.published = new Date(entry.published)
        entry.id = entry.id.replace("yt:video:", "")
      }
      results.push(...chan?.feed?.entry)
    }
    catch (error) { console.debug("error", error) }
  }

  const orderedResults = results
    ?.sort((a: any, b: any) => b.published.getTime() - a.published.getTime())
    ?.slice(0, 40)

  return orderedResults
};