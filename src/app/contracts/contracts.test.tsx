import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Contracts from './contracts';
import 'element-internals-polyfill';

test('renders Contracts component', () => {
  const wrapper = render(<Contracts />);
  expect(wrapper).toBeTruthy();
});