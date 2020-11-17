import {
  SET_DID_ITEMS,
  SET_EDIT_DID_ITEM_ID,
  SET_WAS_DID_ITEM_ADDED,
  SET_BLOCK_CRITICAL_LAYOUT_PARTS,
} from '../types';

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

// Setting has new did item being added
export const setWasDidItemAdded = (was_did_item_added) => {
  return {
    type: SET_WAS_DID_ITEM_ADDED,
    payload: was_did_item_added,
  };
};

// Setting block critical layout parts
export const setBlockCriticalLayoutParts = (block_critical_layout_parts) => {
  return {
    type: SET_BLOCK_CRITICAL_LAYOUT_PARTS,
    payload: block_critical_layout_parts,
  };
};
