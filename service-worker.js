import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

// Define the manifest variable
// @ts-ignore
const manifest = self.__WB_MANIFEST;

// Precache and route any assets specified in self.__WB_MANIFEST
precacheAndRoute(manifest);

// Define a navigation route for handling client-side routing with React
const handler = createHandlerBoundToURL('/index.html');                                                
const navigationRoute = new NavigationRoute(handler);                                                
registerRoute(navigationRoute);                                                


