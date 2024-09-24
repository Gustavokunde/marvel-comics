import { AccountCircle } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { paths } from '../../routes';

const ProfileIcon = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['profile']);
  const location = useLocation();

  const isOnProfilePage = useMemo(
    () => location.pathname === paths.PROFILE,
    [location.pathname]
  );

  const onProfileClick = () => {
    navigate(paths.PROFILE);
  };

  return !isOnProfilePage ? (
    <Tooltip title={t('profileIconTooltip')}>
      <IconButton onClick={onProfileClick}>
        <AccountCircle className="cursor-pointer" role="button" />
      </IconButton>
    </Tooltip>
  ) : null;
};

export default ProfileIcon;
