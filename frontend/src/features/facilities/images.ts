/**
 * Card image per sport type (matched case-insensitively). To add a sport, put a 640×480 jpg in
 * /public/images/sports and add a line here. Anything not listed uses the sport-court image.
 */
const SPORT_IMAGES: Record<string, string> = {
  badminton: "/images/sports/badminton.jpg",
  basketball: "/images/sports/basketball.jpg",
  football: "/images/sports/football.jpg",
  soccer: "/images/sports/football.jpg",
  futsal: "/images/sports/football.jpg",
  tennis: "/images/sports/tennis.jpg",
};

const DEFAULT_IMAGE = "/images/sports/sport-court.jpg";

export function facilityImage(sportType?: string | null) {
  return SPORT_IMAGES[sportType?.trim().toLowerCase() ?? ""] ?? DEFAULT_IMAGE;
}
