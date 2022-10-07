import { useAuthContext } from "../../context/AuthContext";
import { config } from "../../config";

function Footer() {
    const { payload, auth } = useAuthContext();
    const { LOGO_ESCUDO, LOGO_GOV_FOOTER } = config.ASSETS;

    const socialItemsProps = [
        {
            link: "https://es-la.facebook.com/GobCauca/",
            icon: "bi bi-facebook"
        },
        {
            link: "https://www.instagram.com/GobCauca/",
            icon: "bi bi-instagram"
        },
        {
            link: "https://twitter.com/GobCauca",
            icon: "bi bi-twitter"
        },
        {
            link: "https://www.youtube.com/channel/UCJUgHfrUdzJojR2Ktao7fHw",
            icon: "bi bi-youtube"
        },
    ]

    const footerColProps = [
        {
            className: "footer-col d-none d-sm-block",
            classItem: "logo-footer",
            content:
                <a href="https://www.cauca.gov.co/" target="_blank" rel="noreferrer">
                    <img className="img-fluid zoom" src={LOGO_ESCUDO} alt="escudo-cauca" />
                </a>
        },
        {
            className: "footer-col",
            content:
                <>
                    <p href="#">Dirección:<br />Carrera 7 Calle 4 Esquina<br />Popayán - Cauca. </p>
                    <p href="#">Código Postal - 190001</p>
                    <p href="#">Teléfono:<br />602 8320352 - 602 8220571<br />602 8220572 - 602 8242121</p>
                    <p href="#">contactenos@cauca.gov.co</p>
                    <p href="#">Notificaciones judiciales:<br />notificaciones@cauca.gov.co</p>
                </>
        },
        {
            className: "footer-col",
            classItem: "social-links",
            content: socialItemsProps.map((item, index) => (
                <a
                    key={index}
                    href={item.link}
                    target="_blank" rel="noreferrer">
                    <i className={item.icon} />
                </a>
            ))
        },
        {
            className: "footer-col d-none d-sm-block",
            classItem: "logo-footer",
            content:
                <a href="https://www.gov.co/home/" target="_blank" rel="noreferrer" >
                    <img className="img-fluid zoom" src={LOGO_GOV_FOOTER} alt="logo-gov-co" />
                </a>
        }
    ]

    return (
        <>
            {(!auth) || payload.role === 3
                ?
                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            {footerColProps.map((item, index) => (
                                <div key={index} className={item.className}>
                                    <h4>Gobernación del Cauca</h4>
                                    <div className={item.classItem}>
                                        {item.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr />
                        <div className="row">
                            <p style={{ color: '#d4d4d4' }}>
                                &copy;{new Date().getFullYear()} <b>ChrodDev</b> | All rights reserved
                            </p>
                        </div>
                    </div>
                </footer>
                :
                <footer id="footer" className="footer" >
                    <div className="copyright">
                        &copy; Copyright <b>ChrodDev</b> | All Rights Reserved
                    </div>
                </footer>
            }
        </>
    )
}

export default Footer;
