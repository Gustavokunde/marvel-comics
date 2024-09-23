import { AccountCircle } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../routes';

const ProfileIcon = () => {
  const navigate = useNavigate();

  const onProfileClick = () => {
    navigate(paths.PROFILE);
  };
  return (
    <Tooltip title="Editar perfil">
      <IconButton onClick={onProfileClick}>
        <AccountCircle className="cursor-pointer" role="button" />
      </IconButton>
    </Tooltip>
  );
};

export default ProfileIcon;
