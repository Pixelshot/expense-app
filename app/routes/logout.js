import { json } from '@remix-run/node';
import { destroyUserSession } from '~/data/auth.server';

// This route is being triggered through a post request submitted under logout in MainHeader.jsx
export async function action({ request }) {
  if (request.method !== 'POST') {
    throw json({ message: 'Invalid request method' }, { status: 400 });
  }

  return destroyUserSession(request);
}
