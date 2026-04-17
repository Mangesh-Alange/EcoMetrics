"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {isLoaded && (
            isSignedIn ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-base font-medium hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link href="/my-courses" className="text-base font-medium hover:text-primary transition-colors">
                  My Courses
                </Link>
                <Link href="/profile" className="text-base font-medium hover:text-primary transition-colors">
                  Profile
                </Link>
                <SignOutButton>
                  <Button variant="outline" size="sm">Sign Out</Button>
                </SignOutButton>
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button size="sm">Get Started</Button>
              </SignInButton>
            )
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {isLoaded && isSignedIn && (
            <>
              <Link href="/dashboard" className="block text-lg font-medium" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
              <Link href="/my-courses" className="block text-lg font-medium" onClick={() => setIsOpen(false)}>
                My Courses
              </Link>
              <Link href="/profile" className="block text-lg font-medium" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
            </>
          )}
          <div className="pt-4 border-t">
            {isLoaded && (
              isSignedIn ? (
                <SignOutButton>
                  <Button className="w-full">Sign Out</Button>
                </SignOutButton>
              ) : (
                <SignInButton mode="modal">
                  <Button className="w-full">Get Started</Button>
                </SignInButton>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
