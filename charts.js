/* ========================================
   Chart Configuration & Rendering
   ======================================== */

// Color palette — Pastel Orange Theme
const COLORS = {
    purple: { bg: 'rgba(200, 162, 214, 0.6)', border: '#c8a2d6', light: 'rgba(200, 162, 214, 0.15)' },
    blue: { bg: 'rgba(139, 189, 224, 0.6)', border: '#8bbde0', light: 'rgba(139, 189, 224, 0.15)' },
    green: { bg: 'rgba(125, 201, 160, 0.6)', border: '#7dc9a0', light: 'rgba(125, 201, 160, 0.15)' },
    orange: { bg: 'rgba(244, 148, 94, 0.7)', border: '#f4945e', light: 'rgba(244, 148, 94, 0.15)' },
    pink: { bg: 'rgba(232, 160, 180, 0.6)', border: '#e8a0b4', light: 'rgba(232, 160, 180, 0.15)' },
    cyan: { bg: 'rgba(125, 196, 201, 0.6)', border: '#7dc4c9', light: 'rgba(125, 196, 201, 0.15)' },
    red: { bg: 'rgba(232, 128, 128, 0.6)', border: '#e88080', light: 'rgba(232, 128, 128, 0.15)' },
    indigo: { bg: 'rgba(244, 148, 94, 0.65)', border: '#f4945e', light: 'rgba(244, 148, 94, 0.15)' },
};

const GRADIENT_COLORS = [
    'rgba(244, 148, 94, 0.7)', 'rgba(247, 179, 134, 0.7)', 'rgba(255, 203, 164, 0.7)',
    'rgba(232, 115, 74, 0.65)', 'rgba(255, 138, 107, 0.65)', 'rgba(252, 213, 184, 0.7)',
    'rgba(139, 189, 224, 0.6)', 'rgba(125, 201, 160, 0.6)', 'rgba(232, 160, 180, 0.6)',
    'rgba(235, 200, 110, 0.65)', 'rgba(200, 162, 214, 0.6)', 'rgba(125, 196, 201, 0.6)',
    'rgba(244, 165, 110, 0.7)', 'rgba(240, 130, 80, 0.65)', 'rgba(255, 180, 140, 0.7)',
    'rgba(230, 150, 100, 0.65)', 'rgba(220, 170, 130, 0.65)'
];

const BORDER_COLORS = [
    '#f4945e', '#f7b386', '#ffcba4', '#e8734a', '#ff8a6b', '#fcd5b8',
    '#8bbde0', '#7dc9a0', '#e8a0b4', '#ebc86e', '#c8a2d6', '#7dc4c9',
    '#f4a56e', '#f08250', '#ffb48c', '#e69664', '#dcaa82'
];

// Register datalabels plugin
Chart.register(ChartDataLabels);

// Default chart options — Light theme
Chart.defaults.color = '#7a6455';
Chart.defaults.borderColor = 'rgba(230, 170, 120, 0.12)';
Chart.defaults.font.family = "'IBM Plex Sans Thai', 'Inter', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.padding = 16;
// Disable datalabels globally (enable per-chart)
Chart.defaults.plugins.datalabels.display = false;

const chartInstances = {};

function createGradient(ctx, color1, color2) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

// ========== OVERVIEW CHARTS ==========

function renderOverviewBarChart1() {
    const ctx = document.getElementById('overviewBarChart1').getContext('2d');
    const d = SURVEY_DATA.evaluation;
    chartInstances.overviewBar1 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: d.labels,
            datasets: [{
                label: 'ค่าเฉลี่ย',
                data: d.averages,
                backgroundColor: GRADIENT_COLORS.slice(0, 17),
                borderColor: BORDER_COLORS.slice(0, 17),
                borderWidth: 1, borderRadius: 6, borderSkipped: false
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false },
                tooltip: { callbacks: { label: c => `ค่าเฉลี่ย: ${c.parsed.y.toFixed(2)}` } }
            },
            scales: {
                y: { beginAtZero: false, min: 3.5, max: 5, ticks: { stepSize: 0.5 }, grid: { color: 'rgba(230,170,120,0.1)' } },
                x: { ticks: { maxRotation: 45, minRotation: 45, font: { size: 10 } }, grid: { display: false } }
            }
        }
    });
}

function renderOverviewBarChart2() {
    const ctx = document.getElementById('overviewBarChart2').getContext('2d');
    const d = SURVEY_DATA.requirements;
    chartInstances.overviewBar2 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: d.labels,
            datasets: [{
                label: 'ค่าเฉลี่ย',
                data: d.averages,
                backgroundColor: [COLORS.purple.bg, COLORS.blue.bg, COLORS.green.bg, COLORS.orange.bg, COLORS.pink.bg, COLORS.cyan.bg],
                borderColor: [COLORS.purple.border, COLORS.blue.border, COLORS.green.border, COLORS.orange.border, COLORS.pink.border, COLORS.cyan.border],
                borderWidth: 1, borderRadius: 6, borderSkipped: false
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false },
                tooltip: { callbacks: { label: c => `ค่าเฉลี่ย: ${c.parsed.y.toFixed(2)}` } }
            },
            scales: {
                y: { beginAtZero: false, min: 4.0, max: 5, ticks: { stepSize: 0.25 }, grid: { color: 'rgba(230,170,120,0.1)' } },
                x: { ticks: { font: { size: 11 } }, grid: { display: false } }
            }
        }
    });
}

// ========== DEMOGRAPHICS CHARTS ==========

function renderGenderCharts() {
    const configs = [
        { id: 'genderChart1', data: SURVEY_DATA.evaluation.genders },
        { id: 'genderChart2', data: SURVEY_DATA.requirements.genders }
    ];
    configs.forEach((cfg, i) => {
        const ctx = document.getElementById(cfg.id).getContext('2d');
        chartInstances[`gender${i}`] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(cfg.data),
                datasets: [{
                    data: Object.values(cfg.data),
                    backgroundColor: [COLORS.blue.bg, COLORS.pink.bg],
                    borderColor: [COLORS.blue.border, COLORS.pink.border],
                    borderWidth: 2, hoverOffset: 10
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '55%',
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: { callbacks: { label: c => `${c.label}: ${c.raw} คน (${((c.raw/c.dataset.data.reduce((a,b)=>a+b,0))*100).toFixed(1)}%)` } },
                    datalabels: {
                        display: true,
                        color: '#3d2c1e',
                        font: { weight: 'bold', size: 13 },
                        formatter: (value, ctx) => {
                            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                            return ((value / total) * 100).toFixed(1) + '%';
                        }
                    }
                }
            }
        });
    });
}

function renderStatusCharts() {
    const configs = [
        { id: 'statusChart1', data: SURVEY_DATA.evaluation.statuses },
        { id: 'statusChart2', data: SURVEY_DATA.requirements.statuses }
    ];
    const colors = [[COLORS.indigo.bg, COLORS.orange.bg, COLORS.green.bg], [COLORS.indigo.border, COLORS.orange.border, COLORS.green.border]];
    configs.forEach((cfg, i) => {
        const ctx = document.getElementById(cfg.id).getContext('2d');
        chartInstances[`status${i}`] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(cfg.data),
                datasets: [{
                    data: Object.values(cfg.data),
                    backgroundColor: colors[0].slice(0, Object.keys(cfg.data).length),
                    borderColor: colors[1].slice(0, Object.keys(cfg.data).length),
                    borderWidth: 2, hoverOffset: 10
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '55%',
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: { callbacks: { label: c => `${c.label}: ${c.raw} คน` } },
                    datalabels: {
                        display: true,
                        color: '#3d2c1e',
                        font: { weight: 'bold', size: 13 },
                        formatter: (value, ctx) => {
                            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                            return ((value / total) * 100).toFixed(1) + '%';
                        }
                    }
                }
            }
        });
    });
}

// ========== EVALUATION CHARTS ==========

function renderEvalDesignBar() {
    const d = SURVEY_DATA.evaluation;
    const idx = d.categories.design.indices;
    const ctx = document.getElementById('evalDesignBar').getContext('2d');
    chartInstances.evalDesignBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: idx.map(i => d.labels[i]),
            datasets: [{
                label: 'ค่าเฉลี่ย', data: idx.map(i => d.averages[i]),
                backgroundColor: idx.map((_, j) => GRADIENT_COLORS[j]),
                borderColor: idx.map((_, j) => BORDER_COLORS[j]),
                borderWidth: 1, borderRadius: 8, borderSkipped: false
            }]
        },
        options: {
            indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { min: 4.0, max: 5.0, ticks: { stepSize: 0.25 }, grid: { color: 'rgba(230,170,120,0.1)' } },
                y: { grid: { display: false }, ticks: { font: { size: 12 } } }
            }
        }
    });
}

function renderEvalDesignRadar() {
    const d = SURVEY_DATA.evaluation;
    const idx = d.categories.design.indices;
    const ctx = document.getElementById('evalDesignRadar').getContext('2d');
    chartInstances.evalDesignRadar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: idx.map(i => d.labels[i]),
            datasets: [{
                label: 'ค่าเฉลี่ย', data: idx.map(i => d.averages[i]),
                backgroundColor: 'rgba(244, 148, 94, 0.15)', borderColor: '#f4945e',
                borderWidth: 2, pointBackgroundColor: '#f4945e', pointRadius: 5, pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { r: { beginAtZero: false, min: 3.5, max: 5, ticks: { stepSize: 0.5, backdropColor: 'transparent' }, grid: { color: 'rgba(230,170,120,0.15)' }, angleLines: { color: 'rgba(230,170,120,0.15)' }, pointLabels: { font: { size: 11 } } } },
            plugins: { legend: { display: false } }
        }
    });
}

function renderEvalCompareBar() {
    const d = SURVEY_DATA.evaluation;
    const compareLabels = ['ความเร็วค้นหา', 'เข้าถึงข้อมูล', 'ง่ายต่อเรียนรู้', 'อำนวยสะดวก'];
    const generalIdx = [6, 8, 10, 12]; // indices for general search
    const websiteIdx = [7, 9, 11, 13]; // indices for website
    const ctx = document.getElementById('evalCompareBar').getContext('2d');
    chartInstances.evalCompareBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: compareLabels,
            datasets: [
                { label: 'ค้นหาทั่วไป (Google)', data: generalIdx.map(i => d.averages[i]), backgroundColor: COLORS.orange.bg, borderColor: COLORS.orange.border, borderWidth: 1, borderRadius: 6 },
                { label: 'เว็บไซต์นี้', data: websiteIdx.map(i => d.averages[i]), backgroundColor: COLORS.indigo.bg, borderColor: COLORS.indigo.border, borderWidth: 1, borderRadius: 6 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: c => `${c.dataset.label}: ${c.parsed.y.toFixed(2)}` } } },
            scales: {
                y: { beginAtZero: false, min: 3.5, max: 5, ticks: { stepSize: 0.5 }, grid: { color: 'rgba(230,170,120,0.1)' } },
                x: { grid: { display: false }, ticks: { font: { size: 13 } } }
            }
        }
    });
}

function renderEvalSatisfactionPolar() {
    const d = SURVEY_DATA.evaluation;
    const idx = d.categories.satisfaction.indices;
    const ctx = document.getElementById('evalSatisfactionPolar').getContext('2d');
    chartInstances.evalSatPolar = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: idx.map(i => d.labels[i]),
            datasets: [{
                data: idx.map(i => d.averages[i]),
                backgroundColor: [COLORS.purple.bg, COLORS.cyan.bg, COLORS.green.bg],
                borderColor: [COLORS.purple.border, COLORS.cyan.border, COLORS.green.border],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { r: { beginAtZero: false, min: 3.5, max: 5, ticks: { stepSize: 0.5, backdropColor: 'transparent' }, grid: { color: 'rgba(230,170,120,0.15)' } } },
            plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }
        }
    });
}

function renderEvalSatisfactionDoughnut() {
    const dist = SURVEY_DATA.evaluation.distributions[16];
    const labels = ['คะแนน 1', 'คะแนน 2', 'คะแนน 3', 'คะแนน 4', 'คะแนน 5'];
    const data = [dist["1"]||0, dist["2"]||0, dist["3"]||0, dist["4"]||0, dist["5"]||0];
    const bgColors = [COLORS.red.bg, COLORS.orange.bg, 'rgba(234,179,8,0.7)', COLORS.blue.bg, COLORS.green.bg];
    const bdColors = [COLORS.red.border, COLORS.orange.border, '#eab308', COLORS.blue.border, COLORS.green.border];
    const ctx = document.getElementById('evalSatisfactionDoughnut').getContext('2d');
    chartInstances.evalSatDoughnut = new Chart(ctx, {
        type: 'doughnut',
        data: { labels, datasets: [{ data, backgroundColor: bgColors, borderColor: bdColors, borderWidth: 2, hoverOffset: 10 }] },
        options: {
            responsive: true, maintainAspectRatio: false, cutout: '50%',
            plugins: {
                legend: { position: 'bottom' },
                tooltip: { callbacks: { label: c => `${c.label}: ${c.raw} คน (${((c.raw/51)*100).toFixed(1)}%)` } },
                datalabels: {
                    display: (ctx) => ctx.dataset.data[ctx.dataIndex] > 0,
                    color: '#3d2c1e',
                    font: { weight: 'bold', size: 12 },
                    formatter: (value, ctx) => {
                        const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        return ((value / total) * 100).toFixed(1) + '%';
                    }
                }
            }
        }
    });
}

// ========== REQUIREMENTS CHARTS ==========

function renderReqBarChart() {
    const d = SURVEY_DATA.requirements;
    const ctx = document.getElementById('reqBarChart').getContext('2d');
    chartInstances.reqBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: d.labels,
            datasets: [{
                label: 'ค่าเฉลี่ย', data: d.averages,
                backgroundColor: [COLORS.purple.bg, COLORS.blue.bg, COLORS.green.bg, COLORS.orange.bg, COLORS.pink.bg, COLORS.cyan.bg],
                borderColor: [COLORS.purple.border, COLORS.blue.border, COLORS.green.border, COLORS.orange.border, COLORS.pink.border, COLORS.cyan.border],
                borderWidth: 1, borderRadius: 8, borderSkipped: false
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { min: 4.0, max: 5, ticks: { stepSize: 0.25 }, grid: { color: 'rgba(230,170,120,0.1)' } },
                x: { grid: { display: false }, ticks: { font: { size: 11 } } }
            }
        }
    });
}

function renderReqRadarChart() {
    const d = SURVEY_DATA.requirements;
    const ctx = document.getElementById('reqRadarChart').getContext('2d');
    chartInstances.reqRadar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: d.labels,
            datasets: [{
                label: 'ค่าเฉลี่ย', data: d.averages,
                backgroundColor: 'rgba(244, 148, 94, 0.15)', borderColor: '#f4945e',
                borderWidth: 2, pointBackgroundColor: '#f4945e', pointRadius: 5, pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { r: { beginAtZero: false, min: 4.0, max: 5, ticks: { stepSize: 0.25, backdropColor: 'transparent' }, grid: { color: 'rgba(230,170,120,0.15)' }, angleLines: { color: 'rgba(230,170,120,0.15)' }, pointLabels: { font: { size: 11 } } } },
            plugins: { legend: { display: false } }
        }
    });
}

function renderReqStackedBar() {
    const d = SURVEY_DATA.requirements;
    const ctx = document.getElementById('reqStackedBar').getContext('2d');
    const scoreColors = { 3: 'rgba(234,179,8,0.7)', 4: 'rgba(59,130,246,0.7)', 5: 'rgba(16,185,129,0.7)' };
    const scoreBorders = { 3: '#eab308', 4: '#3b82f6', 5: '#10b981' };
    const datasets = [3, 4, 5].map(score => ({
        label: `คะแนน ${score}`,
        data: d.distributions.map(dist => dist[score] || 0),
        backgroundColor: scoreColors[score], borderColor: scoreBorders[score],
        borderWidth: 1, borderRadius: 4
    }));
    chartInstances.reqStacked = new Chart(ctx, {
        type: 'bar',
        data: { labels: d.labels, datasets },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: {
                x: { stacked: true, grid: { display: false }, ticks: { font: { size: 11 } } },
                y: { stacked: true, grid: { color: 'rgba(230,170,120,0.1)' }, title: { display: true, text: 'จำนวนคน' } }
            }
        }
    });
}

function renderReqPolarChart() {
    const d = SURVEY_DATA.requirements;
    const ctx = document.getElementById('reqPolarChart').getContext('2d');
    chartInstances.reqPolar = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: d.labels,
            datasets: [{ data: d.averages, backgroundColor: [COLORS.purple.bg, COLORS.blue.bg, COLORS.green.bg, COLORS.orange.bg, COLORS.pink.bg, COLORS.cyan.bg], borderColor: [COLORS.purple.border, COLORS.blue.border, COLORS.green.border, COLORS.orange.border, COLORS.pink.border, COLORS.cyan.border], borderWidth: 2 }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { r: { beginAtZero: false, min: 4.0, max: 5, ticks: { stepSize: 0.25, backdropColor: 'transparent' }, grid: { color: 'rgba(230,170,120,0.15)' } } },
            plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }
        }
    });
}

// ========== COMPARISON CHARTS ==========

function renderComparisonChart() {
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    const categories = ['การออกแบบ\nหน้าจอ', 'เปรียบเทียบ\nความสะดวก', 'ความพึงพอใจ\nต่อระบบ', 'ค่าเฉลี่ยรวม'];
    const evalCats = SURVEY_DATA.evaluation.categories;
    const evalAvgs = [evalCats.design, evalCats.comparison, evalCats.satisfaction].map(
        cat => parseFloat((cat.indices.reduce((s, i) => s + SURVEY_DATA.evaluation.averages[i], 0) / cat.indices.length).toFixed(2))
    );
    evalAvgs.push(SURVEY_DATA.evaluation.overallAverage);
    const reqAvg = SURVEY_DATA.requirements.overallAverage;
    chartInstances.comparison = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [
                { label: 'แบบประเมิน', data: evalAvgs, backgroundColor: COLORS.indigo.bg, borderColor: COLORS.indigo.border, borderWidth: 1, borderRadius: 8 },
                { label: 'แบบสอบถาม', data: [null, null, null, reqAvg], backgroundColor: COLORS.green.bg, borderColor: COLORS.green.border, borderWidth: 1, borderRadius: 8 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: c => c.raw ? `${c.dataset.label}: ${c.raw.toFixed(2)}` : '' } } },
            scales: {
                y: { min: 3.5, max: 5, ticks: { stepSize: 0.25 }, grid: { color: 'rgba(230,170,120,0.1)' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function renderCompGenderChart() {
    const ctx = document.getElementById('compGenderChart').getContext('2d');
    const totalMale = SURVEY_DATA.evaluation.genders['ชาย'] + SURVEY_DATA.requirements.genders['ชาย'];
    const totalFemale = SURVEY_DATA.evaluation.genders['หญิง'] + SURVEY_DATA.requirements.genders['หญิง'];
    chartInstances.compGender = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['ชาย', 'หญิง'],
            datasets: [{ data: [totalMale, totalFemale], backgroundColor: [COLORS.blue.bg, COLORS.pink.bg], borderColor: [COLORS.blue.border, COLORS.pink.border], borderWidth: 2, hoverOffset: 10 }]
        },
        options: {
            responsive: true, maintainAspectRatio: false, cutout: '55%',
            plugins: {
                legend: { position: 'bottom' },
                tooltip: { callbacks: { label: c => `${c.label}: ${c.raw} คน (${((c.raw/(totalMale+totalFemale))*100).toFixed(1)}%)` } },
                datalabels: {
                    display: true,
                    color: '#3d2c1e',
                    font: { weight: 'bold', size: 13 },
                    formatter: (value, ctx) => {
                        const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        return ((value / total) * 100).toFixed(1) + '%';
                    }
                }
            }
        }
    });
}

// ========== SCORE TABLES ==========

function renderScoreTables() {
    // Evaluation table
    const tbody1 = document.querySelector('#evalScoreTable tbody');
    const d1 = SURVEY_DATA.evaluation;
    d1.labels.forEach((label, i) => {
        const dist = d1.distributions[i];
        const row = document.createElement('tr');
        const maxVal = Math.max(...Object.values(dist));
        row.innerHTML = `<td>${label}</td>` +
            [1,2,3,4,5].map(s => {
                const v = dist[s] || 0;
                const intensity = maxVal > 0 ? v / maxVal : 0;
                const bg = v > 0 ? `rgba(244, 148, 94, ${intensity * 0.35})` : 'transparent';
                return `<td class="heat-cell" style="background:${bg}">${v}</td>`;
            }).join('') +
            `<td class="avg-cell">${d1.averages[i].toFixed(2)}</td>`;
        tbody1.appendChild(row);
    });

    // Requirements table
    const tbody2 = document.querySelector('#reqScoreTable tbody');
    const d2 = SURVEY_DATA.requirements;
    d2.labels.forEach((label, i) => {
        const dist = d2.distributions[i];
        const row = document.createElement('tr');
        const maxVal = Math.max(...Object.values(dist));
        row.innerHTML = `<td>${label}</td>` +
            [1,2,3,4,5].map(s => {
                const v = dist[s] || 0;
                const intensity = maxVal > 0 ? v / maxVal : 0;
                const bg = v > 0 ? `rgba(244, 148, 94, ${intensity * 0.35})` : 'transparent';
                return `<td class="heat-cell" style="background:${bg}">${v}</td>`;
            }).join('') +
            `<td class="avg-cell">${d2.averages[i].toFixed(2)}</td>`;
        tbody2.appendChild(row);
    });
}

// ========== INIT ALL CHARTS ==========

function initAllCharts() {
    renderOverviewBarChart1();
    renderOverviewBarChart2();
    renderGenderCharts();
    renderStatusCharts();
    renderEvalDesignBar();
    renderEvalDesignRadar();
    renderEvalCompareBar();
    renderEvalSatisfactionPolar();
    renderEvalSatisfactionDoughnut();
    renderReqBarChart();
    renderReqRadarChart();
    renderReqStackedBar();
    renderReqPolarChart();
    renderComparisonChart();
    renderCompGenderChart();
    renderScoreTables();
}
