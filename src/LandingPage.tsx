import React from 'react';
import { Search, Moon, ShoppingCart, Star, Award, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-[#2D2D2D]">
      
      {/* Navigation*/}
      <nav className="flex items-center justify-between px-10 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#5E81AC] rounded-lg flex items-center justify-center">
              <Award className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#2E3440]">STUDUY</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-gray-600 font-medium">
            <a href="#" className="hover:text-[#5E81AC]">Categories</a>
            <a href="#" className="hover:text-[#5E81AC]">Courses</a>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-10">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search courses, instructors, or skills..." 
              className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-[#5E81AC] text-sm"
            />
            <Search className="absolute left-4 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Moon className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="text-gray-700 font-medium hover:text-[#5E81AC]">Sign In</button>
          <button className="bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-all">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-10 py-16 flex flex-col md:flex-row items-center justify-between bg-[#F8FAFC]">
        <div className="md:w-1/2 space-y-6">
          <span className="bg-white px-4 py-1.5 rounded-full text-[#5E81AC] text-sm font-bold shadow-sm border border-blue-50">
            UNLOCK YOUR POTENTIAL
          </span>
          <h1 className="text-6xl font-extrabold leading-tight text-[#2E3440]">
            Learn without <br /> limits
          </h1>
          <p className="text-gray-500 text-lg max-w-md">
            Build skills with courses, certificates and degrees online from world-class universities and companies.
          </p>
          <div className="flex items-center space-x-4 pt-4">
            <div className="relative w-64">
              <input type="text" placeholder="What do you want to learn today?" className="w-full border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#5E81AC]" />
            </div>
            <button className="bg-[#5E81AC] text-white px-8 py-3 rounded-lg font-bold flex items-center hover:bg-[#4C6A8D] transition-all">
              Get started <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 relative">
          <img src="/img/hero-image.png" alt="Student using laptop" className="rounded-2xl shadow-2xl relative z-10" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#88C0D0] opacity-20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-b border-gray-100">
        {[
          { label: 'Active Students', val: '500k+' },
          { label: 'Expert Instructors', val: '15k+' },
          { label: 'Premium Courses', val: '1.2k+' },
          { label: 'Average Rating', val: '4.8/5' }
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-4xl font-bold text-[#2E3440] mb-1">{stat.val}</div>
            <div className="text-gray-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Trusted Companies - Đã sửa size chữ và logo */}
      <section className="px-10 py-16 text-center">
        <h3 className="text-[20px] font-semibold text-[#5E81AC] mb-10">
          Trusted by leading companies in worldwide
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all">
          <img src="/img/google.png" alt="Google" className="h-10 md:h-12" />
          <img src="/img/microsoft.png" alt="Microsoft" className="h-10 md:h-12" />
          <img src="/img/cisco.png" alt="Cisco" className="h-10 md:h-12" />
          <img src="/img/samsung.png" alt="Samsung" className="h-10 md:h-12" />
          <img src="/img/apple.png" alt="Apple" className="h-10 md:h-12" />
          <img src="/img/toshiba.png" alt="Toshiba" className="h-10 md:h-12" />
        </div>
      </section>
        <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Top Categories</h2>
              <p className="text-slate-600 text-xl">Explore the most popular fields and start your journey.</p>
            </div>
            <a className="text-[#5e81ac] font-bold flex items-center gap-1 hover:underline" href="#">
              View all categories
              <svg className="w-[10.5px] h-[10.5px]" fill="currentColor" viewBox="0 0 10.5 10.5">
                <path d={svgPaths.p32ab500} />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <a className="group p-8 rounded-3xl bg-[#f8fafc] border border-[#f1f5f9] hover:border-[#5e81ac] transition-all text-center" href="#">
              <div className="w-16 h-16 bg-gradient-to-r from-[#5e81ac] to-[#81a1c1] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-[30px] h-[18px] text-white" fill="currentColor" viewBox="0 0 30 18">
                  <path d={svgPaths.p1ee5bcc0} />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2 text-slate-900">Development</h3>
            </a>
            <a className="group p-8 rounded-3xl bg-[#f8fafc] border border-[#f1f5f9] hover:border-[#5e81ac] transition-all text-center" href="#">
              <div className="w-16 h-16 bg-gradient-to-r from-[#81a1c1] to-[#88c0d0] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-[26px] h-[26px] text-white" fill="currentColor" viewBox="0 0 26 26">
                  <path d={svgPaths.pc365a00} />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2 text-slate-900">IT & Software</h3>
            </a>
            <a className="group p-8 rounded-3xl bg-[#f8fafc] border border-[#f1f5f9] hover:border-[#5e81ac] transition-all text-center" href="#">
              <div className="w-16 h-16 bg-gradient-to-l from-[#88c0d0] to-[#8fbcbb] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-[26px] h-[26px] text-white" viewBox="0 0 26 26">
                  <g stroke="white" strokeWidth="1.5" fill="none">
                    <path d={svgPaths.p16876780} strokeLinecap="round" />
                    <path d={svgPaths.p21326d00} />
                    <path d={svgPaths.pa982000} />
                    <path d={svgPaths.p8151280} />
                  </g>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2 text-slate-900">Design</h3>
            </a>
            <a className="group p-8 rounded-3xl bg-[#f8fafc] border border-[#f1f5f9] hover:border-[#5e81ac] transition-all text-center" href="#">
              <div className="w-16 h-16 bg-gradient-to-r from-[#8fbcbb] to-[#88c0d0] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-[30px] h-[24px] text-white" fill="currentColor" viewBox="0 0 30 24">
                  <path d={svgPaths.p24bb7f00} />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2 text-slate-900">Marketing</h3>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Featured Courses</h2>
              <p className="text-slate-600 text-xl">Learn from the best in the industry.</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 border border-[#e2e8f0] rounded-lg hover:bg-slate-100 transition-colors">
                <svg className="w-[7.4px] h-3" fill="#0F172A" viewBox="0 0 7.4 12">
                  <path d={svgPaths.p3ed0080} />
                </svg>
              </button>
              <button className="p-2 border border-[#e2e8f0] rounded-lg hover:bg-slate-100 transition-colors">
                <svg className="w-[7.4px] h-3" fill="#0F172A" viewBox="0 0 7.4 12">
                  <path d={svgPaths.p28c84800} />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course Card 1 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-video">
                <img alt="HTML for Beginners" className="w-full h-full object-cover" src={imgCourse1} />
                <span className="absolute top-4 left-4 bg-[#6366f1] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Bestseller
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#6366f1] uppercase">Development</span>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center text-amber-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 13 13">
                      <path d={svgPaths.p1ec12500} />
                    </svg>
                    <span className="text-xs font-bold ml-1">4.9 (2.3k)</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 line-clamp-2">
                  HTML for Beginners
                </h3>
                <div className="flex items-center gap-3 mb-6">
                  <img alt="Instructor" className="w-8 h-8 rounded-full border-2 border-slate-100" src={imgInstructor1} />
                  <span className="text-sm font-medium text-slate-600">Dr. Sarah Connor</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#6366f1] uppercase block mb-1">Free</span>
                  </div>
                  <button className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 hover:bg-[#5e81ac] hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 22 22">
                      <path d={svgPaths.p29567c00} />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-video">
                <img alt="Modern Data Analytics with Python & SQL" className="w-full h-full object-cover" src={imgCourse2} />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#6366f1] uppercase">Business</span>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center text-amber-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 13 13">
                      <path d={svgPaths.p1ec12500} />
                    </svg>
                    <span className="text-xs font-bold ml-1">4.8 (1.5k)</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 line-clamp-2">
                  Modern Data Analytics with Python & SQL
                </h3>
                <div className="flex items-center gap-3 mb-6">
                  <img alt="Instructor" className="w-8 h-8 rounded-full border-2 border-slate-100" src={imgInstructor2} />
                  <span className="text-sm font-medium text-slate-600">Marco Rossi</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-slate-900">$29.99</span>
                  </div>
                  <button className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 hover:bg-[#5e81ac] hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 22 22">
                      <path d={svgPaths.p29567c00} />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-video">
                <img alt="Ultimate UI/UX Masterclass" className="w-full h-full object-cover" src={imgCourse3} />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#6366f1] uppercase">Design</span>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center text-amber-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 13 13">
                      <path d={svgPaths.p1ec12500} />
                    </svg>
                    <span className="text-xs font-bold ml-1">5.0 (890)</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 line-clamp-2">
                  Ultimate UI/UX Masterclass: From Zero to Pro
                </h3>
                <div className="flex items-center gap-3 mb-6">
                  <img alt="Instructor" className="w-8 h-8 rounded-full border-2 border-slate-100" src={imgInstructor3} />
                  <span className="text-sm font-medium text-slate-600">Elena Joy</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-slate-900">$45.99</span>
                  </div>
                  <button className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 hover:bg-[#5e81ac] hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 22 22">
                      <path d={svgPaths.p29567c00} />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button className="px-10 py-4 border-2 border-[#5e81ac] text-[#5e81ac] font-bold rounded-2xl hover:bg-[#5e81ac] hover:text-white transition-all">
              View All Courses
            </button>
          </div>
        </div>
      </section>
      {/* How it works - Đã sửa mục 3 và Icon */}
      <section className="px-10 py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How it works</h2>
          <p className="text-gray-500">Start learning in three simple steps and transform your career</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-[#5E81AC]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-[#5E81AC]" />
            </div>
            <div className="bg-[#5E81AC] text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto font-bold mb-4">1</div>
            <h4 className="text-xl font-bold">Browse & Choose</h4>
            <p className="text-gray-500">Explore thousands of courses and find the perfect fit for your learning goals</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-[#88C0D0]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#88C0D0] border-b-[12px] border-b-transparent ml-1"></div>
            </div>
            <div className="bg-[#5E81AC] text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto font-bold mb-4">2</div>
            <h4 className="text-xl font-bold">Learn & Practice</h4>
            <p className="text-gray-500">Access high-quality video lessons, exercises, and real-world projects</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-[#A3BE8C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-[#A3BE8C]" />
            </div>
            <div className="bg-[#5E81AC] text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto font-bold mb-4">3</div>
            <h4 className="text-xl font-bold text-[#2E3440]">Earn & Grow</h4>
            <p className="text-gray-500">Get certified and showcase your new skills to advance your career</p>
          </div>
        </div>
      </section>

      {/* Testimonials - Đã thêm 5 sao */}
      <section className="px-10 py-20 bg-[#F8FAFC]">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-[#2E3440]">What our students say</h2>
          <p className="text-gray-500">Join millions of learners achieving their goals</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Emily Rodriguez", role: "Digital Marketing Manager", text: "The marketing courses here are incredible. I learned practical strategies that I could immediately apply to my business. Highly recommended!" },
            { name: "James Anderson", role: "Software Engineer", text: "Studuy transformed my career. The web development course gave me the skills I needed to land my dream job." },
            { name: "Sarah Chen", role: "UX Designer", text: "As a career changer, Studuy made the transition smooth. The design courses are comprehensive, and the community support is amazing." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img src={`/img/student-${i+1}.png`} alt={item.name} />
                </div>
                <div>
                  <h5 className="font-bold text-[#2E3440]">{item.name}</h5>
                  <p className="text-xs text-gray-500 font-medium">{item.role}</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, starIdx) => <Star key={starIdx} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic">"{item.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Đã sửa mã màu và text */}
      <section className="px-10 py-16">
        <div 
          className="rounded-3xl p-12 text-center text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, #5E81AC 0%, #88C0D0 100%)` }}
        >
          <h2 className="text-4xl font-bold mb-4">Try 3 months of Premium Access for $84.</h2>
          <p className="text-blue-50 mb-10 text-lg">Only $35/month after. Cancel anytime.</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-12">
            <button className="bg-white text-[#5E81AC] px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg">
              Try 3 months for $84
            </button>
            <button className="bg-transparent border-2 border-white/40 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
              View All plans
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto pt-6 border-t border-white/20">
            {[
              "Access to 220K+ courses",
              "Download for offline learning",
              "Certificates of completion",
              "15% off first payment"
            ].map((feature, i) => (
              <div key={i} className="flex items-center justify-center space-x-2 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Đã sửa brand name */}
      <footer className="px-10 py-16 bg-white border-t border-gray-100">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#5E81AC] rounded-lg flex items-center justify-center">
                <Award className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#2E3440]">STUDUY</span>
            </div>
            <p className="text-gray-500 max-w-xs">
              Empowering learners worldwide through quality education and expert-led content.
            </p>
          </div>
          <div>
            <h6 className="font-bold mb-6 text-[#2E3440]">Platform</h6>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li className="hover:text-[#5E81AC] cursor-pointer">Browse Courses</li>
              <li className="hover:text-[#5E81AC] cursor-pointer">Mentors</li>
              <li className="hover:text-[#5E81AC] cursor-pointer">Pricing</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-6 text-[#2E3440]">Company</h6>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li className="hover:text-[#5E81AC] cursor-pointer">About Us</li>
              <li className="hover:text-[#5E81AC] cursor-pointer">Contact</li>
              <li className="hover:text-[#5E81AC] cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-6 text-[#2E3440]">Support</h6>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li className="hover:text-[#5E81AC] cursor-pointer">Help Center</li>
              <li className="hover:text-[#5E81AC] cursor-pointer">Terms of Service</li>
              <li className="hover:text-[#5E81AC] cursor-pointer">Community</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs font-medium">
          <p>© 2026 EduFlow Learning Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>English</span>
            <span>USD ($)</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
