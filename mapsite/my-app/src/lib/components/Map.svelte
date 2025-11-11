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
            zoom: 1,
            renderWorldCopies: false,
        });

        map.on("load", () => {
            map.addSource("atoll-map", {
                type: "image",
                url: "/atoll.png",
                coordinates: [
                    [-180, 85],
                    [180, 85],
                    [180, -85],
                    [-180, -85],
                ],
            });

            map.addLayer({
                id: "atoll-layer",
                type: "raster",
                source: "atoll-map",
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
