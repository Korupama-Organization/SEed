import React, { useState, useEffect } from 'react';

const LandingPage: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen">
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">school</span>
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Edu<span className="text-primary">Flow</span></span>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <a className="font-medium hover:text-primary transition-colors" href="#">Courses</a>
                            <a className="font-medium hover:text-primary transition-colors" href="#">Mentors</a>
                            <a className="font-medium hover:text-primary transition-colors" href="#">Enterprise</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                id="theme-toggle"
                            >
                                <span className="material-symbols-outlined dark:hidden">dark_mode</span>
                                <span className="material-symbols-outlined hidden dark:block">light_mode</span>
                            </button>
                            <div className="hidden sm:flex items-center gap-2">
                                <a className="px-4 py-2 font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-white" href="#">Sign In</a>
                                <a className="px-6 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25" href="#">Join Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20 dark:opacity-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-400 blur-[120px] rounded-full"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="text-center lg:text-left">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-primary font-bold text-sm mb-6 uppercase tracking-wider">
                                Unlock Your Potential
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-8 dark:text-white">
                                Master New Skills <br />
                                <span className="text-primary italic">At Your Own Pace.</span>
                            </h1>
                            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Join over 5 million learners worldwide. Access premium courses curated by industry experts in technology, business, and design.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                                <div className="relative flex-grow">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                    <input className="w-full pl-12 pr-4 py-4 rounded-2xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary shadow-xl shadow-slate-200/50 dark:shadow-none" placeholder="What do you want to learn today?" type="text" />
                                </div>
                                <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-indigo-500/30">
                                    Start Learning
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                                <div className="flex -space-x-2">
                                    <img alt="User avatar" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKU4Tninkwcxm-FFbHmfAOlUz-tsT1GEFOCxyQFopBpcMhvTPgu3V0sMW5K35Lg_LG0i6EH5y7GzTK16I6Aw5E5xLMXJ8j5DDjTOpNI8y4hfx56zGmgq-fDYS6seyb0CTCwqCCK_CP0EyoxRA0qgJVVUADY9seHnyzKEmohsVdju2dyiZp18Bks1mcs_8mgau3tj7bFMhhIFdNkMP9cbB-39dhsHo4It-bwqToGM9w4E2RwtODrm8fmDjLwGiNANkUkgr2ydPpSYI" />
                                    <img alt="User avatar" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTP9R6V5xI4uRErsxQYY48f2HzqW88lW-NWRg1UitVTVMJllNS-Xj-r9DhvsT1DeepAPqQFP-OtWDfp_BtTO0Q1zaNpUilu5SvbsWqHKfj3QRdZQxZeZ-qD309XPnXILVYyRO9KalIThwL-QdjYD8PK9o7kUyc_znvElSGim3FYBPf0IjZ5reMzeZkFeaAET_tqXC1LziuRZPjL-HNPkbe4rnuPhJzqxbJQrlRa59SOz_AEx4oxVmxXPEID6rC4qmdNBZUL7h03ho" />
                                    <img alt="User avatar" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDCR2FAhNEgadN-igZC0K_9ZrJ0GAeOPJS30cSNqdz8xNyB2C1UTRzHpyoajnmx0qjlkxTaqxjgEvdkbgX8aZZv6viAQik9zx2nUStWu8fUIuDrJuMQSZb3MlJd1xHcd9n08EgYqRlO1fdHyAdwfUfCsBWJGjmdEjZuf4pjKRd3VbrRjRj3DLcP9gyTR8kwfWdE2aVoVO5Df4tCgD1LTiYyWnULNi-_hAE75gLuwXLdeIE3L_1aZDsbyIVqSYK6z97acH_sF-Qgao" />
                                </div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                    <span className="text-slate-900 dark:text-white font-bold">12k+</span> people joined this week
                                </p>
                            </div>
                        </div>
                        <div className="mt-16 lg:mt-0 relative hidden lg:block">
                            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 rotate-2">
                                <img alt="Students learning together" className="w-full object-cover aspect-[4/5]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIsUEr_r3lyBPlwA-oa2w7hvNk2KMrjPt6sum9fjiUFCTzjH5zPa7X-VxIcowRWzcZBfVdeKzJJKT39gPJe5HJXXRslsmCdsEikgLf8RJyM4G30gvB1Oial14Z7AYojjFxqVgITGW6baLEdlLOgPqjwHcfkMGYxXzTSf_4Gy1BJmDq7UUUMyFIICpcV854_RbzLV3LX3sVr4HKcOsA2VIHxan6VVD2hZjEevRRb5B3XzUDNvy9qU7JSAIxMt3aRrnZN27uzIrLzDY" />
                            </div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined">verified</span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase">Certified</p>
                                    <p className="font-bold text-slate-900 dark:text-white">Course Completed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl font-extrabold dark:text-white mb-4">Top Categories</h2>
                            <p className="text-slate-600 dark:text-slate-400">Explore the most popular fields and start your journey.</p>
                        </div>
                        <a className="text-primary font-bold flex items-center gap-1 hover:underline" href="#">
                            View all categories <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <a className="group p-8 rounded-3xl bg-background-light dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all text-center" href="#">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-4xl">code</span>
                            </div>
                            <h3 className="font-bold text-xl mb-2">Development</h3>
                            <p className="text-sm text-slate-500">1,200+ Courses</p>
                        </a>
                        <a className="group p-8 rounded-3xl bg-background-light dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all text-center" href="#">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-4xl">trending_up</span>
                            </div>
                            <h3 className="font-bold text-xl mb-2">Business</h3>
                            <p className="text-sm text-slate-500">850+ Courses</p>
                        </a>
                        <a className="group p-8 rounded-3xl bg-background-light dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all text-center" href="#">
                            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-4xl">palette</span>
                            </div>
                            <h3 className="font-bold text-xl mb-2">Design</h3>
                            <p className="text-sm text-slate-500">640+ Courses</p>
                        </a>
                        <a className="group p-8 rounded-3xl bg-background-light dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all text-center" href="#">
                            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-4xl">campaign</span>
                            </div>
                            <h3 className="font-bold text-xl mb-2">Marketing</h3>
                            <p className="text-sm text-slate-500">420+ Courses</p>
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl font-extrabold dark:text-white mb-4">Featured Courses</h2>
                            <p className="text-slate-600 dark:text-slate-400">Learn from the best in the industry.</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Course Card 1 */}
                        <div className="course-card bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="relative">
                                <img alt="Full Stack Web Dev" className="w-full aspect-video object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtEn8nV2dHkp747cC9f6toJDV0FNBHCiBTQfuqCBu_zMUVFcIgZwBj3Eg5Ooa7lSNZ1So2gR36KljNh1vLT6Kr6Xs1mk9I1xdfcQ8y6w_w9eZ395oAFbkZkkfmelsbFiPgquq30gnK8VHyPpcasBwjj6h19DZXEjIaaWgp5vk6npHOMFsaliYY2-sxyUnhG3rEcIXHSNebihUVnawAqslqSS2FXunLEwexbEQXAiTErPDXwNfer40q7oecMvJ8NMlkiHZSmMgWb8E" />
                                <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Bestseller</span>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-bold text-primary uppercase">Development</span>
                                    <span className="text-slate-300 dark:text-slate-600">•</span>
                                    <div className="flex items-center text-amber-500">
                                        <span className="material-symbols-outlined text-[16px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="text-xs font-bold ml-1">4.9 (2.3k)</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 dark:text-white line-clamp-2">Complete Full-Stack Web Developer Roadmap 2024</h3>
                                <div className="flex items-center gap-3 mb-6">
                                    <img alt="Instructor" className="w-8 h-8 rounded-full border-2 border-slate-100 dark:border-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMk8G6PYw-1HLKeJGbW3AJoUjrSCrHqCuAke3SPr7YWK2SOlkXeCnovrJn-J_CxkF6pvDGzd90-ZHL8k6Hr1p53vGynfMHe_dpybKcxk2-r75ykzScgcNmZJMGTSSc5ctmGGJydEyaG78WrQI1LaBdFF-cBhrRHK4-gq1I1Q8EF-EoRTlTIjcaemo_gF06-xTYP3h7xEivXcNfxqZJ1ujrp1S73pUv4Vx5gVCqf815qfjbLBYTNaE9Y3UdjbcTAuuvmdjQoeXr1Kw" />
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Dr. Sarah Connor</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-extrabold text-slate-900 dark:text-white">$89.99</span>
                                        <span className="text-slate-400 line-through text-sm">$129.99</span>
                                    </div>
                                    <button className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-900 dark:text-white hover:bg-primary hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">add_shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Course Card 2 */}
                        <div className="course-card bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="relative">
                                <img alt="Data Science" className="w-full aspect-video object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv20YKhC1ZIkh24eWEXShHLsPuT0QMsKRiOm0xcjyGL-OZs7zFRU1yU4iRuiKbcfAZZK-7qYsXP_WeelzeXYKo6rzpRDr7iaZLJ7u8YR086D4ONRd8OyNV32F3SXCErGiuxI8yNdlrT_Gr5LM7zVGAHJcMhxWKD8dZ2BW6eJhf4Nd_lTM647gmltSTo1qYr2R9bYCIfKda_024UySW0F7DI4WUEO3RK4ilNNnOp7WIczNw-K1DChAerFMPLq6uy9Fu14zRCH6ZtyI" />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-bold text-primary uppercase">Business</span>
                                    <span className="text-slate-300 dark:text-slate-600">•</span>
                                    <div className="flex items-center text-amber-500">
                                        <span className="material-symbols-outlined text-[16px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="text-xs font-bold ml-1">4.8 (1.5k)</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 dark:text-white line-clamp-2">Modern Data Analytics with Python & SQL</h3>
                                <div className="flex items-center gap-3 mb-6">
                                    <img alt="Instructor" className="w-8 h-8 rounded-full border-2 border-slate-100 dark:border-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnDvugluzogScvg6ttv1ayulzPnYvXAqPkDpG6MQHDvEC-yvb4AuXAHDMxTkQ5E5gBjLkmAb2CRuSt87vpkRNr01wZz3at7V2gCB6PVSx6zh4nW1P-_22kckjEHOu15L3H4aGpGrMuqFzzPaMrDhn7blTwPhPtkhWaG5eFJ7V9st5M-QuaQlYrMPkt5tD3ERF6Dy_D2GipIWocAgrh1Ibo5NN7tNkSen83dReApAoOZuQRRiOuWfweSM0FNDDq-0UK72FPWWeTPNA" />
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Marco Rossi</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-extrabold text-slate-900 dark:text-white">$74.99</span>
                                        <span className="text-slate-400 line-through text-sm">$99.99</span>
                                    </div>
                                    <button className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-900 dark:text-white hover:bg-primary hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">add_shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Course Card 3 */}
                        <div className="course-card bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="relative">
                                <img alt="UI/UX Design" className="w-full aspect-video object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbBoSfJdigKEcxTeyVsVekEGjKj2v89heqANTAUQXaOKBYpp9Ai0ZPMTNqvD1nCDUSvYbPc6ajXpHN724OVlppVb91ygfT2LhsOZGau3Kh7VLV4GAWEEgjI-WQnrpn0UkhR-vCXbI_QAQfeSvT5z5E6BSTts7wlVoYxCNWlYM0W43aH-1eSIT892BnpegTzbXw6IFCxwQUTSQPbqZLzzfIMsTeCf-e9lDACuVyvqPOKIrGhbTOdfhdaI4A174zlKxepq-SashZpb0" />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-bold text-primary uppercase">Design</span>
                                    <span className="text-slate-300 dark:text-slate-600">•</span>
                                    <div className="flex items-center text-amber-500">
                                        <span className="material-symbols-outlined text-[16px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="text-xs font-bold ml-1">5.0 (890)</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 dark:text-white line-clamp-2">Ultimate UI/UX Masterclass: From Zero to Pro</h3>
                                <div className="flex items-center gap-3 mb-6">
                                    <img alt="Instructor" className="w-8 h-8 rounded-full border-2 border-slate-100 dark:border-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARjOewKuHpIkjthkJiPDuRaqEAG0FkjMLJky8HNOkfC5-ecrbFdMYti3dnGs3RavmOtzLcmJnRk09wzpDUh-bbxIRs8weWvG85jHezDiEE0IWCN-KQhLeZ_aH2yArv_eaeye36qqrZxvxF1t9gpgAQifsh8Any9wXDZGwr8jN3md8uR85663oY64zXieTVuXs7M2hQeHjwTOWI1gwz4p0yoSVvf9ci_tnmwg6FFzFUqdb5wOgP9ax3orIu-yWRELntk_15gq7ixcg" />
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Elena Joy</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-extrabold text-slate-900 dark:text-white">$94.99</span>
                                        <span className="text-slate-400 line-through text-sm">$150.00</span>
                                    </div>
                                    <button className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-900 dark:text-white hover:bg-primary hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">add_shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 text-center">
                        <button className="px-10 py-4 border-2 border-primary text-primary font-bold rounded-2xl hover:bg-primary hover:text-white transition-all">
                            Browse All 1,200+ Courses
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
                        <div>
                            <div className="text-4xl lg:text-5xl font-extrabold mb-2">500k+</div>
                            <p className="text-indigo-100 font-medium">Active Students</p>
                        </div>
                        <div>
                            <div className="text-4xl lg:text-5xl font-extrabold mb-2">15k+</div>
                            <p className="text-indigo-100 font-medium">Expert Instructors</p>
                        </div>
                        <div>
                            <div className="text-4xl lg:text-5xl font-extrabold mb-2">1.2k+</div>
                            <p className="text-indigo-100 font-medium">Premium Courses</p>
                        </div>
                        <div>
                            <div className="text-4xl lg:text-5xl font-extrabold mb-2">4.8/5</div>
                            <p className="text-indigo-100 font-medium">Average Rating</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative bg-slate-900 dark:bg-slate-800 rounded-[3rem] p-10 lg:p-20 flex flex-col items-center text-center overflow-hidden">
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[80px] rounded-full"></div>
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full"></div>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 relative z-10">
                            Ready to Start Your Learning Journey?
                        </h2>
                        <p className="text-slate-300 text-lg lg:text-xl max-w-2xl mb-10 relative z-10">
                            Get unlimited access to over 1,000 top-rated courses for just $19/month. Cancel anytime.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                            <button className="px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
                                Get Started for Free
                            </button>
                            <button className="px-10 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/10 backdrop-blur-sm">
                                View Pricing
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="pt-24 pb-12 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined text-sm">school</span>
                                </div>
                                <span className="text-xl font-bold dark:text-white">EduFlow</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs">
                                Empowering learners worldwide through quality education and expert-led content.
                            </p>
                            <div className="flex gap-4">
                                <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-colors" href="#">
                                    <span className="material-symbols-outlined">facebook</span>
                                </a>
                                <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-colors" href="#">
                                    <span className="material-symbols-outlined">alternate_email</span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 dark:text-white">Platform</h4>
                            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
                                <li><a className="hover:text-primary transition-colors" href="#">Browse Courses</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Mentors</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 dark:text-white">Company</h4>
                            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
                                <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 dark:text-white">Support</h4>
                            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
                                <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">API Docs</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Community</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-sm text-slate-500">© 2024 EduFlow Learning Inc. All rights reserved.</p>
                        <div className="flex gap-8 text-sm text-slate-500">
                            <a className="hover:text-primary" href="#">English</a>
                            <a className="hover:text-primary" href="#">USD ($)</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
