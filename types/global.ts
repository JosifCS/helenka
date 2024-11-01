export type DateRange = { from: Date; to: Date };

export type RawTableDefinition = {
  value: string;
  columns: {
    key: string;
    type: string;
    column: number;
    value: string;
  }[];
};
