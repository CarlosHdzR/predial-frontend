import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    fill: true,
    responsive: true,
    plugins: {
        legend: {
            display: true,
        },
    },
};

function PrediosChart({ loader, prediosDb }) {
    const men100 = prediosDb.filter((predio) => predio.property_value.replace(/[$.]/g, '') < 100000000);
    const may100men200 = prediosDb.filter((predio) => predio.property_value.replace(/[$.]/g, '') >= 100000000
                                                    && predio.property_value.replace(/[$.]/g, '') <= 200000000);
    const may200 = prediosDb.filter((predio) => predio.property_value.replace(/[$.]/g, '') > 200000000);

    const data = {
        labels: [' Menor a $100M', ' Entre $100M y $200M', ' Mayor a $200M'],
        datasets: [
            {
                data: [men100.length, may100men200.length, may200.length],
                backgroundColor: [
                    'rgba(25, 135, 84, 0.7)',
                    'rgba(255, 194, 8, 0.7)',
                    'rgba(219, 52, 69, 0.7)',
                ],
            },
        ],
    };

    const aMen100 = prediosDb.filter((predio) => predio.total_area < 100)
    const aMay100Men150 = prediosDb.filter((predio) => predio.total_area >= 100 && predio.total_area <= 150)
    const may150 = prediosDb.filter((predio) => predio.total_area > 150)

    const data2 = {
        labels: [' Menos de 100m² ', ' Entre 100m² y 150m² ', ' Más de 150m² '],
        datasets: [
            {
                data: [aMen100.length, aMay100Men150.length, may150.length],
                backgroundColor: [
                    'rgba(25, 135, 84, 0.7)',
                    'rgba(255, 194, 8, 0.7)',
                    'rgba(219, 52, 69, 0.7)',
                ],
            },
        ],
    };

    return (
        <div className="App">
            {prediosDb.length > 0 ?
                <div className="row">
                    <div className="col-6">
                        <div className="text-center">
                            <span className="card-title" style={{ fontSize: "12px" }}>Valor</span>
                        </div>
                        <Pie data={data} options={options} />
                    </div>
                    <div className="col-6">
                        <div className="text-center">
                            <span className="card-title" style={{ fontSize: "12px" }}>Área Total</span>
                        </div>
                        <Pie data={data2} options={options} />
                    </div>
                </div>
                :
                <h2 className="text-center m-3">{loader}{!loader && "¡No hay información!"}</h2>
            }  
        </div>
    );
}

export default PrediosChart;
