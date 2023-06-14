import { useMemo } from "react";
import { Grid } from "@raycast/api";
import { Category, Item } from "./types";
import useSearch from "./hooks/useSearch";

interface SectionProps {
  items: Item[];
  category: Category;
  aspectRatio?: "1" | "2/3" | "3/2" | "3/4" | "4/3" | "9/16" | "16/9";
}

const titleParser = (title: string) => (title === "tv" ? "TV" : `${title.charAt(0).toUpperCase() + title.slice(1)}`);

const Section: React.FC<SectionProps> = ({ items, category, aspectRatio }) => {
  return (
    <Grid.Section title={titleParser(category)} fit={Grid.Fit.Fill} aspectRatio={aspectRatio ?? "2/3"}>
      {items.map((item) => (
        <Grid.Item
          key={item.uuid}
          content={{ value: { source: item.cover_image_url }, tooltip: item.brief }}
          title={item.display_title}
          subtitle={item.brief}
        />
      ))}
    </Grid.Section>
  );
};

export default function Command() {
  const { isLoading, data: searchData, setSearchText } = useSearch();

  const categorizedItems = useMemo(() => {
    const itemsByCategory: Record<Category, Item[]> = {
      book: [],
      movie: [],
      tv: [],
      music: [],
      game: [],
      podcast: [],
      performance: [],
    };

    searchData?.data.forEach((item: Item) => {
      itemsByCategory[item.category].push(item);
    });

    return itemsByCategory;
  }, [searchData]);

  const categories: Category[] = ["book", "movie", "tv", "music", "game", "podcast", "performance"];
  const aspectRatios: Partial<Record<Category, SectionProps["aspectRatio"]>> = {
    music: "1",
    podcast: "1",
  };

  return (
    <Grid
      throttle
      columns={7}
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarAccessory={
        <Grid.Dropdown tooltip="Dropdown With Items">
          {categories.map((category) => (
            <Grid.Dropdown.Item key={category} title={titleParser(category)} value={category} />
          ))}
        </Grid.Dropdown>
      }
    >
      {categories.map((category) => (
        <Section
          key={category}
          items={categorizedItems[category]}
          category={category}
          aspectRatio={aspectRatios[category]}
        />
      ))}
    </Grid>
  );
}
