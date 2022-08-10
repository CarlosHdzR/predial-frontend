import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json'
import es from 'javascript-time-ago/locale/es.json';
import ReactTimeAgo from 'react-time-ago';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(es);

function RecentActivity({ item }) {
    const { fecha, author, action, code } = item;

    return (
        <div className="activity-item d-flex">
            <div className="activite-label">
                <ReactTimeAgo
                    date={new Date(fecha).getTime()}
                    locale="es-ES" timeStyle="twitter"
                />
            </div>
            <i className={`bi bi-circle-fill activity-badge align-self-start 
                ${(action === "creó" && "text-success") ||
                (action === "editó" && "text-warning") ||
                (action === "eliminó" && "text-danger")}`} />
            <div className="activity-content">
                <b>{author}</b> {action} el predio con código <b>{code}</b>
            </div>
        </div>)
}

export default RecentActivity;
