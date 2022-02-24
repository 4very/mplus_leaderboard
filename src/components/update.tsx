import React from 'react';

import { Typography } from '@mui/material';

export default function UpdateText({ text }: { text: String }) {
  return (
    <Typography variant="subtitle1" align="right" style={{ padding: '20px' }}>
      Last Updated: {text} <br />
      Updates on the hour every hour or ping avery#1111 on discord.
    </Typography>
  );
}
