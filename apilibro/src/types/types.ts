export type GutendexBook ={
  id: number;
  title: string;
  authors: { name: string; birth_year: number | null; death_year: number | null }[];
  summaries: string[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: { [mimeType: string]: string };
  download_count: number;
}

export type GutendexResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: GutendexBook[];
}