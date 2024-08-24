import '@nivo/circle-packing';
import { vi } from 'vitest';
vi.mock('@nivo/circle-packing', () => ({
  ResponsiveCirclePacking: () => null,
}));
