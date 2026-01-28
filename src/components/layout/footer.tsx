import { cn } from "@/lib/utils";

import { Logo, LogoImage, LogoText } from "@/components/layout/logo";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  logo = {
    src: "/logo.png",
    alt: "Happy Mart",
    title: "",
    url: "",
  },
  className,
  tagline = "Your one-stop shop for everything!",
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
      links: [{ text: "Contact Us", url: "#" }],
    },
    {
      title: "My Account",
      links: [
        // { text: "Help", url: "#" },
        // { text: "Sales", url: "#" },
        // { text: "Advertise", url: "#" },
      ],
    },
    {
      title: "Pay With",
      links: [
        { text: "Cash on Delivery", url: "#" },
        { text: "Bkash", url: "#" },
        { text: "Nagad", url: "#" },
      ],
    },
  ],
  copyright = "© 2026 Happy Mart. All rights reserved.",
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: FooterProps) => {
  return (
    <section className={cn("pt-14 pb-6 ", className)}>
      <div className="container mx-auto px-4">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 ">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Logo url="">
                  <LogoImage
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-44 dark:invert"
                  />
                  <LogoText className="text-xl">{logo.title}</LogoText>
                </Logo>
              </div>
              <p className="mt-12 font-bold">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8  flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
