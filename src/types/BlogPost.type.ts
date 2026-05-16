export interface BlogPost {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  isFeatured: boolean;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  tags: string[];
  views: number;
  authorId: string;
  createdAt: string; // Note: JSON dates come across the network as strings!
  updatedAt: string;
}
