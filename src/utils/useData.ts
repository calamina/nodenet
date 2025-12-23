import links from "../data/links.json"
import rss from "../data/rss.json"
import type { LinkCategory } from "../model/link-categ"

export const useData = (): { links: LinkCategory[], rss: any } => {
  return {
    links,
    rss
  }
}