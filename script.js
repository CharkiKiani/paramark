// Gestion des onglets
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// Graphique camembert - Revenus mis à jour
const revenueCtx = document.getElementById('revenueChart').getContext('2d');
new Chart(revenueCtx, {
  type: 'pie',
  data: {
    labels: [
      'Marge Vente',       // 40%
      'Commissions',       // recalculé
      'Abonnements B2B',   // recalculé
      'Services logistiques', // recalculé
      'Data Intelligence', // recalculé
      'Publicité'          // recalculé
    ],
    datasets: [{
      data: [40, 24, 15, 9, 6, 6], // Nouveaux pourcentages
      backgroundColor: [
        '#F59E0B',  // Marge Vente - orange
        '#1E3A8A',  // Commissions - bleu foncé
        '#3B82F6',  // Abonnements - bleu clair
        '#10B981',  // Logistique - vert
        '#8B5CF6',  // Data - violet
        '#EC4899'   // Publicité - rose
      ],
      borderWidth: 1,
      borderColor: '#FFFFFF'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      },
      // Affiche les labels sur les tranches
      datalabels: {
        color: '#FFF',
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label + '\n' + value + '%';
        },
        font: { weight: 'bold', size: 13 },
        textAlign: 'center'
      }
    }
  },
  plugins: [ChartDataLabels] // Nécessaire pour afficher les labels
});

// Graphique linéaire - Prévisions financières (inchangé)
const financialCtx = document.getElementById('financialChart').getContext('2d');
new Chart(financialCtx, {
  type: 'line',
  data: {
    labels: ['Année 1', 'Année 2', 'Année 3'],
    datasets: [{
      label: 'Chiffre d’affaires (M€)',
      data: [0.8, 3.0, 8.5],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.3
    }, {
      label: 'Bénéfice Net (M€)',
      data: [-0.3, 0.5, 2.2],
      borderColor: '#F59E0B',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  }
});