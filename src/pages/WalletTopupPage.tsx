import { useEffect, useState } from 'react';

type MessageTone = 'success' | 'error' | 'info';

interface WalletTransaction {
    id: string;
    type: string;
    direction: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    provider?: string;
    providerOrderCode?: number;
    providerPaymentLinkId?: string;
    providerReference?: string;
    note?: string;
    createdAt: string;
    updatedAt: string;
}

interface WalletSummary {
    balance: number;
    presetAmounts: number[];
    user: {
        id: string;
        fullName: string;
        email: string;
    };
    recentTransactions: WalletTransaction[];
}

interface ApiErrorPayload {
    error?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const FALLBACK_AMOUNTS = [100_000, 200_000, 500_000, 1_000_000];
const MANUAL_TOKEN_STORAGE_KEY = 'studuy_wallet_manual_token';
const TOKEN_CANDIDATE_KEYS = [
    MANUAL_TOKEN_STORAGE_KEY,
    'studuy_access_token',
    'access_token',
    'accessToken',
    'token',
];

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
});

const findStoredToken = (): string => {
    if (typeof window === 'undefined') {
        return '';
    }

    for (const key of TOKEN_CANDIDATE_KEYS) {
        const value = window.localStorage.getItem(key);
        if (value?.trim()) {
            return value.trim();
        }
    }

    return '';
};

const formatCurrency = (value: number): string => currencyFormatter.format(value);

const formatDate = (value: string): string => {
    const parsedDate = new Date(value);
    if (Number.isNaN(parsedDate.getTime())) {
        return value;
    }

    return dateFormatter.format(parsedDate);
};

const statusLabelMap: Record<WalletTransaction['status'], string> = {
    pending: 'Đang chờ thanh toán',
    completed: 'Đã cộng tiền',
    failed: 'Khởi tạo thất bại',
    cancelled: 'Đã hủy',
};

const statusClassMap: Record<WalletTransaction['status'], string> = {
    pending: 'bg-amber-100 text-amber-800',
    completed: 'bg-emerald-100 text-emerald-800',
    failed: 'bg-rose-100 text-rose-800',
    cancelled: 'bg-slate-200 text-slate-700',
};

const WalletTopupPage = () => {
    const searchParams =
        typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const returnOrderCode = searchParams?.get('orderCode');
    const returnStatus = searchParams?.get('payosStatus');

    const [authToken, setAuthToken] = useState<string>(() => findStoredToken());
    const [tokenInput, setTokenInput] = useState<string>(() => findStoredToken());
    const [summary, setSummary] = useState<WalletSummary | null>(null);
    const [selectedAmount, setSelectedAmount] = useState<number>(FALLBACK_AMOUNTS[0]);
    const [isLoadingSummary, setIsLoadingSummary] = useState(false);
    const [isCreatingLink, setIsCreatingLink] = useState(false);
    const [syncingOrderCode, setSyncingOrderCode] = useState<number | null>(null);
    const [hasHandledReturnFlow, setHasHandledReturnFlow] = useState(false);
    const [message, setMessage] = useState<{ tone: MessageTone; text: string } | null>(() => {
        if (returnStatus === 'cancelled') {
            return {
                tone: 'info',
                text: 'Bạn đã quay lại từ payOS. Hệ thống sẽ giữ giao dịch ở trạng thái chờ hoặc hủy cho tới khi đồng bộ xong.',
            };
        }

        if (returnStatus === 'success') {
            return {
                tone: 'info',
                text: 'Bạn đã quay lại từ payOS. Hệ thống đang đồng bộ kết quả thanh toán.',
            };
        }

        return null;
    });

    const fetchJson = async <T,>(
        path: string,
        options?: RequestInit,
        tokenOverride?: string
    ): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(tokenOverride
                    ? {
                          Authorization: `Bearer ${tokenOverride}`,
                      }
                    : {}),
                ...(options?.headers || {}),
            },
        });

        const payload = (await response.json()) as T & ApiErrorPayload;
        if (!response.ok) {
            throw new Error(payload.error || 'Yêu cầu thất bại.');
        }

        return payload;
    };

    const loadSummary = async (token = authToken) => {
        if (!token) {
            return;
        }

        setIsLoadingSummary(true);
        try {
            const payload = await fetchJson<WalletSummary>('/api/wallet/summary', undefined, token);
            setSummary(payload);
            setSelectedAmount((currentValue) =>
                payload.presetAmounts.includes(currentValue)
                    ? currentValue
                    : payload.presetAmounts[0] || FALLBACK_AMOUNTS[0]
            );
        } catch (error: any) {
            setMessage({
                tone: 'error',
                text: error.message || 'Không tải được thông tin ví.',
            });
        } finally {
            setIsLoadingSummary(false);
        }
    };

    const syncTopupStatus = async (orderCode: number, token = authToken) => {
        if (!token) {
            setMessage({
                tone: 'info',
                text: 'Cần access token để đồng bộ giao dịch nạp tiền này.',
            });
            return;
        }

        setSyncingOrderCode(orderCode);
        try {
            const payload = await fetchJson<{ balance: number; transaction: WalletTransaction }>(
                `/api/wallet/topups/${orderCode}/sync`,
                {
                    method: 'POST',
                },
                token
            );

            setSummary((currentSummary) => {
                if (!currentSummary) {
                    return currentSummary;
                }

                const nextTransactions = currentSummary.recentTransactions.some(
                    (transaction) => transaction.id === payload.transaction.id
                )
                    ? currentSummary.recentTransactions.map((transaction) =>
                          transaction.id === payload.transaction.id ? payload.transaction : transaction
                      )
                    : [payload.transaction, ...currentSummary.recentTransactions];

                return {
                    ...currentSummary,
                    balance: payload.balance,
                    recentTransactions: nextTransactions,
                };
            });

            if (payload.transaction.status === 'completed') {
                setMessage({
                    tone: 'success',
                    text: `Nạp ${formatCurrency(payload.transaction.amount)} thành công. Số dư đã được cập nhật.`,
                });
            } else if (payload.transaction.status === 'cancelled') {
                setMessage({
                    tone: 'info',
                    text: 'Giao dịch đã bị hủy hoặc hết hạn trên payOS.',
                });
            } else {
                setMessage({
                    tone: 'info',
                    text: 'payOS vẫn đang xử lý giao dịch này. Bạn có thể đồng bộ lại sau vài giây.',
                });
            }

            await loadSummary(token);
        } catch (error: any) {
            setMessage({
                tone: 'error',
                text: error.message || 'Không thể đồng bộ giao dịch payOS.',
            });
        } finally {
            setSyncingOrderCode(null);
        }
    };

    const handleApplyToken = async () => {
        const nextToken = tokenInput.trim();
        if (!nextToken) {
            setMessage({
                tone: 'error',
                text: 'Vui lòng nhập access token trước khi nạp tiền.',
            });
            return;
        }

        window.localStorage.setItem(MANUAL_TOKEN_STORAGE_KEY, nextToken);
        setAuthToken(nextToken);
        setMessage({
            tone: 'success',
            text: 'Đã lưu access token cục bộ cho trang ví.',
        });
        await loadSummary(nextToken);
    };

    const handleCreateTopup = async () => {
        if (!authToken) {
            setMessage({
                tone: 'error',
                text: 'Trang cần access token hợp lệ để tạo giao dịch nạp tiền.',
            });
            return;
        }

        setIsCreatingLink(true);
        try {
            const payload = await fetchJson<{ checkoutUrl: string }>(
                '/api/wallet/topups/payos/create',
                {
                    method: 'POST',
                    body: JSON.stringify({ amount: selectedAmount }),
                },
                authToken
            );

            window.location.assign(payload.checkoutUrl);
        } catch (error: any) {
            setMessage({
                tone: 'error',
                text: error.message || 'Không thể tạo link thanh toán payOS.',
            });
        } finally {
            setIsCreatingLink(false);
        }
    };

    useEffect(() => {
        if (!authToken) {
            return;
        }

        void loadSummary(authToken);
    }, [authToken]);

    useEffect(() => {
        if (!authToken || !returnOrderCode || hasHandledReturnFlow) {
            return;
        }

        const orderCode = Number(returnOrderCode);
        if (!Number.isFinite(orderCode)) {
            return;
        }

        setHasHandledReturnFlow(true);
        void syncTopupStatus(orderCode, authToken);
    }, [authToken, hasHandledReturnFlow, returnOrderCode]);

    const presetAmounts = summary?.presetAmounts?.length ? summary.presetAmounts : FALLBACK_AMOUNTS;

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top,#e0e7ff_0%,#f8fafc_45%,#eef2ff_100%)] text-slate-900">
            <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_rgba(79,70,229,0.12)] backdrop-blur md:flex-row md:items-center md:justify-between">
                    <div>
                        <a
                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                            href="/"
                        >
                            <span>&larr;</span>
                            Quay về landing page
                        </a>
                        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">
                            Wallet / payOS
                        </p>
                        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                            Nạp tiền vào tài khoản Studuy
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                            Chọn nhanh một mốc nạp, hệ thống sẽ tạo link thanh toán `payOS` và tự đồng bộ số dư sau khi bạn quay lại.
                        </p>
                    </div>

                    <div className="rounded-[1.5rem] bg-slate-950 px-6 py-5 text-white shadow-2xl shadow-slate-900/15">
                        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Số dư hiện tại</p>
                        <p className="mt-3 text-3xl font-black">
                            {summary ? formatCurrency(summary.balance) : 'Chưa tải'}
                        </p>
                        <p className="mt-2 text-sm text-slate-300">
                            {summary?.user ? `${summary.user.fullName} • ${summary.user.email}` : 'Kết nối access token để tải ví'}
                        </p>
                    </div>
                </div>

                {message ? (
                    <div
                        className={`mb-6 rounded-2xl border px-4 py-3 text-sm font-medium ${
                            message.tone === 'success'
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                                : message.tone === 'error'
                                    ? 'border-rose-200 bg-rose-50 text-rose-700'
                                    : 'border-indigo-200 bg-indigo-50 text-indigo-800'
                        }`}
                    >
                        {message.text}
                    </div>
                ) : null}

                <div className="grid flex-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur">
                        <div className="flex flex-col gap-4 border-b border-slate-100 pb-6">
                            <div>
                                <p className="text-sm font-semibold text-slate-500">Access token</p>
                                <h2 className="mt-2 text-2xl font-bold text-slate-950">Kết nối ví người dùng</h2>
                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                                    Trang sẽ tự đọc token từ `localStorage` nếu app của bạn đã lưu sẵn. Nếu chưa có flow login ở frontend này, bạn có thể dán `access_token` từ API đăng nhập để test ngay.
                                </p>
                            </div>

                            <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                                <textarea
                                    className="min-h-28 rounded-[1.25rem] border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-inner shadow-slate-200/40 focus:border-primary focus:ring-primary"
                                    onChange={(event) => setTokenInput(event.target.value)}
                                    placeholder="Dán access token ở đây nếu localStorage chưa có sẵn..."
                                    value={tokenInput}
                                />
                                <button
                                    className="rounded-[1.25rem] bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                                    disabled={isLoadingSummary}
                                    onClick={() => {
                                        void handleApplyToken();
                                    }}
                                    type="button"
                                >
                                    {isLoadingSummary ? 'Đang tải ví...' : 'Lưu token và tải ví'}
                                </button>
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-semibold text-slate-500">Chọn mức nạp</p>
                                    <h2 className="mt-2 text-2xl font-bold text-slate-950">4 gói payOS có sẵn</h2>
                                </div>
                                <div className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">
                                    Chuyển khoản QR
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                {presetAmounts.map((amount) => {
                                    const isSelected = selectedAmount === amount;

                                    return (
                                        <button
                                            key={amount}
                                            className={`rounded-[1.5rem] border p-5 text-left transition ${
                                                isSelected
                                                    ? 'border-primary bg-gradient-to-br from-indigo-600 to-indigo-500 text-white shadow-[0_18px_45px_rgba(79,70,229,0.28)]'
                                                    : 'border-slate-200 bg-slate-50 text-slate-900 hover:border-indigo-300 hover:bg-white'
                                            }`}
                                            onClick={() => setSelectedAmount(amount)}
                                            type="button"
                                        >
                                            <p className={`text-xs font-bold uppercase tracking-[0.24em] ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                                                Gói nạp
                                            </p>
                                            <p className="mt-3 text-3xl font-black">{formatCurrency(amount)}</p>
                                            <p className={`mt-3 text-sm ${isSelected ? 'text-indigo-100' : 'text-slate-600'}`}>
                                                Mở link thanh toán `payOS`, hoàn tất xong hệ thống sẽ cộng tiền vào ví học viên.
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-6 rounded-[1.75rem] bg-slate-950 p-6 text-white">
                                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                                            Sẵn sàng thanh toán
                                        </p>
                                        <p className="mt-3 text-4xl font-black">
                                            {formatCurrency(selectedAmount)}
                                        </p>
                                        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                                            Sau khi bấm nạp tiền, trình duyệt sẽ chuyển qua trang checkout của `payOS`. Khi quay lại, trang này sẽ tự gọi API đồng bộ trạng thái giao dịch.
                                        </p>
                                    </div>

                                    <button
                                        className="inline-flex min-w-52 items-center justify-center rounded-full bg-white px-6 py-4 text-base font-bold text-slate-950 transition hover:scale-[1.01] hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
                                        disabled={isCreatingLink || isLoadingSummary || !authToken}
                                        onClick={() => {
                                            void handleCreateTopup();
                                        }}
                                        type="button"
                                    >
                                        {isCreatingLink ? 'Đang tạo link...' : 'Nạp tiền với payOS'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <aside className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-slate-500">Lịch sử gần đây</p>
                                <h2 className="mt-2 text-2xl font-bold text-slate-950">Theo dõi giao dịch nạp tiền</h2>
                            </div>
                            <button
                                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                                disabled={!authToken || isLoadingSummary}
                                onClick={() => {
                                    void loadSummary();
                                }}
                                type="button"
                            >
                                {isLoadingSummary ? 'Đang tải...' : 'Làm mới'}
                            </button>
                        </div>

                        <div className="mt-6 space-y-4">
                            {summary?.recentTransactions?.length ? (
                                summary.recentTransactions.map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4"
                                    >
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                            <div>
                                                <p className="text-lg font-bold text-slate-950">
                                                    {formatCurrency(transaction.amount)}
                                                </p>
                                                <p className="mt-1 text-sm text-slate-600">
                                                    {transaction.note || 'Giao dịch nạp tiền'}
                                                </p>
                                                <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                                                    {transaction.providerOrderCode
                                                        ? `Order ${transaction.providerOrderCode}`
                                                        : 'Topup'}
                                                </p>
                                            </div>

                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusClassMap[transaction.status]}`}
                                            >
                                                {statusLabelMap[transaction.status]}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                                            <p className="text-sm text-slate-500">
                                                {formatDate(transaction.createdAt)}
                                            </p>

                                            {transaction.status === 'pending' && transaction.providerOrderCode ? (
                                                <button
                                                    className="rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
                                                    disabled={syncingOrderCode === transaction.providerOrderCode}
                                                    onClick={() => {
                                                        void syncTopupStatus(transaction.providerOrderCode!);
                                                    }}
                                                    type="button"
                                                >
                                                    {syncingOrderCode === transaction.providerOrderCode
                                                        ? 'Đang đồng bộ...'
                                                        : 'Đồng bộ trạng thái'}
                                                </button>
                                            ) : null}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm leading-6 text-slate-500">
                                    Chưa có giao dịch nạp tiền nào trong tài khoản này. Chọn một gói bên trái để tạo giao dịch đầu tiên bằng `payOS`.
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default WalletTopupPage;
