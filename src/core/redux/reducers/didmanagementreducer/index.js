import {
  SET_DID_ITEMS,
  SET_EDIT_DID_ITEM_ID,
  SET_WAS_DID_ITEM_ADDED,
  SET_BLOCK_CRITICAL_LAYOUT_PARTS,
} from '../../types';

const initialState = {
  did_items: [],
  edit_did_item_id: 0,
  was_did_item_added: false,
  block_critical_layout_parts: false,
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
    case SET_WAS_DID_ITEM_ADDED:
      return {
        ...state,
        was_did_item_added: action.payload,
      };
    case SET_BLOCK_CRITICAL_LAYOUT_PARTS:
      return {
        ...state,
        block_critical_layout_parts: action.payload,
      };
    default:
      return state;
  }
};
