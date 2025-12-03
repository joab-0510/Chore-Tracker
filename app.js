import React, { useState } from 'react';
import { Check, X, DollarSign, Calendar } from 'lucide-react';

const ChoreTracker = () => {
const startDate = new Date('2025-11-24');

const getWeekDates = (weekOffset = 0) => {
const dates = [];
const currentStart = new Date(startDate);
currentStart.setDate(currentStart.getDate() + (weekOffset * 14));

for (let i = 0; i < 14; i++) {
const date = new Date(currentStart);
date.setDate(date.getDate() + i);
if (date.getDay() !== 0 && date.getDay() !== 6) {
dates.push(date);
}
}
return dates;
};

const [currentPeriod, setCurrentPeriod] = useState(0);
const [chores, setChores] = useState(() => {
const initial = {};
for (let period = 0; period < 10; period++) {
const dates = getWeekDates(period);
dates.forEach(date => {
const key = date.toISOString().split('T')[0];
initial[key] = { teen1: null, teen2: null };
});
}
return initial;
});

const weekDates = getWeekDates(currentPeriod);

const choreSchedule = {
1: { teen1: 'Deep clean floor (pick up everything)', teen2: 'Deep vacuum (move stuff, get corners)' },
2: { teen1: 'Clean counters', teen2: 'Organize things on counters' },
3: { teen1: 'Clean dishes and sink', teen2: 'Wash and dry clothes' },
4: { teen1: 'Take out trash', teen2: 'Wipe down bathroom' },
5: { teen1: 'Wipe down bathtub', teen2: 'Pick up trash from floor/beds' }
};

const toggleChore = (dateKey, teen) => {
setChores(prev => ({
...prev,
[dateKey]: {
...prev[dateKey],
[teen]: prev[dateKey][teen] === null ? true : prev[dateKey][teen] ? false : null
}
}));
};

const calculatePay = (teen) => {
let total = 0;
weekDates.forEach(date => {
const key = date.toISOString().split('T')[0];
if (chores[key]?.[teen] === true) {
total += 2.50;
}
});
return total;
};

const formatDate = (date) => {
return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
};

const getStatusIcon = (status) => {
if (status === true) return React.createElement(Check, { className: "w-5 h-5 text-green-600" });
if (status === false) return React.createElement(X, { className: "w-5 h-5 text-red-600" });
return React.createElement('div', { className: "w-5 h-5 border-2 border-gray-300 rounded" });
};

return React.createElement('div', { className: "max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen" },
React.createElement('div', { className: "bg-white rounded-lg shadow-lg p-6 mb-6" },
React.createElement('div', { className: "flex items-center justify-between mb-6" },
React.createElement('div', { className: "flex items-center gap-3" },
React.createElement(Calendar, { className: "w-8 h-8 text-blue-600" }),
React.createElement('h1', { className: "text-3xl font-bold text-gray-800" }, 'Teen Chore Tracker')
),
React.createElement('div', { className: "flex gap-2" },
React.createElement('button', {
onClick: () => setCurrentPeriod(Math.max(0, currentPeriod - 1)),
disabled: currentPeriod === 0,
className: "px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
}, '← Previous'),
React.createElement('button', {
onClick: () => setCurrentPeriod(currentPeriod + 1),
className: "px-4 py-2 bg-gray-200 rounded"
}, 'Next →')
)
),
React.createElement('div', { className: "bg-blue-50 border-l-4 border-blue-600 p-4 mb-6" },
React.createElement('p', { className: "text-sm text-gray-700" },
React.createElement('strong', null, 'Pay Period: '),
formatDate(weekDates[0]), ' - ', formatDate(weekDates[weekDates.length - 1]),
React.createElement('br'),
React.createElement('strong', null, 'Payment Date: '), 'Sunday, December 7th, 2025',
React.createElement('br'),
React.createElement('strong', null, 'Rate: '), '$2.50 per completed chore | ',
React.createElement('strong', null, 'Photo deadline: '), 'Alison by 4:00 PM, Jasmine by 5:00 PM'
)
),
React.createElement('div', { className: "mb-6 grid grid-cols-2 gap-4" },
React.createElement('div', { className: "bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200" },
React.createElement('div', { className: "flex items-center gap-2 mb-2" },
React.createElement(DollarSign, { className: "w-6 h-6 text-green-700" }),
React.createElement('h3', { className: "text-xl font-bold text-gray-800" }, 'Alison (14 yrs)')
),
React.createElement('p', { className: "text-sm text-gray-600 mb-2" }, 'Home: 3:30 PM | Deadline: 4:00 PM'),
React.createElement('div', { className: "text-3xl font-bold text-green-700" }, '$' + calculatePay('teen1').toFixed(2)),
React.createElement('p', { className: "text-sm text-gray-600" }, 'earned this period')
),
React.createElement('div', { className: "bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200" },
React.createElement('div', { className: "flex items-center gap-2 mb-2" },
React.createElement(DollarSign, { className: "w-6 h-6 text-purple-700" }),
React.createElement('h3', { className: "text-xl font-bold text-gray-800" }, 'Jasmine (15 yrs)')
),
React.createElement('p', { className: "text-sm text-gray-600 mb-2" }, 'Home: 4:30 PM | Deadline: 5:00 PM'),
React.createElement('div', { className: "text-3xl font-bold text-purple-700" }, '$' + calculatePay('teen2').toFixed(2)),
React.createElement('p', { className: "text-sm text-gray-600" }, 'earned this period')
)
),
React.createElement('div', { className: "overflow-x-auto" },
React.createElement('table', { className: "w-full border-collapse" },
React.createElement('thead', null,
React.createElement('tr', { className: "bg-gray-100" },
React.createElement('th', { className: "border p-3 text-left font-semibold" }, 'Date'),
React.createElement('th', { className: "border p-3 text-left font-semibold" }, "Alison's Chore"),
React.createElement('th', { className: "border p-3 text-center font-semibold" }, 'Done?'),
React.createElement('th', { className: "border p-3 text-left font-semibold" }, "Jasmine's Chore"),
React.createElement('th', { className: "border p-3 text-center font-semibold" }, 'Done?')
)
),
React.createElement('tbody', null,
weekDates.map((date) => {
const dateKey = date.toISOString().split('T')[0];
const dayOfWeek = date.getDay();
const schedule = choreSchedule[dayOfWeek];
const isMonday = dayOfWeek === 1;

return React.createElement('tr', {
key: dateKey,
className: isMonday ? 'bg-yellow-50' : 'hover:bg-gray-50'
},
React.createElement('td', { className: "border p-3" },
React.createElement('div', { className: "font-medium" }, formatDate(date)),
isMonday && React.createElement('div', { className: "text-xs text-yellow-700 font-semibold mt-1" }, 'DEEP CLEAN (15-20 min)'),
!isMonday && React.createElement('div', { className: "text-xs text-gray-500 mt-1" }, 'Maintenance (5-8 min)')
),
React.createElement('td', { className: "border p-3 text-sm" }, schedule?.teen1),
React.createElement('td', { className: "border p-3 text-center" },
React.createElement('button', {
onClick: () => toggleChore(dateKey, 'teen1'),
className: "hover:bg-gray-100 p-2 rounded transition-colors"
}, getStatusIcon(chores[dateKey]?.teen1))
),
React.createElement('td', { className: "border p-3 text-sm" }, schedule?.teen2),
React.createElement('td', { className: "border p-3 text-center" },
React.createElement('button', {
onClick: () => toggleChore(dateKey, 'teen2'),
className: "hover:bg-gray-100 p-2 rounded transition-colors"
}, getStatusIcon(chores[dateKey]?.teen2))
)
);
})
)
)
),
React.createElement('div', { className: "mt-6 p-4 bg-gray-100 rounded-lg" },
React.createElement('h3', { className: "font-bold mb-2 text-gray-800" }, 'How to Use:'),
React.createElement('ul', { className: "text-sm text-gray-700 space-y-1" },
React.createElement('li', null, '• Click the checkbox to mark chore as DONE (green check)'),
React.createElement('li', null, '• Click again to mark as NOT DONE/needs redo (red X)'),
React.createElement('li', null, '• Click a third time to reset to pending (empty box)'),
React.createElement('li', null, '• Each completed chore = $2.50 added to their total'),
React.createElement('li', null, '• Pay them Sunday, December 7th based on the totals shown above'),
React.createElement('li', null, '• Monday = Deep cleaning day (15-20 min), rest of week = maintenance (5-8 min)')
)
)
)
);
};

ReactDOM.render(React.createElement(ChoreTracker), document.getElementById('root'));
