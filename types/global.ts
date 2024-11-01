export type DateRange = { from: Date; to: Date };

export type RawTableDefinition = {
  name: string;
  columns: {
    key: string;
    type: string;
    index: number;
    name: string;
  }[];
};
