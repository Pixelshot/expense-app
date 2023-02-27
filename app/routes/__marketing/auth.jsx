import AuthForm from '~/components/auth/AuthForm';
import { validateCredentials } from '~/data/validation.server.js';
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
  const credentials = Object.entries(formData);

  // Go through validation that has been defined in validation.server.js
  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
    // This return is in data form and data can be extracted via useActionData on the client-side
    // In our case we're extracting this in AuthForm
  }

  if (authMode === 'login') {
    // login logic
  } else {
    // sign up logic
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
