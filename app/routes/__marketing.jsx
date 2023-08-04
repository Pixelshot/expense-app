import { Outlet } from '@remix-run/react';
import MainHeader from '~/components/navigation/MainHeader';
import { getUserFromSession } from '~/data/auth.server';
import marketingStyles from '~/styles/marketing.css';

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

// The browser will automatically attach session cookie to all requests it sends to the backend
// The purpose of this loader function is to check if the incoming request has a valid cookie session attached to it
// See #96
// This function is being used in MainHeader.jsx for conditional rendering
export function loader({ request }) {
  return getUserFromSession(request);
}

export function links() {
  return [{ rel: 'stylesheet', href: marketingStyles }];
}

// This is a parent route
// Remix doesn't automatically apply parent headers to their children
// Child component needs to extract via object in their own headers:
// headers(object)
// The purpose of all this is to prevent us from accidentally extending cookie duration
// Think of it as "we have a central place(parent component) that determines what the max-age of a cookie should be"
// If it's being manually done in child components as well, then we might accidentally extend it longer
// See #106
export function headers() {
  return {
    'Cache-Control': 'max-age=6000', // 60 minutes
  };
}
