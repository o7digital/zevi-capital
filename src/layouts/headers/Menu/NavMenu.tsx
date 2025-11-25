"use client";
import Link from "next/link.js";
import Image from "next/image";
import { useTranslation } from "@/contexts/TranslationContext";

const NavMenu = () => {
    const { t } = useTranslation();
    
    return (
        <ul className="navbar-nav align-items-lg-center">
            <li className="d-block d-lg-none">
                <div className="logo">
                    <Link href="/" className="d-inline-flex align-items-center gap-3 text-decoration-none">
                        <Image src="/logo/logo o7.jpg" alt="O7 REALESTATES logo" width={420} height={108} priority style={{ maxHeight: "108px", height: "auto", width: "auto" }} />
                        <span className="fw-semibold text-uppercase text-dark">O7 REALESTATES</span>
                    </Link>
                </div>
            </li>
            <li className="nav-item">
                <Link className="nav-link" href="/">{t('nav.home')}</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" href="/about_us_01">{t('nav.aboutUs')}</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" href="/sales">{t('nav.sales')}</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" href="/contact">{t('nav.contactUs')}</Link>
            </li>
        </ul>
    );
};

export default NavMenu;

