import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const languages = {
  en: { nativeName: 'English' },
  fr: { nativeName: 'Français' },
  es: { nativeName: 'Español' },
};

function Localization() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {t('Language')}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {Object.keys(languages).map((lng) => (
          <MenuItem key={lng} onClick={() => changeLanguage(lng)}>
            {languages[lng].nativeName}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default Localization;
