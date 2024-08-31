// src/redux/contactsSlice.js
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact, updateContact } from './contactsOps';
import { selectNameFilter } from './filtersSlice';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedContact: null, // Состояние для выбранного контакта
    isModalOpen: false,    // Состояние для управления модальным окном
  },
  reducers: {
    setSelectedContact(state, action) {
      state.selectedContact = action.payload;
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.selectedContact = null; // Очистка выбранного контакта при закрытии модального окна
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.items.sort((a, b) => a.name.localeCompare(b.name));
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.items = state.items.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        );
      });
  },
});

// Экспортируйте действия для управления модальным окном и выбранным контактом
export const { setSelectedContact, openModal, closeModal } = contactsSlice.actions;

// Селектор для выбранного контакта
export const selectSelectedContact = (state) => state.contacts.selectedContact;
export const selectIsModalOpen = (state) => state.contacts.isModalOpen;

// Селектор для фильтрованных контактов
export const selectFilteredContacts = createSelector(
  (state) => state.contacts.items,
  selectNameFilter, // Используйте селектор из filtersSlice
  (contacts, filterName) => {
    return contacts.filter((contact) => {
      const contactName = contact.name ? contact.name.toLowerCase() : '';
      const filter = filterName.toLowerCase();
      return contactName.includes(filter);
    });
  }
);

export default contactsSlice.reducer;
