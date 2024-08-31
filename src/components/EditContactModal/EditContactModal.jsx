import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateContact, fetchContacts } from '../../redux/contactsOps';
import styles from './EditContactModal.module.css';

const EditContactModal = ({ contact, onClose }) => {
  const [name, setName] = useState(contact ? contact.name : '');
  const [phone, setPhone] = useState(contact ? contact.phone : '');
  const dispatch = useDispatch();

  useEffect(() => {
    if (contact) {
      setName(contact.name || '');
      setPhone(contact.phone || '');
    }
  }, [contact]);

  const handleSave = async () => {
    await dispatch(updateContact({ id: contact.id, name, phone }));
    await dispatch(fetchContacts());
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Edit Contact</h2>
        <label className={styles.label}>
          Name:
          <input
            className={styles.input}
            type="text"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Phone:
          <input
            className={styles.input}
            type="tel"
            value={phone || ''}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <div className={styles.buttons}>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContactModal;
