import Link from "next/link";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">DockerScale</h3>
            <p className="text-gray-400">
              Effortless Docker Execution at Scale
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-gray-400 hover:text-white"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-400 hover:text-white"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-gray-400 hover:text-white"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Github className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} DockerScale. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
