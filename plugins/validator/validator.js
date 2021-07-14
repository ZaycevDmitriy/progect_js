class Validator {
  constructor({ selector, patter, method }) {
    this.form = document.querySelectorAll(selector);
    this.patter = patter;
    this.method = method;
    this.elementsForm = this.filteredElementsForm();
  }

  init() {
    this.applyStyles();
    this.filteredElementsForm();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
    console.log(this.elementsForm);
  }

  isValid(elem) {
    return false;
  }

  checkIt() {
    const target = event.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
    } else {
      this.showError(target);
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
    if (elem.nextElementSibling.classList.contains('validator-error')) {
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
    if (elem.nextElementSibling.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    }
  }

  applyStyles() {
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        border: 2px solid green !important;
      }
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
}