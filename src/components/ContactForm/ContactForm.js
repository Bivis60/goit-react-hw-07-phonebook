import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'Redux/Selectors';
import { Form, Label, Button } from './ContactForm.styled';
import { addContact } from 'Redux/Operations';

export const ContactForm = () => {
  const [contact, setContact] = useState({
    name: '',
    number: '',
  });

  const dispatch = useDispatch();
  const contactList = useSelector(getContacts);
  const name = contact.name;
  const number = contact.number;

  const handleChange = evt => {
    setContact(prev => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const enteredData = event.currentTarget.elements;

    const contact = {
      name: enteredData.name.value,
      phone: enteredData.number.value,
    };
    const isContactExist = contactList.find(
      ({ name, phone }) =>
        name.toLowerCase() === contact.name.toLowerCase() ||
        phone.trim() === contact.phone.trim()
    );
    if (isContactExist) {
      return alert(`${name} is already in contacts`);
    } else {
      dispatch(addContact(contact));
    }
    resetForm();
  };

  const resetForm = () => {
    setContact({ name: '', number: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleChange}
          required
        />
      </Label>

      <Label>
        Phone
        <input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleChange}
          required
        />
      </Label>

      <Button type="submit">Add contact</Button>
    </Form>
  );
};
