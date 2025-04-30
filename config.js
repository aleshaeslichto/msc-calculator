// Статические данные о ставках (временно)
const rateOptions = [
    { id: 'base', name: 'Базовая программа', annuity: 12, diff: 14 },
    { id: 'lotoffamily', name: 'Многодетная семья', annuity: 8, diff: 10 },
    { id: 'junfamily', name: 'Молодая семья', annuity: 9, diff: 13 },
];

// Функция для получения актуальной ставки по выбранной программе и типу платежа
async function fetchRate(rateId, paymentType) {
    // Эмулируем задержку при запросе к API
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const option = rateOptions.find((r) => r.id === rateId);
            if (!option) {
                reject('Неизвестный тип кредита');
            } else if (!option[paymentType]) {
                reject('Нет ставки для данного типа платежа');
            } else {
                resolve(option[paymentType]);
            }
        }, 500); // эмуляция сети
    });
}

/* async function fetchRate(rateId, paymentType) {
    const response = await fetch(
        `https://api.example.com/rate?program=${rateId}&type=${paymentType}`
    );
    if (!response.ok) throw new Error('Ошибка загрузки ставки');
    const data = await response.json();
    return data.rate;
} */

// Экспортируем rateOptions в глобальную область видимости
window.rateOptions = rateOptions;
window.fetchRate = fetchRate;
