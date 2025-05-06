import React from "react";
import { Link } from "react-router-dom";
import image from  "../img/about-us-banner.jpg"

const AboutUs = () => {
    return (
        <section className="bg-gradient-to-b from-blue-50 via-white to-white text-gray-800">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h1 className="text-5xl font-bold text-blue-800 mb-4">About Us</h1>
                <p className="text-lg text-gray-700 mb-8">
                    High-quality eCommerce templates, powered by Jaikalki Technology Pvt. Ltd.
                </p>
                <div className="flex justify-center">
                    <img
                        src={image}
                        alt="eCommerce Templates"
                        className="w-full max-w-4xl rounded-xl shadow-lg transition-transform hover:scale-105 duration-300"
                    />
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-white py-16 px-6 md:px-12 lg:px-24">
                <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2">
                    {/* Mission */}
                    <div className="bg-blue-100 rounded-2xl shadow p-8 hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed">
                            At Templamart, we aim to simplify the way businesses build and enhance their online stores.
                            Our templates empower brands with modern, customizable designs that are both functional and beautiful.
                        </p>
                    </div>

                    {/* What We Offer */}
                    <div className="bg-blue-50 rounded-2xl shadow p-8 hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">What We Offer</h2>
                        <ul className="space-y-4 text-gray-700 list-disc pl-5">
                            <li>
                                <strong>Extensive Template Library:</strong> Professionally crafted designs for various platforms.
                            </li>
                            <li>
                                <strong>User-Friendly Designs:</strong> Easily customizable themes for diverse industries.
                            </li>
                            <li>
                                <strong>Responsive Support:</strong> Dedicated experts ready to assist anytime.
                            </li>
                        </ul>
                    </div>

                    {/* Why Choose Us */}
                    <div className="md:col-span-2 bg-white border-l-4 border-blue-600 p-8 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">Why Choose Us?</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We blend aesthetics with usability, keeping your business future-ready. Our templates
                            follow the latest design trends and are updated regularly with powerful features. We
                            stand for quality, reliability, and great user experiences.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="md:col-span-2 text-center mt-12">
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">Connect With Us</h2>
                        <p className="text-gray-700 mb-6">
                            We’re constantly improving. Your feedback helps us grow. Reach out via our{" "}
                            <Link
                                to="/contact"
                                className="text-blue-600 font-medium underline hover:text-blue-800"
                            >
                                Contact Us
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
