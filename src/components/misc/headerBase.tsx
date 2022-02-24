import React from 'react';

import { Typography } from '@mui/core';
import Link from 'next/link';

import Indent from './indent';

export default function HeaderBase({
  dateFrom,
  dateTo,
  name,
  children = undefined,
}: {
  dateFrom: String;
  dateTo: String;
  name: String;
  children?: any;
}) {
  return (
    <div className="pt-10 pb-0 box-border">
      <Typography variant="h2" className="font-serif">
        <Link href="/"> Currently Online </Link>
      </Typography>
      <Indent>
        <Typography variant="h4" className="font-serif">
          {name}
        </Typography>
        <Typography variant="h5" className="font-serif mb-3">
          <span className="">{dateFrom}</span> to{' '}
          <span className="">{dateTo}</span>
        </Typography>
        {children}
      </Indent>
    </div>
  );
}
