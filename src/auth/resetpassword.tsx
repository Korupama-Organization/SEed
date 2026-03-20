import React, { useState, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const query = useQuery();
  const email = query.get('email') || 'example@gmail.com';

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!password || !confirmPassword) {
      setError('Vui lòng nhập mật khẩu và xác nhận.');
      return;
    }

    if (password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setMessage('Đặt lại mật khẩu thành công! Bạn sẽ được chuyển sang đăng nhập.');

    setTimeout(() => {
      navigate('/login');
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-800 shadow-2xl rounded-3xl p-8 sm:p-10">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-extrabold text-slate-900 dark:text-white">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined">school</span>
            </div>
            EduFlow
          </Link>
          <Link to="/login" className="text-sm font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </div>

        <h1 className="text-center text-4xl font-bold text-slate-900 dark:text-white">Reset Your Password</h1>
        <p className="mt-3 text-center text-slate-500 dark:text-slate-300">Enter your new password below</p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          <div className="flex items-center justify-center">
            <img
              src="https://img.freepik.com/free-vector/password-change-concept-illustration_114360-6133.jpg?w=740&t=st=1710951256~exp=1710951856~hmac=ddb131f5fc042fe16b8b887ed0e41a30f91f367395a76148efff5af8006af2f2"
              alt="Reset password illustration"
              className="rounded-2xl shadow-lg max-h-80 object-cover"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <p className="text-sm text-slate-500 dark:text-slate-400">Resetting password for <span className="font-semibold text-slate-900 dark:text-white">{email}</span></p>

            {error && <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 p-3 text-sm dark:bg-red-900/30 dark:border-red-500/40 dark:text-red-200">{error}</div>}
            {message && <div className="rounded-lg bg-green-50 border border-green-200 text-green-700 p-3 text-sm dark:bg-green-900/30 dark:border-green-500/40 dark:text-green-200">{message}</div>}

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <button className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-indigo-600 transition">Reset Password</button>
          </form>
        </div>

        <div className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
          Remembered your password? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
