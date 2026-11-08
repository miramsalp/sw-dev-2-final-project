/**
 * Card image per sport type. Add a file to /public/images/sports and a line here;
 * anything not listed falls back to the default image.
 */
const SPORT_IMAGES: Record<string, string> = {
  basketball: "/images/sports/basketball.jpg",
};

const DEFAULT_IMAGE = "/images/sports/basketball.jpg";

export function facilityImage(sportType?: string | null) {
  return SPORT_IMAGES[sportType?.trim().toLowerCase() ?? ""] ?? DEFAULT_IMAGE;
}
