// ContactPage.jsx
import React from "react";

const Contact = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Address</h2>
            <p>Jaikalki Technology Pvt Ltd <br/>Anand India Business Hub, <br/>Mira Road, Mumbai, India</p>
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
  );
};

export default Contact;
