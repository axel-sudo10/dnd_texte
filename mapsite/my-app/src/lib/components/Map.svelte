<script lang="ts">
  import { onMount } from 'svelte';
  import type { Map as LeafletMap } from 'leaflet';

  let mapContainer: HTMLDivElement;
  let map: LeafletMap;

  onMount(async () => {
    // Import CSS
    import('leaflet/dist/leaflet.css');
    // Dynamically import Leaflet only on the client-side
    const L = (await import('leaflet')).default;

    // Since the image is 2500x2500, we can set the bounds accordingly.
    const bounds: L.LatLngBoundsExpression = [[0, 0], [2500, 2500]];

    // Create the map
    map = L.map(mapContainer, {
      crs: L.CRS.Simple,
      minZoom: 0, // Allow some zoom out to see the whole map
      maxBounds: bounds, // Restrict view to the image bounds
    });

    // Add the image overlay
    L.imageOverlay('/atoll.png', bounds).addTo(map);

    // Fit the map to the image bounds
    map.fitBounds(bounds);

    // Invalidate map size after component is mounted and rendered
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  });
</script>

<div bind:this={mapContainer} class="map-container"></div>

<style>
  .map-container {
    width: 100svw;
    height: 100svh; /* Use vh for viewport height */
  }
</style>
