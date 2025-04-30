// Функция заполнения выпадающего списка ставок
function populateRateTypes() {
    const select = document.getElementById('rateType');

    if (!select || !window.rateOptions) {
        console.error('rateOptions не найден или элемент rateType отсутствует');
        return;
    }

    select.innerHTML = ''; // очищаем перед заполнением

    window.rateOptions.forEach((option) => {
        const el = document.createElement('option');
        el.value = option.id;
        el.textContent = option.name;
        select.appendChild(el);
    });
}

// Расчёт аннуитетного платежа
function calculateAnnuity(amount, term, rate) {
    const monthlyRate = rate / 100 / 12;
    const pow = Math.pow(1 + monthlyRate, term);
    return (amount * (monthlyRate * pow)) / (pow - 1);
}

// Расчёт дифференцированного платежа
function calculateDiff(amount, term, rate) {
    const basePart = amount / term;
    const interestPart = (amount * rate) / 100 / 12;
    return basePart + interestPart;
}

// Обработчик кнопки рассчитать
async function calculate() {
    const amount = parseFloat(document.getElementById('amount').value);
    const term = parseInt(document.getElementById('term').value);
    const paymentType = document.getElementById('type').value;
    const rateId = document.getElementById('rateType').value;

    try {
        const rate = await fetchRate(rateId, paymentType);

        let payment = 0;
        if (paymentType === 'annuity') {
            payment = calculateAnnuity(amount, term, rate);
        } else if (paymentType === 'diff') {
            payment = calculateDiff(amount, term, rate);
        }

        // Показываем результат
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
        <strong>Ежемесячный платёж:</strong> ${payment.toFixed(2)} ₽<br/>
        <small>Программа: ${rateId}, ставка: ${rate}% годовых</small>
      `;
        resultDiv.classList.remove('hidden');

        // Показываем банки
        const banksListDiv = document.getElementById('banks-list');
        banksListDiv.innerHTML = `
        <h3>Банки, предлагающие эту программу:</h3>
        <ul>
          <li>Сбербанк</li>
          <li>ВТБ</li>
          <li>Тинькофф Банк</li>
          <li>Альфа-Банк</li>
        </ul>
      `;

        /*
      // Вместо статического списка
const banks = await fetchBanks(rateId); // например
banksListDiv.innerHTML = `
  <h3>Банки, предлагающие эту программу:</h3>
  <ul>
    ${banks.map(bank => `<li><a href="${bank.url}" target="_blank">${bank.name}</a></li>`).join("")}
  </ul>
`; 
      */
    } catch (error) {
        document.getElementById('result').innerHTML = '';
        document.getElementById('result').classList.add('hidden');
        document.getElementById('banks-list').innerHTML = '';
    }
}

// При загрузке DOM заполняем список ставок
window.addEventListener('DOMContentLoaded', () => {
    populateRateTypes();
});
