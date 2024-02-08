import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutComp = ({completed, total}) => {
    if(total===0){
        completed=5;
        total=10;
    }
    const remaining=total-completed;

    const options = {
        maintainAspectRatio: false, // This will allow you to set width and height
        responsive: false,
    };

    const data = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                label: '# of Modules',
                data: [completed,remaining],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgb(37,211,102)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
        <Doughnut data={data} options={options} style={{}}/>
        </div>
    )
}

export default DoughnutComp;