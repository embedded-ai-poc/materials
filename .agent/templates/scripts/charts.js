/**
 * Chart Utilities - Chart.js Configuration
 * Preset chart configurations for presentation
 */

// Chart.js global defaults
Chart.defaults.color = '#CBD5E1';
Chart.defaults.borderColor = '#334155';
Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

// Color palette
const chartColors = {
    primary: 'rgb(99, 102, 241)',
    primaryLight: 'rgba(99, 102, 241, 0.2)',
    secondary: 'rgb(139, 92, 246)',
    secondaryLight: 'rgba(139, 92, 246, 0.2)',
    accent: 'rgb(236, 72, 153)',
    accentLight: 'rgba(236, 72, 153, 0.2)',
    success: 'rgb(16, 185, 129)',
    successLight: 'rgba(16, 185, 129, 0.2)',
    warning: 'rgb(245, 158, 11)',
    warningLight: 'rgba(245, 158, 11, 0.2)',
    palette: [
        'rgb(99, 102, 241)',
        'rgb(139, 92, 246)',
        'rgb(236, 72, 153)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(59, 130, 246)',
        'rgb(168, 85, 247)'
    ]
};

/**
 * Create a bar chart
 */
function createBarChart(canvasId, data, options = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: options.showLegend || false,
                position: 'bottom'
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#F8FAFC',
                bodyColor: '#CBD5E1',
                borderColor: '#334155',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#94A3B8'
                }
            },
            y: {
                grid: {
                    color: 'rgba(51, 65, 85, 0.5)'
                },
                ticks: {
                    color: '#94A3B8'
                }
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeOutQuart'
        }
    };

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: data.label || 'Data',
                data: data.values,
                backgroundColor: data.colors || chartColors.palette.map(c => c.replace('rgb', 'rgba').replace(')', ', 0.8)')),
                borderColor: data.colors || chartColors.palette,
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: { ...defaultOptions, ...options }
    });

    ctx.chart = chart;
    return chart;
}

/**
 * Create a line chart
 */
function createLineChart(canvasId, data, options = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: options.showLegend || false,
                position: 'bottom'
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#F8FAFC',
                bodyColor: '#CBD5E1',
                borderColor: '#334155',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#94A3B8'
                }
            },
            y: {
                grid: {
                    color: 'rgba(51, 65, 85, 0.5)'
                },
                ticks: {
                    color: '#94A3B8'
                }
            }
        },
        elements: {
            line: {
                tension: 0.4
            },
            point: {
                radius: 4,
                hoverRadius: 6
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeOutQuart'
        }
    };

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: data.label || 'Trend',
                data: data.values,
                borderColor: chartColors.primary,
                backgroundColor: chartColors.primaryLight,
                fill: true,
                pointBackgroundColor: chartColors.primary,
                pointBorderColor: '#0F172A',
                pointBorderWidth: 2
            }]
        },
        options: { ...defaultOptions, ...options }
    });

    ctx.chart = chart;
    return chart;
}

/**
 * Create a doughnut chart
 */
function createDoughnutChart(canvasId, data, options = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '65%',
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#F8FAFC',
                bodyColor: '#CBD5E1',
                borderColor: '#334155',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeOutQuart'
        }
    };

    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: chartColors.palette,
                borderColor: '#0F172A',
                borderWidth: 2
            }]
        },
        options: { ...defaultOptions, ...options }
    });

    ctx.chart = chart;
    return chart;
}

/**
 * Create a horizontal bar chart
 */
function createHorizontalBarChart(canvasId, data, options = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    const defaultOptions = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#F8FAFC',
                bodyColor: '#CBD5E1',
                borderColor: '#334155',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(51, 65, 85, 0.5)'
                },
                ticks: {
                    color: '#94A3B8'
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#94A3B8'
                }
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeOutQuart'
        }
    };

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: data.label || 'Data',
                data: data.values,
                backgroundColor: chartColors.palette.map(c => c.replace('rgb', 'rgba').replace(')', ', 0.8)')),
                borderColor: chartColors.palette,
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: { ...defaultOptions, ...options }
    });

    ctx.chart = chart;
    return chart;
}

/**
 * Initialize all charts on page load
 */
function initCharts() {
    // Charts will be initialized by specific page scripts
    console.log('Chart utilities loaded');
}

// Export for use in page scripts
window.ChartUtils = {
    colors: chartColors,
    createBarChart,
    createLineChart,
    createDoughnutChart,
    createHorizontalBarChart
};
