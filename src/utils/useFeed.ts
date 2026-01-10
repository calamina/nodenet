import { XMLParser } from "fast-xml-parser";
import feeds from "../data/youtube.json";
import type { Username } from "../model/username";

export const getfeed = async (username: Username) => {
  const proxy = "https://corsproxy.io/?url=";
  const url = "https://www.youtube.com/feeds/videos.xml?channel_id="
  const channels = feeds[username];
  const results: any = [];

  for (const channel of channels) {
    const parser = new XMLParser();

    try {
      const response = await fetch(proxy + url + channel.id);
      const result = await response.text();
      const chan = parser.parse(result);
      const entries = chan?.feed?.entry

      entries.forEach((item: any) => {
        item.published = new Date(item.published)
        item.id = item.id.replace("yt:video:", "")
      })

      results.push(...chan?.feed?.entry)
    }
    catch (error) { console.debug("error", error) }
  }

  const orderedResults = results
    ?.sort((a: any, b: any) => b.published.getTime() - a.published.getTime())
    ?.slice(0, 40)

  return orderedResults
};