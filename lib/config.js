import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import projectConfigVariables from "../variables";

// lib/config.js
export const config = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: projectConfigVariables.dataset,
  projectId: projectConfigVariables.projectId,
  apiVersion: "2021-10-21", // Learn more: https://www.sanity.io/docs/api-versioning
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
  useCdn: process.env.NODE_ENV === "production",

  /**
   * OPTIONAL config to enable authentication with custom token
   * You might need this if you host the preview on a different url than Sanity Studio
   */
  token: process.env.SANITY_AUTH_TOKEN,
  // EventSource: /* provide your own event source implementation. Required in browsers to support the above token parameter. */
};

const sanityClient = createClient(config);
export default sanityClient;
export const urlFor = (source) => createImageUrlBuilder(config).image(source);
