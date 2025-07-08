import { WikipediaActionData } from "@/entities/wikipedia";
import { load, type CheerioAPI } from "cheerio";

export function WikipediaUrl(title: string, baseURL = "") {
  return `${baseURL}/w/api.php?action=parse&page=${title}&format=json`;
}

export async function FetchWikipedia(
  title: string,
  baseURL = "",
): Promise<CheerioAPI> {
  const response = await fetch(WikipediaUrl(title, baseURL));

  const obj = await response.json();
  const data = WikipediaActionData.parse(obj);
  const html = data.parse.text["*"];

  return load(html);
}

export function ExtractHistoryTimeline(html: CheerioAPI) {
  const timeline: Record<string, string[]> = {};

  html("table.wikitable tbody tr").each((_, row) => {
    const cells = html(row).find("td");
    if (cells.length >= 3) {
      const year = cells.eq(0).text().trim();
      const event = cells.eq(2).text().trim();

      if (year && event) {
        if (!timeline[year]) {
          timeline[year] = [];
        }
        timeline[year].push(event);
      }
    }
  });

  return timeline;
}
