import styles from './Contact.module.css';

const Contact = ({ contact, onDeleteContact, onEditContact }) => {
  return (
    <div className={styles.contact}>
      <div className={styles.contactBox}>
        <div className={styles.info}>
          <span className={styles.name}>{contact.name}</span>
          <span className={styles.number}>{contact.phone}</span>
        </div>
        <div className={styles.buttons}>
          <button className={styles.buttonEdit} onClick={onEditContact}>
            Edit
          </button>
          <button className={styles.buttonDelete} onClick={onDeleteContact}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
