import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './Operations';

const hendlePending = state => {
  state.isLoading = true;
};

const hendleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const hendleFetchContactsFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items = action.payload;
};

const hendleAddContactFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items.unshift(action.payload);
};

const hendleDeleteContactFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items = state.items.filter(item => item.id !== action.payload.id);
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, hendlePending)
      .addCase(fetchContacts.fulfilled, hendleFetchContactsFulfilled)
      .addCase(fetchContacts.rejected, hendleRejected)
      .addCase(addContact.pending, hendlePending)
      .addCase(addContact.fulfilled, hendleAddContactFulfilled)
      .addCase(addContact.rejected, hendleRejected)
      .addCase(deleteContact.pending, hendlePending)
      .addCase(deleteContact.fulfilled, hendleDeleteContactFulfilled)
      .addCase(deleteContact.rejected, hendleRejected),
  // {
  //   [fetchContacts.pending]: hendlePending,
  //   [fetchContacts.fulfilled]: hendleFetchContactsFulfilled,
  //   [fetchContacts.rejected]: hendleRejected,

  //   [addContact.pending]: hendlePending,
  //   [addContact.fulfilled]: hendleAddContactFulfilled,
  //   [addContact.rejected]: hendleRejected,

  //   [deleteContact.pending]: hendlePending,
  //   [deleteContact.fulfilled]: hendleDeleteContactFulfilled,
  //   [deleteContact.rejected]: hendleRejected,
  // },
});
