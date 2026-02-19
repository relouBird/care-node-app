import {
  IconHeartbeat,
  IconLungs,
  IconThermometer,
  IconMapPin,
} from "@tabler/icons-vue";

// Données simulées pour les graphiques (7 jours)
const heartRateData = [92, 95, 93, 98, 95, 94, 95];
const oxygenData = [95, 96, 97, 98, 97, 96, 97];
const temperatureData = [6.2, 7.1, 6.5, 6.8, 7.2, 6.5, 6.5];
const locationData = [1450, 1520, 1578, 1480, 1590, 1550, 1578];

export const dashboardMetrics = [
  {
    label: "Fréquence Cardiaque",
    value: "75",
    unit: "bpm",
    icon: IconHeartbeat,
    iconColor: "#ef4444",
    iconBackground: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
    chartColor: "#ef4444",
    chartData: heartRateData,
  },
  {
    label: "Taux d\'Oxygène",
    value: '97',
    unit: '%',
    icon: IconLungs,
    iconColor: '#3b82f6',
    iconBackground: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    chartColor: '#3b82f6',
    chartData: oxygenData,
  },
  {
    label: "Température Corporelle",
    value: '36.7',
    unit: '°C',
    icon: IconThermometer,
    iconColor: '#f59e0b',
    iconBackground: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    chartColor: '#f59e0b',
    chartData: temperatureData
  },
  {
    label: 'Distance',
    value: '2.5',
    unit: 'km',
    icon: IconMapPin,
    iconColor: '#10b981',
    iconBackground: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
    chartColor: '#10b981',
    chartData: locationData
  },
];
