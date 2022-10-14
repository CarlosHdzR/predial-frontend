import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json'
import es from 'javascript-time-ago/locale/es.json';
import ReactTimeAgo from 'react-time-ago';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(es);

function RecentActivity({ record }) {
    const { author, action, property_code, createdAt } = record;
    let date = new Date(createdAt).getTime();

    const COLOR_TEXTS = {
        creó: 'text-success',
        editó: 'text-warning',
        eliminó: 'text-danger'
    }
    const activityColor = COLOR_TEXTS[action] || "";

    return (
        <div className="activity-item d-flex">
            <div className="activite-label">
                <ReactTimeAgo
                    date={date}
                    locale="es-ES" timeStyle="twitter"
                />
            </div>
            <i className={`bi bi-circle-fill activity-badge align-self-start ${activityColor}`} />
            <div className="activity-content">
                <b>{author}</b> {action} el predio con código <b>{property_code}</b>
            </div>
        </div>)
}

export default RecentActivity;
