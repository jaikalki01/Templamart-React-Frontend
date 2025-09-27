import { Helmet } from 'react-helmet';
  
const Terms = () => {
    return (
      <div className="container mx-auto p-6 max-w-[80rem] rounded-[30px] mt-[30px] mb-[30px]">
        <h1 className="text-3xl font-bold mb-4">TERMS AND CONDITIONS</h1>
        <p className="mb-2 text-muted-foreground"><b>Effective Date:</b> 30th March 2025</p>
        
        <h2 className="text-2xl font-semibold mt-4 mb-4">1. INTRODUCTION</h2>
        <p className="mb-4 text-muted-foreground">
          Welcome to <a href="Templamart.com" className="text-blue-600">templamart.com</a> ("Website"), owned and operated by Jaikalki Technology
          Private Limited ("Company", "We", "Us"). These Terms and Conditions ("Terms") govern
          your access and use of the Website and its products and services. By using Templamart.com,
          you agree to these Terms. If you do not agree, please discontinue use immediately.
        </p>
        
        <h2 className="text-2xl font-semibold mt-4 mb-4">2. DEFINITIONS</h2>
        <ul className="list-disc ml-6 mb-4 text-muted-foreground">
          <li><strong>User/Customer</strong> – Anyone who accesses or purchases from Templamart.com.</li>
          <li><strong>Templates</strong> – Digital website themes, UI components, or related assets available on the platform.</li>
          <li><strong>License Agreement</strong> – The separate agreement governing the permitted use of templates.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-4 mb-4">3. USE OF SERVICES</h2>
        <ul className="list-disc ml-6 mb-4 text-muted-foreground">
          <li>You must be at least 18 years old to use Templamart.com.</li>
          <li>You agree to provide accurate and complete information during registration.</li>
          <li>You are responsible for maintaining the confidentiality of your account and password.</li>
          <li>You may not use the Website for illegal or unauthorized purposes.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-4 mb-4">4. PAYMENTS & PRICING</h2>
        <ul className="list-disc ml-6 mb-4 text-muted-foreground">
          <li>All payments are processed through secure third-party payment gateways.</li>
          <li>Prices are subject to change without notice.</li>
          <li>Any taxes or additional fees are the responsibility of the buyer.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-4 mb-4">5. INTELLECTUAL PROPERTY RIGHTS</h2>
        <ul className="list-disc ml-6 mb-4 text-muted-foreground">
          <li>All Templates remain the property of the Company or its licensors.</li>
          <li>You are granted a license, not ownership, under the License Agreement.</li>
          <li>Unauthorized reproduction or distribution of Templates is prohibited.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-4 mb-4">6. LIMITATION OF LIABILITY</h2>
        <ul className="list-disc ml-6 mb-4 text-muted-foreground">
          <li>We are not liable for damages arising from the use or inability to use our products.</li>
          <li>No warranties, express or implied, are provided beyond those explicitly mentioned.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-4 mb-4">7. TERMINATION</h2>
        <p className="mb-4 text-muted-foreground">
          We reserve the right to suspend or terminate your account for any violation of these Terms.
        </p>
        
        <h2 className="text-2xl font-semibold mt-4 mb-4">8. CONTACT INFORMATION</h2>
        <p className="mb-4 text-muted-foreground">
          For any questions or concerns regarding these Terms, please contact:
        </p>
        <ul className="list-disc ml-6 mb-4 text-muted-foreground">
          <li><strong>Jaikalki Technology Private Limited</strong></li>
          <li>Address: Sh N B1/A Grd Flr Mahavir Ngr, Deepak Hospital, Mira Road, Thane, Maharashtra, 401107</li>
          <li>Email: <a href="mailto:support@jaikalki.com" className="text-blue-600">support@jaikalki.com</a></li>
        </ul>
      </div>
    );
  };
  
  export default Terms;
