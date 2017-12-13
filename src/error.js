export const showError = (errorMessage) => {
    const errorMessageElement = document.querySelector('.errorMessage');
    const errorMessageTextElement = document.querySelector('.errorMessage-text');
    errorMessageElement.classList.remove('errorMessage--hidden');
    errorMessageTextElement.textContent = errorMessage;
}