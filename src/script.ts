import { Database } from "bun:sqlite";
import { ExtractHistoryTimeline, FetchWikipedia } from "./lib/wikipedia";

const timelineConfigs = [
  { title: "Timeline_of_Afghan_history", country: "AF" },
  { title: "Timeline_of_Albanian_history", country: "AL" },
  { title: "Timeline_of_Algerian_history", country: "DZ" },
  { title: "Timeline_of_Argentine_history", country: "AR" },
  { title: "Timeline_of_Armenian_history", country: "AM" },
  { title: "Timeline_of_Australian_history", country: "AU" }, // Modern history
  { title: "Timeline_of_Austrian_history", country: "AT" },
  { title: "Timeline_of_Bangladeshi_history", country: "BD" },
  { title: "Timeline_of_Barbadian_history", country: "BB" },
  { title: "Timeline_of_Belgian_history", country: "BE" },
  { title: "Timeline_of_Bhutanese_history", country: "BT" },
  { title: "Timeline_of_Brazilian_history", country: "BR" },
  { title: "Timeline_of_British_history", country: "GB" },
  { title: "Timeline_of_Canadian_history", country: "CA" },
  { title: "Timeline_of_Chinese_history", country: "CN" },
  { title: "Timeline_of_Cuban_history", country: "CU" },
  { title: "Timeline_of_Finnish_history", country: "FI" },
  { title: "Timeline_of_French_history", country: "FR" },
  { title: "Timeline_of_German_history", country: "DE" },
  { title: "Timeline_of_Greek_history", country: "GR" },
  { title: "Timeline_of_Indian_history", country: "IN" },
  { title: "Timeline_of_Italian_history", country: "IT" },
  { title: "Timeline_of_Japanese_history", country: "JP" },
  { title: "Timeline_of_Korean_history", country: "KR" },
  { title: "Timeline_of_Mexican_history", country: "MX" },
  { title: "Timeline_of_Pakistani_history", country: "PK" },
  { title: "Timeline_of_Polish_history", country: "PL" },
  { title: "Timeline_of_Portuguese_history", country: "PT" },
  { title: "Timeline_of_Russian_history", country: "RU" },
  { title: "Timeline_of_Spanish_history", country: "ES" },
  { title: "Timeline_of_Swedish_history", country: "SE" },
  { title: "Timeline_of_United_States_history", country: "US" },
  { title: "Timeline_of_Israeli_history", country: "IL" },
  { title: "Timeline_of_Turkish_history", country: "TR" },
  { title: "Timeline_of_South_African_history", country: "ZA" },
  { title: "Timeline_of_Singaporean_history", country: "SG" },
  { title: "Timeline_of_Ukrainian_history", country: "UA" },
  { title: "Timeline_of_Vietnamese_history", country: "VN" },
  { title: "Timeline_of_Egyptian_history", country: "EG" },
  { title: "Timeline_of_Malaysian_history", country: "MY" },
  { title: "Timeline_of_Nigerian_history", country: "NG" },
  { title: "Timeline_of_New_Zealand_history", country: "NZ" },
];

async function execute(config: { title: string; country: string }) {
  const db = new Database("./database.db");

  const evts = await FetchWikipedia(
    config.title,
    "https://en.wikipedia.org",
  ).catch((err) => err);
  if (Error.isError(evts) || !evts) {
    console.error(`Failed to fetch data for ${config.title}:`, evts);
    return;
  }

  const timeline = ExtractHistoryTimeline(evts);

  db.run(`
    CREATE TABLE IF NOT EXISTS timeline (
      country TEXT,
      year INTEGER,
      event TEXT,
      UNIQUE(country, year, event)
    )
  `);

  const [p] = Object.entries(timeline).map(([year, events]) => {
    return events.map(async (event) => {
      db.run(
        "INSERT INTO timeline (country, year, event) VALUES (?, ?, ?) ON CONFLICT DO NOTHING",
        [config.country, year, event],
      );
    });
  });

  await Promise.all(p.flat());

  console.log("Record inserted.");
  db.close();
}

function main() {
  const p = timelineConfigs.map((config) => {
    execute(config).catch(console.error);
  });
  return Promise.all(p);
}

main().catch(console.error);
