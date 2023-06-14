export interface SearchData {
  data: Item[];
  pages: number;
  count: number;
}

export interface Item {
  uuid: string;
  url: string;
  api_url: string;
  category: Category;
  parent_uuid?: null;
  display_title: string;
  primary_lookup_id_type: string;
  primary_lookup_id_value: string;
  external_resources: {
    url: string;
  };
  title: string;
  brief: string;
  cover_image_url: string;
  rating: number;
  rating_count: number;
}

export type Category = "book" | "movie" | "tv" | "music" | "game" | "podcast" | "performance";
