import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useProfile } from '../../contexts/UserContext';
import { User } from '../../interfaces/user';
import { paths } from '../../routes';

export const CreateProfile = () => {
  const { user, createOrUpdateProfile } = useProfile();
  const navigate = useNavigate();
  const { t } = useTranslation(['profile']);

  const schema = z.object({
    name: z.string().min(1, t('fields.name.requiredMessage')),
    document: z
      .string()
      .min(11, t('fields.document.minRequiredMessage'))
      .max(11, t('fields.document.maxRequiredMessage')),
    email: z
      .string()
      .email(t('fields.email.invalidMessage'))
      .min(1, t('fields.email.requiredMessage')),
    phone: z.string().min(10, t('fields.document.minRequiredMessage')),
    address: z.string().optional(),
  });

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
    createOrUpdateProfile({ ...user, ...data }).then(() =>
      navigate(paths.FIND_CHARACTERS)
    );
  };

  const handleInputFields = (name: keyof User) => {
    return {
      ...register(name),
      error: !!errors[name],
      helperText: (errors[name]?.message || '') as string,
      InputLabelProps: { shrink: true },
      label: t('fields.' + name + '.label'),
    };
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="mb-4">{t('title')}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-1/2 flex flex-col gap-4"
      >
        <TextField {...handleInputFields('name')} />
        <TextField {...handleInputFields('document')} />
        <TextField {...handleInputFields('email')} />
        <TextField {...handleInputFields('phone')} />
        <TextField {...handleInputFields('address')} />
        <Button type="submit" variant="contained">
          {t('submitButton')}
        </Button>
      </form>
    </div>
  );
};
