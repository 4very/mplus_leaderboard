import React from 'react';

import { Typography } from '@mui/base';
import Link from 'next/link';

export default function WeekNav({
  prevLink,
  nextLink,
  currNum,
}: {
  prevLink: boolean;
  nextLink: boolean;
  currNum: number;
}) {
  return (
    <Typography variant="h6" className="font-sans">
      {prevLink && <Link href={`/g/${currNum - 1}`}>{'<< Previous Week'}</Link>}

      {prevLink && nextLink && <div className="w-10 inline-block" />}

      {nextLink && <Link href={`/g/${currNum + 1}`}>{'Next Week >>'}</Link>}
    </Typography>
  );
}
