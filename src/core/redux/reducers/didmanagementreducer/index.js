import { SET_DID_ITEMS, SET_EDIT_DID_ITEM_ID } from '../../types';

const initialState = {
  did_items: [],
  edit_did_item_id: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DID_ITEMS:
      return {
        ...state,
        did_items: action.payload,
      };
    case SET_EDIT_DID_ITEM_ID:
      return {
        ...state,
        edit_did_item_id: action.payload,
      };
    default:
      return state;
  }
};
