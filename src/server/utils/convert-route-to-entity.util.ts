const mapping: Record<string, string> = {
  applications: 'application',
  companies: 'company',
  fundings: 'funding',
  programs: 'program',
  reviews: 'review',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
