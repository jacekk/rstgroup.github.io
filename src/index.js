import 'whatwg-fetch';
import Promise from 'promise-polyfill';

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

import SearchView from './SearchView';
import RepoListView from './RepoListView';
import { showError } from './error';
import { fetchRepos } from './api';

const removeRepoLoadingMessage = () => {
    const loadingElement = document.querySelector('.loading');
    loadingElement.parentElement.removeChild(loadingElement);
}

window.addEventListener('load', () => {
    const repoListView = new RepoListView({
        selector: '#repoList',
        repoTemplateSelector: 'template#repoTmpl'
    });
    const searchView = new SearchView({
        selector: '#repoList',
        listRenderer: repoListView.render
    });
    fetchRepos()
        .then((repoList) => {
            removeRepoLoadingMessage();
            repoListView.setList(repoList);
            return repoList;
        })
        .then((repoList) => {
            searchView.mount();
            repoListView.mount();

            searchView.setList(repoList);
            repoListView.render();
        })
        .catch((error) => {
            console.error(error);
            showError('Could not fetch repositories');
        });
});
