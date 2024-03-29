import AuthForm from '~/components/auth/AuthForm';
import { validateCredentials } from '~/data/validation.server.js';
import { login, signup } from '~/data/auth.server';
import authStyles from '~/styles/auth.css';

export default function AuthPage() {
  return (
    <div>
      <AuthForm />
    </div>
  );
}

export async function action({ request }) {
  // Usually we obtain params with request.method but here we'll be using URL() class by node.js
  // More info on URL() class https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
  const searchParams = new URL(request.url).searchParams; // This gives us access to the search params encoded in the URL
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  // Go through validation that has been defined in validation.server.js
  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
    // This return is in data form and data can be extracted via useActionData on the client-side
    // In our case we're extracting this in AuthForm
  }

  try {
    if (authMode === 'login') {
      return await login(credentials);
    } else {
      return await signup(credentials);
    }
  } catch (error) {
    if (/(422|401|403)/.test(error.status)) {
      return { credentials: error.message };
    }
    return { credentials: 'Something went wrong!' };
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}

// This is the extraction from parent headers
// For more explanation, see notes @ headers in __marketing.jsx
export function headers({ actionHeaders, loaderHeaders, parentHeaders }) {
  return {
    'Cache-Control': parentHeaders.get('Cache-Control'),
  };
}
