import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    reset();
  };

  const handleInputFields = (name: string) => {
    return {
      ...register(name),
      error: !!errors[name],
      helperText: (errors[name]?.message || '') as string,
    };
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}
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
    </Box>
  );
};
