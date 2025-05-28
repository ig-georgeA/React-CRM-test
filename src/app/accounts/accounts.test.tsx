import { expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Accounts from './accounts';
import 'element-internals-polyfill';

// Mock API response
const mockResponse = {
  json: () => new Promise((resolve) => resolve({}))
};
global.fetch = vi.fn().mockResolvedValue(mockResponse);

test('renders Accounts component', () => {
  const wrapper = render(<Accounts />, { wrapper: MemoryRouter });
  expect(wrapper).toBeTruthy();
});