import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
    const usersInt = usersDb.filter((user) => user.role === 1 || user.role === 2)
    const labels = usersInt.map((user) => {
        return user.name
    })

    const scores1 = usersInt.map((user) => {
        return user.created_properties
    });

    const scores2 = usersInt.map((user) => {
        return user.edited_properties
    });
    const scores3 = usersInt.map((user) => {
        return user.deleted_properties
    });

    const data = {
        datasets: [
            {
                label: " Predios creados",
                data: scores1,
                backgroundColor: "rgba(25, 135, 84, 0.7)",
            },
            {
                label: " Predios editados",
                data: scores2,
                backgroundColor: "rgba(255, 194, 8, 0.7)",
            },
            {
                label: " Predios eliminados",
                data: scores3,
                backgroundColor: "rgba(219, 52, 69, 0.7)",
            },
        ],
        labels
    }

    return (
        <div className="App">
            {usersDb.length > 0 ?
                <Bar data={data} options={options} />
                :
                <h2 className="text-center m-3">{loader}{!loader && "¡No hay información!"}</h2>
            }
        </div>
    );
}

export default UsersChart;