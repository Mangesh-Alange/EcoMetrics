import Link from "next/link";
import { Globe, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="w-full bg-secondary text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Story */}
          <div className="space-y-6">
            <Logo variant="dark" />
            <p className="text-blue-100/70 text-sm leading-relaxed max-w-xs">
              EcoMetric EES is Pune&apos;s premier destination for hands-on engineering training. 
              We bridge the gap between classroom theory and industrial excellence since 2018.
            </p>
            <div className="flex gap-4">
                {[
                  { icon: Globe, href: "#" },
                  { icon: Globe, href: "#" },
                  { icon: Globe, href: "#" },
                  { icon: Globe, href: "#" },
                ].map((social, i) => (
                  <Link 
                    key={i} 
                    href={social.href} 
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Courses", href: "/courses" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy Policy", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-blue-100/60 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-blue-100/70">EES, Indrayani Nagar, Bhosari, Pune - 411039</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-blue-100/70">9689525659</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-blue-100/70">ecometric2023@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Join Our Community</h3>
            <p className="text-sm text-blue-100/70">
              Subscribe to stay updated on new workshops and upcoming industrial seminars.
            </p>
            <div className="flex bg-white/5 rounded-xl border border-white/10 p-1">
               <input 
                type="email" 
                placeholder="Your email" 
                className="bg-transparent border-none focus:ring-0 px-3 text-sm flex-grow"
               />
               <button className="bg-primary px-4 py-2 rounded-lg text-white font-bold text-xs hover:bg-primary/80 transition-colors">
                 Join
               </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-blue-100/40">
          <p>© {new Date().getFullYear()} EcoMetric Engineering Solutions. All rights reserved.</p>
          <div className="flex gap-6">
              <Link href="#" className="hover:text-white">Terms of Service</Link>
              <Link href="#" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
