import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Calendar from './calendar';
import 'element-internals-polyfill';

test('renders Calendar component', () => {
  const wrapper = render(<Calendar />);
  expect(wrapper).toBeTruthy();
});