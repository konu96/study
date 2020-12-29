// ref: https://dev.to/angular/managing-key-value-constants-in-typescript-221g
export const colorIDs = ['green', 'red', 'blue'] as const;

type ColorID = typeof colorIDs[number]; // === 'green' | 'red' | 'blue'

export const colorLabels: Record<ColorID, string> = {
  blue: 'Blue',
  green: 'Green',
  red: 'Red',
} as const;