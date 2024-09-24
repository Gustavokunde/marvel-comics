import LanguageIcon from '@mui/icons-material/Language';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation(['profile']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const changeLanguage = (language: 'pt' | 'en') => {
    i18n.changeLanguage(language);
    closeLanguageMenu();
  };

  const openLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeLanguageMenu = () => {
    setAnchorEl(null);
  };
  return (
    <section className="flex justify-end w-full p-1">
      <Tooltip title={t('languageIconTooltip')}>
        <IconButton
          onClick={openLanguageMenu}
          className="flex items-center pr-1"
        >
          <LanguageIcon role="button" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={anchorEl !== null}
        onClose={closeLanguageMenu}
        id="lang-menu"
        MenuListProps={{
          'aria-labelledby': 'lang-label',
          role: 'listbox',
        }}
      >
        <MenuItem
          selected={i18n.language === 'en'}
          onClick={() => changeLanguage('en')}
        >
          en-US
        </MenuItem>
        <MenuItem
          selected={i18n.language !== 'en'}
          onClick={() => changeLanguage('pt')}
        >
          pt-BR
        </MenuItem>
      </Menu>
    </section>
  );
};

export default LanguageSelector;
