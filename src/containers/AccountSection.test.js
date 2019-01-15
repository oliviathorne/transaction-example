import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AccountSection from './AccountSection';
import { mockState } from './../mocks/mocks';

const mockStore = configureStore();
let store;
let wrapper;

beforeEach(() => {
  store = mockStore(mockState);
  wrapper = shallow(
    <Provider store={store}>
      <AccountSection />
    </Provider>
  );
});

describe('AccountSection component', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
