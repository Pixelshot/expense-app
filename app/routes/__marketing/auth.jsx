import AuthForm from '~/components/auth/AuthForm';
import authStyles from '~/styles/auth.css';

export default function AuthPage() {
  return (
    <div>
      <AuthForm />
    </div>
  );
}

export async function action({ request }) {
  // Usually we obtain params with request.method but here we'll be using URL() object by node
  const searchParams = new URL(request.url).searchParams; // This gives us access to the search params encoded in the URL
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.entries(formData);

  if (authMode === 'login') {
    // login logic
  } else {
    // sign up logic
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
