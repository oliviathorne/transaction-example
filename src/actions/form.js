// @flow
export const REGISTER_FIELD = 'REGISTER_FIELD';
export const UPDATE_FIELD_VALUE = 'UPDATE_FIELD_VALUE';
export const SAVE_TRANSACTION = 'SAVE_TRANSACTION';

type RegisterField = {
  type: typeof REGISTER_FIELD,
  data: { name: string, initialValue: string }
};

type UpdateFieldValue = {
  type: typeof UPDATE_FIELD_VALUE,
  data: { name: string, value: string }
};

type SaveTransaction = {
  type: typeof SAVE_TRANSACTION
};

export function registerField(name: string, initialValue: string): RegisterField {
  return {
    type: REGISTER_FIELD,
    data: { name, initialValue }
  };
}

export function updateFieldValue(name: string, value: string): UpdateFieldValue {
  return {
    type: UPDATE_FIELD_VALUE,
    data: { name, value }
  };
}

export function saveTransaction(): SaveTransaction {
  return {
    type: SAVE_TRANSACTION
  };
}
