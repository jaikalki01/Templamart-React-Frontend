// ContactPage.jsx
import React from "react";
import { Helmet } from "react-helmet-async";


const Contact = () => {
  return (

    <>
      {/* Meta Tags for SEO */}
      <Helmet>
        <title>Contact Us - TemplaMart</title>
        <meta
          name="description"
          content="Get in touch with TemplaMart – the B2B marketplace for website templates. Contact us for support, seller inquiries, or partnership opportunities."
        />
        <meta
          name="keywords"
          content="TemplaMart contact, template marketplace support, become a seller, web design help"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Contact Us - TemplaMart" />
        <meta
          property="og:description"
          content="Reach out to TemplaMart for seller support, business inquiries, or general help regarding website templates."
        />
        <meta property="og:image" content="https://www.templamart.com/assets/templamart-logo.png" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:title" content="Contact Us - TemplaMart" />
        <meta
          name="twitter:description"
          content="Reach out to TemplaMart for seller support, business inquiries, or general help regarding website templates."
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.templamart.com/contact" />

        {/* Schema Markup of contact */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Us",
            "description": "Contact TemplaMart for seller support, partnerships, and inquiries.",
            "url": "https://www.templamart.com/Contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "TemplaMart",
              "url": "https://www.templamart.com",
              "logo": "https://www.templamart.com/assets/templamart-logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91 9136914963",
                "email": "contact@templamart.com",
                "contactType": "Customer Support",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi"]
              }
            }
          })}
        </script>

        {/* BreadCrumb schema */}

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.templamart.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Contact Us",
                item: "https://www.templamart.com/contact",
              },
            ],
          })}
        </script>

        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "TemplaMart",
            "logo": "https://www.templamart.com/assets/templamart-logo.png",
            "image": "https://www.templamart.com/assets/templamart-logo.png",
            "url": "https://www.templamart.com",
            "telephone": "+91 9136914963",
            "email": "contact@templamart.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Sh N B1/A Grd Flr Mahavir, Ngr",
              "addressLocality": "Deepak Hospital, Mira Road",
              "addressRegion": "Thane",
              "postalCode": "401107",
              "addressCountry": "IN"
            },
          }
        `}
        </script>

      </Helmet>



      {/* Your contact page content */}

      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Address</h2>
              <p>   Sh N B1/A Grd Flr Mahavir,<br /> Ngr,

                Deepak Hospital, Mira Road,<br /> Thane,

                Maharashtra - 401107</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Phone</h2>
              <p><a href="tel:9136914963">+91 91 369 14 963</a></p>
              <p><a href="tel:2235039927">+91 22 350 399 27</a></p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Email</h2>
              <p>contact@templamart.com</p>
            </div>
          </div>

          {/* Google Map */}
          <div>
            <iframe
              title="Jaikalki Technology Location"
              className="w-full h-64 rounded-xl shadow-md border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.6364750560297!2d72.86413107425768!3d19.298168644962143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1a675c13bbd%3A0xe736cc973d82f656!2sJaikalki%20Technology!5e0!3m2!1sen!2sin!4v1745051661578!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
