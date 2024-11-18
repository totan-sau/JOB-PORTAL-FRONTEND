import React from 'react'

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                        <p className="mb-1">123 Main Street, Anytown, USA</p>
                        <p className="mb-1">Phone: (123) 456-7890</p>
                        <p>Email: <a href="mailto:info@example.com" className="underline">info@example.com</a></p>
                    </div>

                    <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center md:text-left">
                        <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="#" className="text-blue-500 hover:text-blue-400">
                                <i className="fab fa-facebook-f"></i>
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="#" className="text-blue-400 hover:text-blue-300">
                                <i className="fab fa-twitter"></i>
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="#" className="text-pink-500 hover:text-pink-400">
                                <i className="fab fa-instagram"></i>
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="#" className="text-blue-700 hover:text-blue-600">
                                <i className="fab fa-linkedin-in"></i>
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-sm">&copy; 2024 Your Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer