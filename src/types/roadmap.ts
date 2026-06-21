export type RoadmapItem = {
  id: string;
  postId: string;
  order: number;
};

export type RoadmapColumn = {
  id: string;
  name: string;
  color: string;
  order: number;
  items: RoadmapItem[];
};

export type Roadmap = {
  id: string;
  name: string;
  description: string | null;
  columns: RoadmapColumn[];
};
