import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Reports from './reports';
import 'element-internals-polyfill';

test('renders Reports component', () => {
  const wrapper = render(<Reports />);
  expect(wrapper).toBeTruthy();
});