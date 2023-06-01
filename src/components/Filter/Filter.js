import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/Selectors';
import { setFilter } from 'redux/FilterSlice';
import { Label } from 'components/ContactForm/ContactForm.styled';

export const Filter = () => {
  const dispatch = useDispatch();
  const filetrData = useSelector(getFilter);

  return (
    <Label>
      Find contact by name
      <input
        type="text"
        value={filetrData}
        onChange={evt => dispatch(setFilter(evt.currentTarget.value.trim()))}
      />
    </Label>
  );
};
