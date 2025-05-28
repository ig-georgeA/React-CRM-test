import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Contacts from './contacts';
import 'element-internals-polyfill';

test('renders Contacts component', () => {
  const wrapper = render(<Contacts />);
  expect(wrapper).toBeTruthy();
});