export default function formatBaseUrl(title: string): string {
  return title.trim().toLowerCase().split(' ').join('_');
}
