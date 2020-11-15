import { SET_DID_ITEMS, SET_EDIT_DID_ITEM_ID } from '../types';

// Setting list of DID ITEMS
export const setDidItems = (did_items) => {
  return {
    type: SET_DID_ITEMS,
    payload: did_items,
  };
};

// Setting edit did item
export const setEditDidItemId = (edit_did_item_id) => {
  return {
    type: SET_EDIT_DID_ITEM_ID,
    payload: edit_did_item_id,
  };
};
