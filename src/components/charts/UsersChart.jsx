import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { usePropertiesContext } from "../../context";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

const options = {
    fill: true,
    scales: {
        y: {
            min: 0,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            display: true,
        },
    },
};

function UsersChart({ loader, usersDb }) {
    const { recordsDb } = usePropertiesContext();
    const usersInt = usersDb.filter((user) => user.role === 1 || user.role === 2)
    
    const labels = usersInt.map((user) => {
        return user.name
    })

    const scores1 = usersInt.map((user) => {
        let created_properties = recordsDb.filter((record) => record.author_id === user._id && record.action === "creó");
        return created_properties.length;
    });

    const scores2 = usersInt.map((user) => {
        let edited_properties = recordsDb.filter((record) => record.author_id === user._id && record.action === "editó");
        return edited_properties.length;
    });

    const scores3 = usersInt.map((user) => {
        let deleted_properties = recordsDb.filter((record) => record.author_id === user._id && record.action === "eliminó");
        return deleted_properties.length;
    });

    const data = {
        datasets: [
            {
                label: " Predios creados",
                data: scores1,
                backgroundColor: "rgba(25, 135, 84)",
            },
            {
                label: " Predios editados",
                data: scores2,
                backgroundColor: "rgba(255, 194, 8)",
            },
            {
                label: " Predios eliminados",
                data: scores3,
                backgroundColor: "rgba(220, 53, 70)",
            },
        ],
        labels
    }

    return (
        <div className="App">
            {usersDb.length > 0 && recordsDb.length
                ?
                <Bar data={data} options={options} />
                :
                <h2 className="text-center m-3">{loader}{!loader && "¡No hay información!"}</h2>
            }
        </div>
    );
}

export default UsersChart;