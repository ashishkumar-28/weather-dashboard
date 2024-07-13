import React from 'react';
import { Typography } from '@mui/material';

function Error({ message }) {
  return (
    <Typography variant="h6" color="error">
      {message}
    </Typography>
  );
}

export default Error;
