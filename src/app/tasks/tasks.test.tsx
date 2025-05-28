import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Tasks from './tasks';
import 'element-internals-polyfill';

test('renders Tasks component', () => {
  const wrapper = render(<Tasks />);
  expect(wrapper).toBeTruthy();
});