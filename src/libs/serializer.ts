import fs from "fs";
import path from "path";

export async function getFromDataset(pathname: string) {
  // fixed vercel host
  if (pathname.startsWith("/")) {
    const out = await fetch(pathname);
    const text = await out.text();

    return text.split(/\r?\n/);
  }

  const out = fs.readFileSync(path.join(process.cwd(), pathname), "utf-8");
  return out.split(/\r?\n/);
}

export function getDataStack(input: string[]) {
  input.shift(); // to remove 1st element for column name
  input.pop(); // -- to remove last element awareness to undefined

  return input.map((item) => {
    return item.split(/,/);
  });
}
