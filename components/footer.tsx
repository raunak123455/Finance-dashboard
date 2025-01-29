import { Mail, Twitter, Instagram, Linkedin, Square } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#f3f6ff] px-6 py-12">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Unanswered Queries?</h2>
          <p className="text-gray-600">Reach us out at hi@moneyy.ai</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div className="flex gap-2">
                <span className="font-semibold">Moneyy.ai</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Automate Investing or Trading with our AI strategies, Backtest
              Your Idea, and stay informed with real-time market insights.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  AI Strategies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Backtesting
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Market feed
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Learn
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Risk Disclosure
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <Link
                  href="mailto:hi@moneyy.ai"
                  className="text-gray-600 hover:text-gray-900"
                >
                  hi@moneyy.ai
                </Link>
              </li>
              <li className="text-gray-600">India</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4">Social</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">Other Platform</span>
                <Square className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-600 border-t border-gray-200 pt-8">
          © 2025 Moneyy.ai Pvt Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
