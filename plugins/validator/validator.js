class Validator {
  constructor({ selector, pattern = {}, method }) {
    this.form = document.querySelectorAll(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = this.filteredElementsForm();
    this.error = new Set();
  }

  init() {
    this.applyStyles();
    this.setPattern();
    this.filteredElementsForm();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
    this.form.forEach(form => {
      form.addEventListener('submit', e => {
        const target = e.target;
        [...target.elements].forEach(elem => this.checkIt({target: elem}));
        if (this.error.size) {
          e.preventDefault();
        }
      });
    });
  }

  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === '') {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      },
    };

    if (this.method) {
      const method = this.method[elem.dataset.input];

      if (method) {
        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn('Необходимо передать дата атрибут и методы проверки этих полей');
    }

    return true;
  }

  checkIt(event) {
    const target = event.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  filteredElementsForm() {
    let formElementsArray = [];
    this.form.forEach((form) => {
      const array = [...form.elements].filter((item) => {
        return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
      });
      formElementsArray = formElementsArray.concat(array);
    });
    return formElementsArray;
  }

  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');
    if (elem.nextElementSibling?.classList.contains('validator-error')) {
      return;
    }
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');
    if (elem.nextElementSibling?.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    }
  }

  applyStyles() {
    const style = document.createElement('style');
    style.textContent = `
      textarea.error,
      input.success {
        border: 2px solid green !important;
      }
      textarea.error,
      input.error {
        border: 2px solid red !important;
      }
      .validator-error {
        font-size: 12px;
        color: red;
        font-family: sans-serif;
      }`;

    document.head.append(style);
  }

  setPattern() {
    this.pattern.phone = this.pattern.phone ? this.pattern.phone : this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;

    this.pattern.email = this.pattern.email ? this.pattern.email : this.pattern.email = /^\w+@\w+\.\w{2,}$/;

  }
}