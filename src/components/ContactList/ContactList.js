import { useDispatch, useSelector } from 'react-redux';
import {
  getContacts,
  getError,
  getFilter,
  getIsLoading,
} from 'redux/selectors';
import { Span, Li, Button } from './ContactList.styled';
import { useEffect } from 'react';
import { deleteContact, fetchContacts } from 'redux/operations';

export const ContactList = () => {
  const dispatch = useDispatch();
  const items = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const contactFilter = useSelector(getFilter);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getVisibleList = () => {
    const normalizedFilter = contactFilter.toLowerCase();
    return items.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>{error}</p>}
      <ul>
        {getVisibleList().map(({ id, name, phone }) => {
          return (
            <Li key={id}>
              <Span>{name}: </Span>
              <Span>{phone}</Span>
              <Button type="button" onClick={() => dispatch(deleteContact(id))}>
                Delete
              </Button>
            </Li>
          );
        })}
      </ul>
    </>
  );
};
