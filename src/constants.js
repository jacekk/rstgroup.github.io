// client_id and client_secret belong to a dummy app.
// Nothing of any value is there.
export const CLIENT_ID = '8b3487982bc3693b68f8';
export const CLIENT_SECRET = '039dca12108cb4985c3fa01d9950f203c0bb745e';

export const REPOS_PER_PAGE = 1000;

export const URL_REPOS = `https://api.github.com/orgs/rstgroup/repos?per_page=${REPOS_PER_PAGE}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

export const KEY_ENTER = 13;
export const KEY_ESCAPE = 27;
