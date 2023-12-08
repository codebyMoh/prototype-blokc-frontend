declare let self: ServiceWorkerGlobalScope;

// Add type definitions for self.__WB_MANIFEST if needed
interface WorkboxManifestEntry {
  // url: string;
  revision: string;
  // Add other properties as needed
}
declare const manifest: WorkboxManifestEntry[];
