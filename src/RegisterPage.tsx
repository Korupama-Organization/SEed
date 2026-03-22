import React, { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

type Status = { type: 'idle' | 'success' | 'error'; message?: string };

const inputClass = 'mt-2 w-full rounded-2xl border border-[#F1F5F9] bg-slate-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none placeholder:text-slate-400/70 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed';

const RegisterPage: React.FC = () => {
    const [formValues, setFormValues] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        role: 'student' as 'student',
        otp: '',
    });
    const [status, setStatus] = useState<Status>({ type: 'idle' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRequestingOtp, setIsRequestingOtp] = useState(false);
    const [otpCooldown, setOtpCooldown] = useState(0);
    const [otpRequested, setOtpRequested] = useState(false);

    useEffect(() => {
        if (otpCooldown <= 0) {
            return undefined;
        }
        const timer = window.setInterval(() => {
            setOtpCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [otpCooldown]);

    const handleChange = (field: keyof typeof formValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleRoleSelect = (role: 'student' | 'teacher') => {
        if (otpRequested) {
            return;
        }
        setFormValues((prev) => ({ ...prev, role }));
    };

    const handleRequestOtp = async () => {
        if (isRequestingOtp || otpCooldown > 0) {
            return;
        }

        if (!formValues.fullName.trim() || !formValues.email.trim() || !formValues.phone.trim() || !formValues.password.trim()) {
            setStatus({ type: 'error', message: 'Vui lòng điền đầy đủ thông tin trước khi yêu cầu mã OTP.' });
            return;
        }

        setIsRequestingOtp(true);
        setStatus({ type: 'idle' });

        const endpoint = otpRequested ? '/api/auth/resend-verify-email-otp' : '/api/auth/register';
        const payload = otpRequested
            ? { email: formValues.email }
            : {
                fullName: formValues.fullName,
                email: formValues.email,
                phone: formValues.phone,
                password: formValues.password,
                role: formValues.role,
            };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Không thể gửi OTP. Vui lòng thử lại sau.');
            }

            setStatus({
                type: 'success',
                message: otpRequested
                    ? data.message || 'OTP mới đã được gửi đến hộp thư của bạn.'
                    : 'Đã gửi OTP! Vui lòng kiểm tra email và nhập mã phía dưới.',
            });
            setOtpCooldown(60);
            if (!otpRequested) {
                setOtpRequested(true);
            }
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message || 'Không thể gửi OTP. Vui lòng thử lại sau.' });
        } finally {
            setIsRequestingOtp(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!otpRequested) {
            setStatus({ type: 'error', message: 'Vui lòng yêu cầu OTP trước khi hoàn tất đăng ký.' });
            return;
        }
        if (!formValues.otp.trim()) {
            setStatus({ type: 'error', message: 'Vui lòng nhập mã OTP đã được gửi tới email của bạn.' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: 'idle' });

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/verify-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formValues.email,
                    otp: formValues.otp,
                }),
            });

            const payload = await response.json();
            if (!response.ok) {
                throw new Error(payload.error || 'Xác thực OTP không thành công.');
            }

            setStatus({ type: 'success', message: payload.message || 'Xác thực email thành công! Tài khoản của bạn đã sẵn sàng.' });
            setFormValues({ fullName: '', email: '', phone: '', password: '', role: 'student', otp: '' });
            setOtpRequested(false);
            setOtpCooldown(0);
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message || 'Không thể xác thực OTP. Vui lòng thử lại.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F7F9FC] via-white to-[#EEF2FF] text-slate-900 font-['Inter']">
            <header className="flex items-center justify-between px-6 lg:px-12 py-6">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-primary text-white shadow-lg shadow-indigo-200 flex items-center justify-center">
                        <span className="material-symbols-outlined">school</span>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">EduFlow</p>
                    </div>
                </div>
                <a className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors flex items-center gap-2" href="#">
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Quay lại trang chủ
                </a>
            </header>

            <main className="px-4 pb-16 flex justify-center">
                <div className="w-full max-w-xl">
                    <div className="relative rounded-[32px] border border-[#F1F5F9] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] px-6 py-8 lg:px-10 lg:py-10">
                        <div className="text-center mb-8">
                            <div className="flex justify-center gap-10 text-sm font-semibold text-slate-400">
                                <button className="pb-2 border-b-2 border-transparent hover:text-primary transition-colors">Đăng nhập</button>
                                <button className="pb-2 border-b-2 border-primary text-primary">Tạo tài khoản</button>
                            </div>
                            <h1 className="text-2xl lg:text-3xl font-extrabold mt-6 mb-2">Tạo tài khoản của bạn</h1>
                            <p className="text-sm text-slate-500">Tham gia cộng đồng học viên và giảng viên của chúng tôi.</p>
                        </div>

                        <div className="mb-6">
                            <p className="text-xs font-semibold text-slate-400 mb-3">TÔI THAM GIA VỚI VAI TRÒ...</p>
                            <div className="flex rounded-2xl border border-[#F1F5F9] bg-slate-50 p-1">
                                <button
                                    className={`flex-1 px-4 py-2 text-sm font-semibold rounded-2xl transition-colors ${formValues.role === 'student'
                                        ? 'bg-[#6366F1] text-white shadow-sm shadow-indigo-200'
                                        : 'text-slate-500 hover:text-slate-700'
                                    } ${otpRequested ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    type="button"
                                    onClick={() => handleRoleSelect('student')}
                                    disabled={otpRequested}
                                >
                                    Tôi là học viên
                                </button>
                                <button
                                    className={`flex-1 px-4 py-2 text-sm font-semibold rounded-2xl transition-colors ${formValues.role === 'teacher'
                                        ? 'bg-[#6366F1] text-white shadow-sm shadow-indigo-200'
                                        : 'text-slate-500 hover:text-slate-700'
                                    } ${otpRequested ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    type="button"
                                    onClick={() => handleRoleSelect('teacher')}
                                    disabled={otpRequested}
                                >
                                    Tôi là giảng viên
                                </button>
                            </div>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 tracking-wide">HỌ VÀ TÊN</label>
                                <input className={inputClass} placeholder="Nguyễn Văn A" type="text" value={formValues.fullName} onChange={handleChange('fullName')} required disabled={otpRequested} />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 tracking-wide">EMAIL</label>
                                <input className={inputClass} placeholder="tenban@email.com" type="email" value={formValues.email} onChange={handleChange('email')} required disabled={otpRequested} />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 tracking-wide">SỐ ĐIỆN THOẠI</label>
                                <input className={inputClass} placeholder="VD: 09xx xxx xxx" type="tel" value={formValues.phone} onChange={handleChange('phone')} required disabled={otpRequested} />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 tracking-wide">MẬT KHẨU</label>
                                <input className={inputClass} placeholder="Tối thiểu 8 ký tự" type="password" value={formValues.password} onChange={handleChange('password')} minLength={6} required disabled={otpRequested} />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 tracking-wide">MÃ OTP EMAIL</label>
                                <div className="mt-2 flex items-center gap-3">
                                    <input
                                        className={`${inputClass} flex-1 mt-0`}
                                        placeholder="Mã 6 chữ số"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={formValues.otp}
                                        onChange={handleChange('otp')}
                                    />
                                    <button
                                        className="text-xs font-semibold text-primary hover:text-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                        type="button"
                                        onClick={handleRequestOtp}
                                        disabled={isRequestingOtp || otpCooldown > 0}
                                    >
                                        {isRequestingOtp
                                            ? 'Đang gửi…'
                                            : otpCooldown > 0
                                                ? `Thử lại sau ${otpCooldown}s`
                                                : otpRequested
                                                    ? 'Gửi lại OTP'
                                                    : 'Lấy OTP'}
                                    </button>
                                </div>
                            </div>

                            {status.type !== 'idle' && status.message && (
                                <div
                                    className={`rounded-2xl border px-4 py-3 text-sm ${status.type === 'success'
                                        ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                                        : 'border-rose-200 bg-rose-50 text-rose-600'
                                    }`}
                                    role="alert"
                                    aria-live="assertive"
                                >
                                    {status.message}
                                </div>
                            )}

                            <button
                                className="w-full rounded-2xl py-4 text-sm font-semibold text-white bg-[#6366F1] shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Đang tạo tài khoản…' : otpRequested ? 'Hoàn tất đăng ký' : 'Tạo tài khoản'}
                            </button>
                            <p className="text-[11px] text-center text-slate-400">
                                Bằng việc đăng ký, bạn đồng ý với <a className="text-primary font-semibold" href="#">Điều khoản</a> và <a className="text-primary font-semibold" href="#">Chính sách bảo mật</a> của chúng tôi.
                            </p>
                        </form>

                        <div className="mt-8">
                            <div className="flex items-center gap-3 text-xs text-slate-400">
                                <div className="h-px flex-1 bg-[#F1F5F9]" />
                                HOẶC TIẾP TỤC VỚI
                                <div className="h-px flex-1 bg-[#F1F5F9]" />
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <button className="rounded-2xl border border-[#F1F5F9] bg-white py-3 text-sm font-semibold text-slate-500 hover:border-primary transition-colors" type="button">
                                    <span className="flex items-center justify-center gap-2">
                                        <img src="/google.svg" alt="Google" className="w-5 h-5" />
                                        Google
                                    </span>
                                </button>
                                <button className="rounded-2xl border border-[#F1F5F9] bg-white py-3 text-sm font-semibold text-slate-500 hover:border-primary transition-colors" type="button">
                                    <span className="flex items-center justify-center gap-2">
                                        <img src="/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                                        LinkedIn
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-xs text-slate-400 mt-8 flex flex-col gap-2">
                        <div className="flex justify-center gap-6">
                            <a className="hover:text-primary" href="#">Trung tâm hỗ trợ</a>
                            <a className="hover:text-primary" href="#">Chính sách bảo mật</a>
                            <a className="hover:text-primary" href="#">Liên hệ hỗ trợ</a>
                        </div>
                        <p>© 2024 EduFlow LMS. Đã đăng ký bản quyền.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RegisterPage;
