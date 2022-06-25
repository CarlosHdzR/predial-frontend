import { config } from "../../config";

const { LOGO_ESCUDO, LOGO_GOV_FOOTER } = config.ASSETS

export const navItemProps = [
    {
        id: 1,
        path: "/user-ext/home",
        label: "Inicio",
    },
    {
        id: 2,
        path: "/user-ext/asociar-predios",
        label: "Asociar Predios",
    },
    {
        id: 3,
        path: "/user-ext/pagar",
        label: "Pagar Impuesto",
    },
]

export const sidebarItemProps = [
    {
        id: 1,
        linkTo: "/admin/dashboard",
        icon: "bi bi-grid-fill",
        label: "Dashboard"
    },
    {
        id: 2,
        linkTo: "/admin/my-profile",
        icon: "fa-solid fa-circle-user",
        label: "Mi Perfil"
    },
    {
        id: 3,
        linkTo: "/admin/create-user",
        icon: "fa-solid fa-user-plus",
        label: "Crear Usuario"
    },
    {
        id: 4,
        linkTo: "/admin/manage-users",
        icon: "fa-solid fa-user-group",
        label: "Gestionar Usuarios"
    },
    {
        id: 5,
        linkTo: "/admin/create-predio",
        icon: "fa-solid fa-circle-plus",
        label: "Crear Predio"
    },
    {
        id: 6,
        linkTo: "/admin/manage-predios",
        icon: "fa-solid fa-city",
        label: "Gestionar Predios"
    },
]

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

export const footerColProps = [
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


