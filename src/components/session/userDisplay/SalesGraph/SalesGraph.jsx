/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import styles from "./sales-graph.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesGraph = ({ token }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/sales/graph`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        const labels = data.chartData.map((item) => item.month);
        const revenues = data.chartData.map((item) => item.revenue);

        setChartData({
          labels,
          datasets: [
            {
              label: "CA du mois (€)",
              data: revenues,
              backgroundColor: "#E67E22",
              barPercentage: 0.4, // largeur de chaque barre (0 à 1)
              categoryPercentage: 0.6, // espace entre les barres
            },
          ],
        });
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 30,
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Chiffre d'affaires des 4 derniers mois",
      },
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value) => value + "€", // ajoute le symbole €
        font: {
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        display: false,
        beginAtZero: true,
        title: {
          display: true,
          text: "€",
        },
        grid: {
          display: false,
        },
      },
      x: {
        title: {
          display: false,
          text: "Mois",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={styles["sales-graph-container"]}>
      <h2>CHIFFRE D'AFFAIRE</h2>
      <div>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SalesGraph;
