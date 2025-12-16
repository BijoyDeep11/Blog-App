import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-16 bg-gray-50 border-t border-gray-200 font-sans">
      <div className="relative z-10 w-full px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand (Spans 2 cols on large screens if you want, or just 1) */}
          <div className="lg:col-span-1">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4">
                <div className="inline-flex items-center">
                  <Logo width="100px" />
                </div>
                <p className="mt-6 text-base text-gray-500 leading-relaxed">
                   Designed for clarity. Built for performance.
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">
                  &copy; 2024 Scribe.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Company */}
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

          {/* Column 3: Support */}
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

          {/* Column 4: Legals */}
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
    </section>
  )
}

export default Footer