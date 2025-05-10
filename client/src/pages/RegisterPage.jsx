import { Link } from 'react-router-dom';
import InputField from '../components/form/InputField';
import Button from '../components/form/Button';
function RegisterPage() {
  return (
    <>
      <section className="min-h-screen flex items-center justify-center">
        <form className="max-w-sm w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
          <div className="flex space-x-4">
            <div>
              <InputField
                placeholder="John"
                label="First name"
                id="firstName"
                required
              />
            </div>
            <div>
              <InputField
                placeholder="Doe"
                label="Last name"
                id="email"
                required
              />
            </div>
          </div>

          <InputField
            label="Email"
            type="email"
            id="email"
            placeholder="johndoe@gmail.com"
            required
          />

          <InputField label="Password" type="password" id="password" required />
          <div className="text-gray-400 mb-5">
            <p className="text-sm">
              Already have an account?{' '}
              <Link
                to={'/'}
                className="text-gray-300 underline hover:text-blue-500 transition-colors duration-100 ease-in-out"
              >
                Here
              </Link>
            </p>
          </div>
          <Button text="Sign up" />
        </form>
      </section>
    </>
  );
}

export default RegisterPage;
