<script lang="ts">
    import { onMount } from "svelte";
    import maplibregl from "maplibre-gl";
    import "maplibre-gl/dist/maplibre-gl.css";

    let mapContainer: HTMLDivElement;
    let map: maplibregl.Map;

    onMount(() => {
        map = new maplibregl.Map({
            container: mapContainer,
            style: {
                version: 8,
                sources: {},
                layers: [],
            },
            center: [0, 0],
            zoom: 4,
            renderWorldCopies: false,
            maxZoom: 6,
        });
        map.on("load", () => {
            map.addSource("fantasy-map", {
                type: "raster",
                tiles: ["/tiles/{z}/{x}/{y}.png"],
                tileSize: 256,
                maxzoom: 5,
            });

            map.addLayer({
                id: "fantasy-layer",
                type: "raster",
                source: "fantasy-map",
                paint: {
                    "raster-fade-duration": 0,
                },
            });
        });

        return () => {
            map.remove();
        };
    });
</script>

<div class="map-wrap" bind:this={mapContainer}></div>

<style>
    .map-wrap {
        width: 100%;
        height: calc(100vh - 77px);
    }
</style>
