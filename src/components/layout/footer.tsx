"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

import { usePlantInfo } from "@/context/plant-info-context";
import { cn } from "@/lib/utils";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.86 5.86 0 0 0-2.13 1.38A5.86 5.86 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.38 2.13.67.65 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.38 5.86 5.86 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
  </svg>
);

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  className?: string;
  brandName?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: { text: string; url: string }[];
}

const Footer = ({
  className,
  brandName,
  tagline,
  menuItems = [
    {
      title: "Information",
      links: [
        { text: "Office Address", url: "#" },
        { text: "Shipping and Returns", url: "#" },
        { text: "About Us", url: "#" },
        { text: "Terms and Conditions", url: "#" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { text: "Contact Us", url: "#" },
        { text: "Help Center", url: "#" },
        { text: "Track Your Order", url: "#" },
        { text: "FAQs", url: "#" },
      ],
    },
    {
      title: "My Account",
      links: [
        { text: "Sign In", url: "/login" },
        { text: "Register", url: "/register" },
        { text: "Order History", url: "#" },
        { text: "Wishlist", url: "#" },
      ],
    },
    {
      title: "Pay With",
      links: [
        { text: "Cash on Delivery", url: "#" },
        { text: "Bkash", url: "#" },
        { text: "Nagad", url: "#" },
        { text: "Card Payment", url: "#" },
      ],
    },
  ],
  copyright,
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
    { text: "Cookie Policy", url: "#" },
  ],
}: FooterProps) => {
  const { plant } = usePlantInfo();

  const resolvedBrandName = brandName ?? plant?.PlantName ?? "Happy Mart";
  const resolvedTagline =
    tagline ?? plant?.Remarks?.split("\n")[0] ?? "Your one-stop shop for everything!";
  const resolvedAddress = plant?.PlantAddress ?? "House 12, Road 5, Dhaka 1205, Bangladesh";
  const resolvedPhone = plant?.PlantPhone ?? "+880 1700-000000";
  const resolvedEmail = plant?.PlantEmail ?? "support@happymart.com";
  const resolvedCopyright =
    copyright ?? `© ${new Date().getFullYear()} ${resolvedBrandName}. All rights reserved.`;

  const socialLinks = [
    { icon: FacebookIcon, url: "#", label: "Facebook" },
    { icon: InstagramIcon, url: "#", label: "Instagram" },
    { icon: TwitterIcon, url: "#", label: "Twitter" },
    { icon: YoutubeIcon, url: "#", label: "YouTube" },
  ];

  return (
    <footer
      className={cn(
        "bg-zinc-900 text-zinc-300 dark:bg-black dark:text-zinc-300",
        className,
      )}
    >
      <div className="container mx-auto px-4 pt-10 sm:pt-16 pb-8">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 mb-2 lg:mb-0">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-extrabold tracking-tight text-white">
                {resolvedBrandName}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              {resolvedTagline}
            </p>

            {/* Contact Info */}
            <ul className="mt-6 space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                <span>{resolvedAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-primary" />
                <a href={`tel:${resolvedPhone}`} className="hover:text-white">
                  {resolvedPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand-primary" />
                <a
                  href={`mailto:${resolvedEmail}`}
                  className="hover:text-white"
                >
                  {resolvedEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Menu Sections */}
          {menuItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.url}
                      className="text-zinc-400 transition-colors hover:text-white"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social + Newsletter Strip */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-zinc-800 pt-8 md:flex-row md:items-center">
          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-colors hover:bg-brand-primary hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-sm text-zinc-400">
            <span className="font-semibold text-white">24/7 Support:</span>{" "}
            8am to 10pm everyday
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-zinc-800 pt-6 text-sm text-zinc-500 md:flex-row md:items-center">
          <p>{resolvedCopyright}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {bottomLinks.map((link, linkIdx) => (
              <li key={linkIdx}>
                <a
                  href={link.url}
                  className="transition-colors hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
