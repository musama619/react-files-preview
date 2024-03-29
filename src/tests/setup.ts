import '@testing-library/jest-dom'
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

expect.extend(matchers);
afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
});

global.fetch = vi.fn();
global.URL.createObjectURL = vi.fn();
global.URL.revokeObjectURL = vi.fn();