import feeds from "../data/youtube.json";
import type { Username } from "../model/username";

export const getfeed = async (username: Username) => {
  const proxy = "https://corsproxy.io/?url=";
  const channels = feeds[username];
  const results = [];

  for (const channel of channels) {
    const parser = new (window as any).RSSParser();
    try {
      const feed = await parser.parseURL(proxy + channel.url);
      feed.items.forEach((item: any) => {
        item.pubDate = new Date(item.pubDate)
        item.id = item.id.replace("yt:video:", "")
      })

      results.push(...feed.items)
    }
    catch (error) { console.debug("error", error) }
  }

  const orderedResults = results
    ?.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
    ?.slice(0, 10)

  return orderedResults
};