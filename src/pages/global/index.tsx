import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Toastr from "../../components/toastr";
import CookieConsent from "../../components/cookie-consent";
import WhatsAppButton from "../../components/whatsapp";
import { Outlet } from "react-router-dom";
import { Fragment } from "react";

const Global = () => {
    return (
        <Fragment>
            <Navbar />
            <Outlet />
            <Footer />
            <WhatsAppButton />
            <Toastr />
            <CookieConsent />
        </Fragment>
    )
}

export default Global;
