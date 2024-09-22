import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

interface FavoriteCharacters {
  name: string;
  firstTimeSeen: Date;
  favoriteThing: string;
}

const NewCharacterInCollection = () => {
  const { register, handleSubmit } = useForm();

  const handleInputField = (name: string) => {
    return { ...register(name) };
  };

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...handleInputField('name')} />
      <TextField />
      <TextField />
      <TextField />
      <Button title="on save" />
    </form>
  );
};

export default NewCharacterInCollection;
