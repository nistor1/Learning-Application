import React from 'react';
import './Contact.css';
export default function Contact() {
    return (
        <div className="contact-page">
            <div className="contact-content max-w-3xl mx-auto p-6">
                <h1 className="text-4xl font-bold mb-4">Contact</h1>
                <hr className="border-gray-200 mb-8"/>

                <div className="space-y-4">
                    <p className="text-xl">
                        <span className="font-medium">Telephone: </span> 0722132434
                    </p>
                    <p className="text-xl">
                        <span className="font-medium">Email: </span> onlinecourses@oc.com
                    </p>
                </div>
            </div>
        </div>
        );
    }