
import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from './icons/SocialIcons';

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <a href={href} className="text-gray-500 hover:text-gray-900 transition-colors duration-200">
      {children}
    </a>
  </li>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">About Us</h3>
            <ul className="mt-4 space-y-4">
              <FooterLink href="#">Our Company</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Press</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <FooterLink href="#">Contact Us</FooterLink>
              <FooterLink href="#">FAQs</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Explore</h3>
            <ul className="mt-4 space-y-4">
              <FooterLink href="#">Destinations</FooterLink>
              <FooterLink href="#">Travel Guides</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Connect</h3>
            <div className="flex mt-4 space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Facebook</span><FacebookIcon /></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Instagram</span><InstagramIcon /></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Twitter</span><TwitterIcon /></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">LinkedIn</span><LinkedinIcon /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-500 text-center">&copy; {new Date().getFullYear()} Travel.io, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
