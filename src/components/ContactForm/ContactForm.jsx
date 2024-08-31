import { useState } from 'react';
import styles from './ContactForm.module.css';

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && phone) {
      if (typeof onAddContact === 'function') {
        onAddContact({ name, phone });
        setName('');
        setPhone('');
      } else {
        console.error('onAddContact is not a function');
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Name
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        Phone
        <input
          className={styles.input}
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <button className={styles.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
