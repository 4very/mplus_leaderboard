/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';

import { useUser } from '@auth0/nextjs-auth0';
import { Typography } from '@mui/material';

export default function AdminPage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user)
    return (
      <div className="pt-10 sm:pl-2 lg:pl-6 pb-0 box-border text-center mt-10">
        <Typography variant="h2" className="font-serif">
          You are not logged in
        </Typography>
        <Typography variant="h4" className="font-serif">
          <a href="/api/auth/login">Click here to login</a>
        </Typography>
      </div>
    );

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
