import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import EditContactModal from './components/EditContactModal/EditContactModal';
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from './redux/contactsOps';
import { selectFilteredContacts } from './redux/contactsSlice';
import styles from './App.module.css';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [deletedContact, setDeletedContact] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (newContact) => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (id) => {
    const contactToDelete = contacts.find((contact) => contact.id === id);
    setDeletedContact(contactToDelete);
    dispatch(deleteContact(id));

    setIsTimerActive(true);

    setTimeout(() => {
      setIsTimerActive(false);
      setDeletedContact(null);
    }, 5000);
  };

  const handleUndoDelete = () => {
    if (deletedContact) {
      dispatch(addContact(deletedContact));
      setIsTimerActive(false);
      setDeletedContact(null);
    }
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleSaveContact = (updatedContact) => {
    dispatch(updateContact(updatedContact));
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />{' '}
      <SearchBox />
      <ContactList
        contacts={contacts}
        onDeleteContact={handleDeleteContact}
        onEditContact={handleEditContact}
      />
      {isTimerActive && (
        <div className={styles.undoContainer}>
          <button className={styles.undoButton} onClick={handleUndoDelete}>
            Cancel
            <div className={styles.undoButtonTimer}></div>
          </button>
        </div>
      )}
      {isModalOpen && (
        <EditContactModal
          contact={selectedContact}
          onSave={handleSaveContact}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
