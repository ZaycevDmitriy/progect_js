const validateCalculated = (price = 100) => {
  const calcElems = document.querySelectorAll('.calc-item'),
    calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcSquare = document.querySelector('.calc-square'),
    calcCount = document.querySelector('.calc-count'),
    calcDay = document.querySelector('.calc-day'),
    calcTotal = document.getElementById('total');

  calcElems.forEach((input) => {
    if (!input.classList.contains('calc-type')) {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '');
      });
    }
  });

  const animateCount = (total) => {
    let timerId;
    clearInterval(timerId);
    let count = 0;
    const speed = 200;
    const inc = total / speed;

    timerId = setInterval(() => {
      if (total > count) {
        count = count + inc;
        calcTotal.textContent = Math.round(count);
      } else {
        clearInterval(timerId);
        count = 0;
      }
    }, 5);
  };

  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1;
    const typeValue = calcType.options[calcType.selectedIndex].value,
      squareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = Math.round(price * typeValue * squareValue * countValue * dayValue);
    }

    // calcTotal.textContent = total;
    if (total > 0) animateCount(total);
  };

  calcBlock.addEventListener('change', (event) => {
    const target = event.target;

    if (target.matches('select') || target.matches('input')) countSum();
  });
};

export default validateCalculated;
