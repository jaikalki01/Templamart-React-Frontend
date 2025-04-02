const LicenseAgreement = () => {
    return (
        <div className="container mx-auto p-6 max-w-[80rem] bg-gray-300 rounded-[30px] mt-[30px] mb-[30px] shadow-[0px_0px_4px_0px_#b5b5b5]">
            <h1 className="text-3xl font-bold mb-4">LICENSE AGREEMENT</h1>
            <p className="mb-2"><b>Version 1.0 | Effective Date:</b> 31st March 2025</p>

            <h2 className="text-2xl font-semibold mt-4 mb-4">1. GRANT OF LICENSE</h2>
            <p>Upon successful purchase or authorized download, Licensor grants Licensee a nonexclusive, nontransferable, worldwide, revocable license to use the purchased Template subject to the terms outlined herein. The granted license is limited to the following:</p>
            <ol className="ml-6 mb-4">
                <li><b>1.1 Standard License (Single Use License):</b> Licensee is granted the right to use the Template for a single project (one domain or application) for personal or commercial use. A new license must be purchased for additional projects.</li>
                <li><b>1.2 Extended License:</b> Licensee is granted the right to use the Template in multiple projects or for multiple clients. However, redistribution, resale, or sublicensing is strictly prohibited.</li>
                <li><b>1.3 Developer License:</b> This license grants the right to modify and integrate the Template into end-user products for clients but does not permit resale of the Template as a standalone product.</li>
            </ol>


            <h2 className="text-2xl font-semibold mt-4 mb-4">2. PERMITTED USES</h2>
            <p><b>Licensee may:</b></p>
            <ul className="ml-6 mb-4">
                <li>- Use the Template to create a website or application for personal or business purposes.</li>
                <li>- Modify, customize, and adapt the Template as required for their project.</li>
                <li>- Use the Template for a client’s project, provided the client does not resell, redistribute, or claim ownership of the Template.</li>
                <li>- Use the Template for commercial projects, provided that the Template is incorporated into a final product that does not compete with or replicate the Template itself.</li>
            </ul>


            <h2 className="text-2xl font-semibold mt-4 mb-4">3. PROHIBITED USES</h2>
            <p><b>Licensee may NOT:</b></p>
            <ul className="ml-6 mb-4">
                <li>- Resell, redistribute, sublicense, or share the Template as-is or in modified form.</li>
                <li>- Use the Template in products that allow third parties to generate their own designs from it
                    (e.g., website builders, SaaS platforms offering templatebased website creation, or similar
                    services).</li>
                <li>- Include the Template in a software application, theme marketplace, or automated design
                    service.</li>

                <li>- Offer the Template for free or as part of a bundle.</li>
                <li>- Claim copyright or exclusive rights over the Template or its design elements.</li>

            </ul>


            <h2 className="text-2xl font-semibold mt-4 mb-4">4. OWNERSHIP & INTELLECTUAL PROPERTY</h2>
            <ul className="ml-6 mb-4">
                <li><b>4.1 Retention of Rights:</b> All Templates are the property of Jaikalki Technology Private Limited or its licensors. This Agreement grants a license to use but does not transfer ownership of the Template.</li>
                <li><b>4.2 Intellectual Property Protection:</b> Licensee shall not remove, alter, or obscure any proprietary notices or attributions included in the Template.</li>
            </ul>


            <h2 className="text-2xl font-semibold mt-4 mb-4">5. SUPPORT & UPDATES</h2>
            <ul className="ml-6 mb-4">
                <li><b>5.1 Premium Templates:</b> Paid Templates come with 12 months of technical support, covering bug fixes and minor updates. Licensor is not responsible for compatibility issues arising due to third-party modifications or platform updates.</li>
                <li><b>5.2 Free Templates:</b> Free Templates are provided "as-is" without any guaranteed support.</li>
            </ul>


            <h2 className="text-2xl font-semibold mt-4 mb-4">6. ATTRIBUTION REQUIREMENTS</h2>
            <ul className="ml-6 mb-4">
                <li><b>6.1 Free Templates:</b> Licensee must retain an attribution link to Templamart.com in the website footer unless an attribution-free license is purchased.</li>
                <li><b>6.2 Premium Templates:</b> Attribution is not required but appreciated.</li>
            </ul>


            <h2 className="text-2xl font-semibold mt-4 mb-4">7. REFUND POLICY</h2>
            <p>Due to the digital nature of Templates, refunds are only considered under the following conditions:</p>
            <ul className="list-disc ml-6 mb-4">
                <li>The Template is defective and does not function as described.</li>
                <li>Licensee reports the issue within 7 days of purchase, and Licensor is unable to provide a fix.</li>
                <li>Refunds are NOT provided for buyer’s remorse, lack of technical knowledge, or incompatibility with third-party services.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-4 mb-4">8. TERMINATION OF LICENSE</h2>
            <p>This Agreement is valid until terminated. Licensor reserves the right to terminate this License
            Agreement if Licensee violates any of its terms. Upon termination:</p>
            <ul className="ml-6 mb-4">
                <li>- Licensee must cease all use of the Template.</li>
                <li>- Any websites or applications using the Template in violation of the Agreement must be taken down.</li>
                <li>- No refunds shall be issued for terminated licenses due to a breach of this Agreement.</li>  
            </ul>
            <h2 className="text-2xl font-semibold mt-4 mb-4">9. DISCLAIMER OF WARRANTIES</h2>
            <p>ALL TEMPLATES ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
LICENSOR DISCLAIMS ALL WARRANTIES, INCLUDING FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABILITY, OR NONINFRINGEMENT.</p>

            <h2 className="text-2xl font-semibold mt-4 mb-4">10. LIMITATION OF LIABILITY</h2>
            <p>LICENSOR SHALL NOT BE LIABLE FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, LOSS OF
DATA, PROFITS, OR BUSINESS INTERRUPTION ARISING FROM THE USE OR INABILITY TO USE THE
TEMPLATES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>

            <h2 className="text-2xl font-semibold mt-4 mb-4">11. GOVERNING LAW & DISPUTE RESOLUTION</h2>
            <p>This Agreement shall be governed by and construed under the laws of India. Any disputes shall be
resolved through arbitration in Mumbai, Maharashtra. The decision of the arbitrator shall be final
and binding.</p>

            <h2 className="text-2xl font-semibold mt-4 mb-4">12. CHANGES TO THIS AGREEMENT</h2>
            <p>Licensor reserves the right to modify this Agreement at any time. The updated Agreement will be
posted on Templamart.com, and continued use of the Templates constitutes acceptance of the new
terms.</p>

            <p className="font-bold mt-6">BY PURCHASING OR DOWNLOADING A TEMPLATE FROM TEMPLAMART.COM, YOU ACKNOWLEDGE
            THAT YOU HAVE READ, UNDERSTOOD, AND AGREED TO BE BOUND BY THIS LICENSE AGREEMENT.</p>
        </div>
    );
};

export default LicenseAgreement;
