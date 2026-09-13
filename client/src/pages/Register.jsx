import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ErrorBanner from '../components/ErrorBanner';

function Register() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const errors = {};
    if (form.username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errors.email = 'Enter a valid email';
    }
    if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      await signup(form);
      navigate('/');
    } catch (err) {
      setFormError(err.response?.data?.message || 'Signup failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" value={form.username} onChange={handleChange} />
          {fieldErrors.username && <p role="alert">{fieldErrors.username}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
          {fieldErrors.email && <p role="alert">{fieldErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          {fieldErrors.password && <p role="alert">{fieldErrors.password}</p>}
        </div>

        <ErrorBanner message={formError} />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Register;
