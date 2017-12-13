import Fuse from 'fuse.js';

import { searchOptions } from './options';

import {
    KEY_ENTER,
    KEY_ESCAPE
} from './constants';

const QUERY_EMPTY = '';

export const toHashMap = (list) => {
    return list.reduce((previousValue, currentValue, currentIndex) => {
        previousValue[currentValue.name] = currentValue;
        return previousValue;
    }, {});
}

export const getMessageForFoundReposCount = (count) => {
    if (count <= 0) {
        return '<strong>No repositories found</strong>'
    }
    const repoText = count === 1 ? 'repository' : 'repositories';
    return `Found <strong>${count}</strong> ${repoText}`;
}

export const searchAndRenderResultsCounter = (count) => {
    const counterElement = document.querySelector('.search-counter');
    counterElement.innerHTML = getMessageForFoundReposCount(count);
    counterElement.classList.remove('search-counter--hidden');
}

export const hideSearchResultsCounter = () => {
    const counterElement = document.querySelector('.search-counter');
    counterElement.classList.add('search-counter--hidden');
}

export default class SearchView {
    constructor(options) {
        this.onSubmit = this.onSubmit.bind(this);
        this.onInput  = this.onInput.bind(this);
        this.elements = { form: null, input: null };
        this.list = [];
        this.options = Object.assign({
            listRenderer: () => {},
            selector: null
        }, options);
    }

    setList(list) {
        this.fuse = new Fuse(list, searchOptions);
        this.list = list;
    }

    onSubmit(event) {
        event.preventDefault();
    }

    onInput(event) {
        if (event.keyCode === KEY_ESCAPE) {
            this.elements.input.value = QUERY_EMPTY;
            this.searchAndRenderResults(QUERY_EMPTY);
            return;
        }
        const query = this.elements.input.value;
        this.searchAndRenderResults(query);
    }

    mount() {
        const form = document.querySelector(this.options.selector);
        this.elements.form = form;
        this.elements.input = document.querySelector('input[type="search"]', form);
        this.elements.form.addEventListener('submit', this.onSubmit);
        this.elements.input.addEventListener('input', this.onInput);
    }

    unmount() {
        this.elements.form.removeEventListener('submit', this.onSubmit);
        this.elements.input.removeEventListener('input', this.onInput);
        this.elements.form = null;
        this.elements.input = null;
    }

    search(query) {
        const results = this.fuse.search(query);
        const repoHashMap = toHashMap(this.list);
        return results.map(name => repoHashMap[name]);
    }

    searchAndRenderResults(query) {
        if (query.trim() === QUERY_EMPTY) {
            this.options.listRenderer(this.list);
            hideSearchResultsCounter();
            return;
        }
        const searchResults = this.search(query);
        const count = searchResults.length;

        this.options.listRenderer(searchResults);
        searchAndRenderResultsCounter(count);
    }
}
