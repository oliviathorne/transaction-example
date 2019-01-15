import { shallow, mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';
import { mockState } from './mocks/mocks';

const mockStore = configureStore();
let store;
let wrapper;

beforeEach(() => {
  store = mockStore(mockState);
  wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

describe('App component', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
