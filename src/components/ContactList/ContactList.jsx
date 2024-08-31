// src/components/ContactList/ContactList.jsx
import { useSelector, useDispatch } from 'react-redux';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';
import { selectFilteredContacts } from '../../redux/contactsSlice';
import { deleteContact } from '../../redux/contactsOps';
import { setSelectedContact, openModal } from '../../redux/contactsSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleEditContact = (contact) => {
    dispatch(setSelectedContact(contact));
    dispatch(openModal());
  };

  return (
    <ul className={styles.list}>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <Contact
            contact={contact}
            onDelete={() => handleDeleteContact(contact.id)}
            onEdit={() => handleEditContact(contact)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
