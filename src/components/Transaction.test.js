import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mockState } from './../mocks/mocks';
import Transaction, { Paragraph } from './Transaction';

const mockStore = configureStore();
let store;
let wrapper;
const props = {
  name: {
    value: 'Test name'
  },
  email: {
    value: 'test@email.com'
  },
  amount: {
    value: '3000'
  }
};

beforeEach(() => {
  store = mockStore(mockState);
  wrapper = mount(
    <Provider store={store}>
      <Transaction {...props} />
    </Provider>
  );
});

describe('Transaction component', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders three paragraphs with the name, email and amount', () => {
    const paragraphs = wrapper.find(Paragraph);
    expect(paragraphs.length).toBe(3);

    paragraphs.forEach((paragraph, index) => {
      switch (index) {
        case 0:
          expect(paragraph.props().children).toEqual('Test name');
          break;
        case 1:
          expect(paragraph.props().children).toEqual('test@email.com');
          break;
        case 2:
          expect(paragraph.props().children).toEqual(['£', '3,000.00']);
          break;
        default:
          return;
      }
    });
  });
});
