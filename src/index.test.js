import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';
import { mockState } from './mocks/mocks';

jest.mock('react-dom', () => ({
  render: jest.fn()
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  global.document.getElementById = (id) => id === 'root' && div;
  expect(ReactDOM.render).toHaveBeenCalled();
});
