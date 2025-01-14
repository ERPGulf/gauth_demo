export interface BlockData {
  header: string;
  short_description: string;
  long_description: string;
  block_order: number;
  disable: number;
  hide: number;
  next_page: number;
  last_page: number;
  item_code: string;
}
export interface Page {
  page_number: number | null;
  data: BlockData[];
}
export interface PortalSection {
  Section_number: string;
  portal_area: string;
  heading: string;
  short_description: string;
  pages: Page[];
  created_by: string;
  created_at: string;
  disable: number;
  last_updated_by: string;
  last_updated_at: string;
}
