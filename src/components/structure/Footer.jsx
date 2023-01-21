import { useAuthContext } from "../../context/AuthContext";
import { config } from "../../config";

function Footer() {
    const { payload, auth } = useAuthContext();
    const { LOGO_ESCUDO, LOGO_GOV_FOOTER } = config.ASSETS;
    const currentYear = new Date().getFullYear();

    const socialItemsProps = [
        {
            link: "https://www.facebook.com/GobernaciondelAtlantico",
            icon: "bi bi-facebook"
        },
        {
            link: "https://www.instagram.com/gobatlantico/",
            icon: "bi bi-instagram"
        },
        {
            link: "https://twitter.com/gobatlantico",
            icon: "bi bi-twitter"
        },
        {
            link: "https://www.youtube.com/user/gobatl",
            icon: "bi bi-youtube"
        },
    ]

    const footerColProps = [
        {
            className: "footer-col d-none d-sm-block",
            label: "Gobernación del Atlántico",
            content:
                <a href="https://www.atlantico.gov.co/" target="_blank" rel="noreferrer">
                    <img className="logo-escudo img-fluid zoom" src={LOGO_ESCUDO} alt="escudo-cauca" />
                </a>
        },
        {
            className: "footer-col",
            label: "Contacto",
            content:
                <>
                    <p href="#">Dirección:<br />Calle 40 # 45 - 46<br />Barranquilla - Atlántico. </p>
                    <p href="#">Código Postal: 080003</p>
                    <p href="#">Teléfono:<br />+57 6053307000</p>
                    <span>atencionalciudadano@atlantico.gov.co<br/>notificacionesjudiciales@atlantico.gov.co</span>
                </>
        },
        {
            className: "footer-col",
            classItem: "social-links",
            label: "Redes Sociales",
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
            label: "Gobierno de Colombia",
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
                                    <h4>{item.label}</h4>
                                    <div className={item.classItem}>
                                        {item.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr />
                        <div className="row">
                            <p style={{ color: '#d4d4d4' }}>
                                &copy;{currentYear} <b>CHRod</b> | All rights reserved
                            </p>
                        </div>
                    </div>
                </footer>
                :
                <footer id="footer" className="footer" >
                    <div className="copyright">
                        &copy;{currentYear} <b>CHRod</b> | All Rights Reserved
                    </div>
                </footer>
            }
        </>
    )
}

export default Footer;
