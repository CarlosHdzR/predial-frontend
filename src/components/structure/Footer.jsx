import { footerColProps } from "./props";

function Footer() {
    return (
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
    )
}

export default Footer;
