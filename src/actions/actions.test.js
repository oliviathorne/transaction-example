import { REGISTER_FIELD, UPDATE_FIELD_VALUE, SAVE_TRANSACTION } from './form';
import { registerField, updateFieldValue, saveTransaction } from './form';

describe('Form actions', () => {
  it('creates an action to register field', () => {
    const mockRegisterAction = {
      type: REGISTER_FIELD,
      data: { name: 'Test', initialValue: '' }
    };

    expect(registerField('Test', '')).toEqual(mockRegisterAction);
  });

  it('creates an action to update a field', () => {
    const mockUpdateAction = {
      type: UPDATE_FIELD_VALUE,
      data: { name: 'Test', value: 'New value' }
    };

    expect(updateFieldValue('Test', 'New value')).toEqual(mockUpdateAction);
  });

  it('creates an action to save a transaction', () => {
    const mockSaveAction = {
      type: SAVE_TRANSACTION
    };

    expect(saveTransaction()).toEqual(mockSaveAction);
  });
});
