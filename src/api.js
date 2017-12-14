import { URL_REPOS } from './constants';

const sortByStarGazers = ( repoA, repoB ) => {
    if (repoA.stargazers_count > repoB.stargazers_count) {
        return -1;
    }
    if (repoA.stargazers_count < repoB.stargazers_count) {
        return 1;
    }
    return 0;
}

export const fetchRepos = () =>
    fetch(URL_REPOS)
        .then(response => response.json())
        .then(repoList => repoList.sort(sortByStarGazers));
