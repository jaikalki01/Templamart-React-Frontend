// src/DefaultMeta.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const DefaultMeta: React.FC = () => {
    return (
        <Helmet>
            {/* --- Standard SEO Tags --- */}
            <title>TemplaMart – Buy & Sell Website Templates</title>
            <meta
                name="description"
                content="TemplaMart is a B2B marketplace where you can upload and sell website templates, UI kits, graphics, presentations, and more."
            />
            <meta
                name="keywords"
                content="website templates, UI kits, sell templates, presentation templates, design marketplace"
            />
            <meta
                property="og:title"
                content="TemplaMart – Buy & Sell Website Templates"
            />
            <meta
                property="og:description"
                content="B2B Marketplace for website templates, UI kits, graphics, and more. Become a seller or browse stunning designs."
            />
            <meta
                property="og:image"
                content="https://www.templamart.com/assets/templamart-logo.png" // Update this
            />
            <meta name="twitter:title" content="TemplaMart – Buy & Sell Website Templates" />
            <meta name="twitter:description" content="Upload and sell website templates, UI kits, and more at TemplaMart." />
            <link rel="canonical" href="https://www.templamart.com" />

            {/* --- WebSite Schema --- */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "TemplaMart",
                    "url": "https://www.templamart.com",
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://www.templamart.com/search?q={search_term_string}",
                        "query-input": "required name=search_term_string"
                    }
                })}
            </script>

            {/* --- Organization Schema --- */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "TemplaMart",
                    "url": "https://www.templamart.com",
                    "logo": "https://www.templamart.com/assets/templamart-logo.png", // Replace with actual logo

                })}
            </script>


            {/* --- Google Analytics --- */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-SZ52PD17X3"></script>
            <script>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-SZ52PD17X3');
                `}
            </script>

            {/* --- Google Search Console --- */}
            <meta
                name="google-site-verification"
                content="iha4-4nRemDXGxVt1HydSJjB4i0FY9lyaM7FSMJrUyQ"
            />


        </Helmet>
    );
};

export default DefaultMeta;
