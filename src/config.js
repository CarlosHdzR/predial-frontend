export const config = {
    URL: process.env.REACT_APP_API_URL,
    USERS_API: {
        LOGIN: "users/login",
        LIST_USERS: "users/list",
        CREATE: "users/create",
        REGISTER: "users/register",
        EDIT: "users/edit/",
        DELETE: "users/delete/",
        CHANGE_PASSWORD: "users/change-password",
        GET_RESET_LINK: "users/get-reset-link",
        RESET_PASSWORD: "users/reset-password",
        ASSOCIATE_PROPERTIES: "users/associate-property/"
    },
    PROPERTIES_API: {
        LIST_PROPERTIES: "properties/list",
        HISTORIAL: "properties/historial",
        CREATE: "properties/create",
        EDIT: "properties/edit/",
        DELETE: "properties/delete/",
        FIND: "properties/find/",
        LIST_ASSOCIATED_PROPERTIES: "properties/list-associated-properties/"
    },
    ASSETS: {
        LOGO_ESCUDO: "https://res.cloudinary.com/chrod90/image/upload/v1655852581/app-predial-static/logo-escudo_kegz1y.png",
        LOGO_GOV_CO: "https://res.cloudinary.com/chrod90/image/upload/v1655852581/app-predial-static/logo-gov-co_kzngdx.png",
        LOGO_SIDEBAR: "https://res.cloudinary.com/chrod90/image/upload/v1655852581/app-predial-static/logo-sidebar_m0gqs9.png",
        LOGO_GOV_FOOTER: "https://res.cloudinary.com/chrod90/image/upload/v1655852581/app-predial-static/logo-govco-footer_zb2uk2.png",
        DEFAULT_AVATAR: "https://res.cloudinary.com/chrod90/image/upload/v1655852581/app-predial-static/default-avatar_x8vknd.png",
        IMG_LOADING: "https://res.cloudinary.com/chrod90/image/upload/v1655852581/app-predial-static/img-loading_h52s2j.gif",
        NOT_FOUND: "https://res.cloudinary.com/chrod90/image/upload/v1655852582/app-predial-static/not-found_j6hthl.png"
    }
}
