import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact, onEditContact }) => {
  return (
    <ul className={styles.list}>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <Contact
            contact={contact}
            onDeleteContact={() => onDeleteContact(contact.id)}
            onEditContact={() => onEditContact(contact)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
