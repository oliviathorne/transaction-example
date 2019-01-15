import { mount } from 'enzyme';
import React from 'react';
import AccountSummary, { PieChart } from './AccountSummary';
import configureStore from 'redux-mock-store';
import { mockState } from './../mocks/mocks';
import { Provider } from 'react-redux';

const mockStore = configureStore();
let store;
let wrapper;

beforeEach(() => {
  store = mockStore(mockState);
  wrapper = mount(
    <Provider store={store}>
      <AccountSummary />
    </Provider>
  );
});

describe('AccountSummary component', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a graph', () => {
    const graph = wrapper.find(PieChart);

    expect(graph.length).toBe(1);
    expect(graph.props().percentageLeft).toEqual(100);
  });
});
