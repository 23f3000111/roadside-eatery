// Prefix a public asset path with Vite's base URL.
// Locally BASE_URL is "/"; on GitHub Pages it's "/roadside-eatery/", so
// public assets resolve correctly in both places.
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
