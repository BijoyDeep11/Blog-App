import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-16 bg-gray-50 border-t border-gray-200 font-sans">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="-m-6 flex flex-wrap">
          
          {/* Brand Column */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-8">
                {/* Logo matches the header now (no inversion) */}
                <div className="inline-flex items-center">
                  <Logo width="100px" />
                </div>
                <p className="mt-6 text-base text-gray-500 leading-relaxed max-w-sm">
                   Designed for clarity. Built for performance. The modern way to publish your best ideas.
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">
                  &copy; 2024 DevUI. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Links Section - Using a Grid Layout for better alignment */}
          <div className="w-full p-6 md:w-1/2 lg:w-7/12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              
              {/* Column 1 */}
              <div>
                <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gray-900 font-sans">
                  Company
                </h3>
                <ul className="space-y-4">
                  {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item) => (
                    <li key={item}>
                      <Link
                        className="text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-black hover:underline underline-offset-4"
                        to="/"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2 */}
              <div>
                <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gray-900 font-sans">
                  Support
                </h3>
                <ul className="space-y-4">
                  {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item) => (
                    <li key={item}>
                      <Link
                        className="text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-black hover:underline underline-offset-4"
                        to="/"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gray-900 font-sans">
                  Legals
                </h3>
                <ul className="space-y-4">
                  {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item) => (
                    <li key={item}>
                      <Link
                        className="text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-black hover:underline underline-offset-4"
                        to="/"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer