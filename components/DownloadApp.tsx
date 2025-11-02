
import React from 'react';

const DownloadApp: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl" id="download-app-heading">
            Your travel partner on the go
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-gray-500">
            Book flights and hotels, manage your trips, and get exclusive mobile-only deals with our app.
          </p>
          <div className="mt-8 flex space-x-4">
            <a href="#" className="inline-block">
              <img className="h-12" src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" />
            </a>
            <a href="#" className="inline-block">
              <img className="h-12" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" />
            </a>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8 lg:flex-shrink-0">
          <img className="h-48 w-48 rounded-lg shadow-md" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.almosafer.com" alt="QR Code for app download" />
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
