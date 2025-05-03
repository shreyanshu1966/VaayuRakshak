// Fix for Leaflet marker icons in TypeScript
// This is needed because the Leaflet marker icon paths are relative URLs that don't work correctly in React

declare module 'leaflet' {
  namespace Marker {
    interface ExtraOptions {
      icon?: L.Icon<L.IconOptions>;
    }
  }
}