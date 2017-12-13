import templatePolyfill from 'template-polyfill';

templatePolyfill();

export const showOrHideElementBasedOnData = (element, isVisible) => {
    if (!isVisible) {
        element.classList.add('repo-element--hidden');
        return;
    }
    element.classList.remove('repo-element--hidden');
}

export const setName = (template, repo) => {
    const nameEl = template.content.querySelector('.repo-name');
    nameEl.textContent = repo.name;
    nameEl.setAttribute('href', repo.html_url);
    template.content.querySelector('.repo-description').textContent = repo.description;
}

export const setLanguage = (template, repo) => {
    const languageElement = template.content.querySelector('.repo-element--language');
    languageElement.querySelector('.repo-value').textContent = repo.language;
    showOrHideElementBasedOnData(languageElement, !!repo.language);
}

export const setStars = (template, repo) => {
    const starsElement = template.content.querySelector('.repo-element--stars');
    starsElement.querySelector('.repo-value').textContent = repo.stargazers_count;
    showOrHideElementBasedOnData(starsElement, typeof repo.stars !== 'number');
}

export const setLicense = (template, repo) => {
    const licenseElement = template.content.querySelector('.repo-element--license');
    licenseElement.querySelector('.repo-value').textContent = repo.license && repo.license.spdx_id;
    showOrHideElementBasedOnData(licenseElement, !!(repo.license && repo.license.spdx_id));
}

export const setForks = (template, repo) => {
    const forksElement = template.content.querySelector('.repo-element--forks');
    forksElement.querySelector('.repo-value').textContent = repo.forks;
    showOrHideElementBasedOnData(forksElement, typeof repo.forks !== 'number');
}

export default class RepoListView {
    constructor(options) {
        this.repoList = [];
        this.options = Object.assign({
            selector: null,
            repoTemplateSelector: null,
        }, options);
        this.elements = {
            list: null,
            template: null
        };
        this.render = this.render.bind(this);
    }

    setList(list) {
        this.list = list;
    }

    mount() {
        this.elements.list = document.querySelector(this.options.selector);
        this.elements.template = document.querySelector(this.options.repoTemplateSelector);
    }

    unmount() {
        this.elements.list = null;
        this.elements.template = null;
    }

    removeAllRepoElement() {
        while (this.elements.list.firstChild) {
            this.elements.list.removeChild(this.elements.list.firstChild);
        }
    }

    renderElement(repo) {
        setName(this.elements.template, repo);
        setLanguage(this.elements.template, repo);
        setLicense(this.elements.template, repo);
        setStars(this.elements.template, repo);
        setForks(this.elements.template, repo);
        return document.importNode(this.elements.template.content, true);
    }

    render(list = this.list) {
        this.removeAllRepoElement();
        list.map((repo) => {
            return this.renderElement(repo)
        }).forEach((element) => {
            this.elements.list.appendChild(element)
        });
    }
}
