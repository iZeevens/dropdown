interface Category {
  id: string;
  name: string;
  selected: boolean;
  expanded?: boolean;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  selected: boolean;
  color: string;
}

export type { Category };
