import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="py-4 px-6 bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          DockerScale
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="#features" className="text-gray-600 hover:text-blue-600">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-blue-600">
            Pricing
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-600 hover:text-blue-600"
          >
            Testimonials
          </Link>
        </nav>
        <div className="flex space-x-2">
          <Link href="/ClientSide/login" passHref>
            <Button variant="outline">Log In</Button>
          </Link>
          <Link href="/ClientSide/register" passHref>
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
