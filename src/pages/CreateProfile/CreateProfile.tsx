import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useProfile } from '../../contexts/UserContext';
import { User } from '../../interfaces/user';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  cpf: z
    .string()
    .min(11, 'CPF deve conter 11 caracteres')
    .max(11, 'CPF deve conter 11 caracteres'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  phone: z.string().min(10, 'Telefone deve conter ao menos 10 dígitos'),
  address: z.string().optional(),
});

export const CreateProfile = () => {
  const { user, createProfile } = useProfile();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(schema),
    defaultValues: user || {},
  });

  useEffect(() => {
    if (user) reset(user);
  }, [user]);

  const onSubmit = (data: User) => {
    createProfile(data).jut;
  };

  const handleInputFields = (name: keyof User) => {
    return {
      ...register(name),
      error: !!errors[name],
      helperText: (errors[name]?.message || '') as string,
      InputLabelProps: { shrink: true },
    };
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="mb-4">
        Iremos criar um perfil para você. Por favor, insira os dados abaixo:{' '}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-1/2 flex flex-col gap-4"
      >
        <TextField label="Nome" {...handleInputFields('name')} />
        <TextField label="CPF" {...handleInputFields('cpf')} />
        <TextField label="Email" {...handleInputFields('email')} />
        <TextField label="Telefone" {...handleInputFields('phone')} />
        <TextField
          label="Endereço (Opcional)"
          {...handleInputFields('address')}
        />
        <Button type="submit" variant="contained">
          Cadastrar
        </Button>
      </form>
    </div>
  );
};
