// Splat route

import { redirect } from '@remix-run/node';

export function loader({ params }) {
  if (params['*'] === 'exp') {
    return redirect('/expenses');
  }

  throw new Response('Page not found.', { status: 404 });
}
