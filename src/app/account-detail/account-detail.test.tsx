import { expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AccountDetail from './account-detail';
import 'element-internals-polyfill';

// Mock API response
const mockResponse = {
  json: () => new Promise((resolve) => resolve({}))
};
global.fetch = vi.fn().mockResolvedValue(mockResponse);

test('renders AccountDetail component', () => {
  const wrapper = render(<AccountDetail />, { wrapper: MemoryRouter });
  expect(wrapper).toBeTruthy();
});