import React from 'react';

import { Typography } from '@material-ui/core';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <div className="pt-10 sm:pl-2 lg:pl-6 pb-0 box-border text-center">
        <div className="mb-20">
          <Typography variant="h1" className="font-serif">
            Currently Online
          </Typography>
          <Typography variant="h3" className="font-serif">
            Mythic+ Tracker
          </Typography>
        </div>
        <div className="flex self-center justify-center flex-col mb-20">
          <div className="mb-10">
            <Typography variant="h3" className="font-serif">
              Weekly Guild Leaderboards
            </Typography>
            <Typography variant="h4" className="underline">
              <Link href="/g/current">Current Week</Link>
            </Typography>
          </div>
          <div className="">
            <Typography variant="h3" className="font-serif">
              Guild Tournaments
            </Typography>
            <Typography variant="h4" className="underline">
              <Link href="/t/tournament-2">
                the September(ish) M+ Tournament!
              </Link>
            </Typography>
            <Typography variant="h4" className="underline">
              <Link href="/t/tournament-1">Tournament 1</Link>
            </Typography>
          </div>
        </div>
        <Typography variant="subtitle1" className="font-serif">
          Disclaimer: This is not a finished page and just a temporary
          placeholder. <br />
          Please report any errors to{' '}
          <span className="font-sans">avery#1111</span> on discord
        </Typography>
      </div>
    </>
  );
}
