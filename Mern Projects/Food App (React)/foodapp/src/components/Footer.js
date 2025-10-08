import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-light text-dark py-4 border-top mt-5">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                {/* Left Side */}
                <div className="d-flex align-items-center mb-3 mb-md-0">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3480/3480104.png"
                        alt="Logo"
                        width="32"
                        height="32"
                        className="me-2"
                    />
                    <span className="text-muted">© 2025 FoodApp, Inc</span>
                </div>

                {/* Right Side - Social Links */}
                <ul className="nav list-unstyled d-flex">
                    <li className="ms-3">
                        <a
                            href="#"
                            className="text-muted"
                            aria-label="Instagram"
                            title="Instagram"
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                                alt="Instagram"
                                width="24"
                                height="24"
                                style={{ transition: 'transform 0.2s' }}
                                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.2)')}
                                onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                            />
                        </a>
                    </li>
                    <li className="ms-3">
                        <a
                            href="#"
                            className="text-muted"
                            aria-label="Facebook"
                            title="Facebook"
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                                alt="Facebook"
                                width="24"
                                height="24"
                                style={{ transition: 'transform 0.2s' }}
                                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.2)')}
                                onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                            />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
