<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { draw } from "../services/charts";
import { getDataPoints } from "../services/requests";
import { SVGDimensions } from "../types";

const dimensions: SVGDimensions = {
        height: 500,
        width: 800,
        margin: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
        }
    }

const dataset = await getDataPoints();

const chart = ref(null);

onMounted(() => {
    if (!chart.value) throw new Error("ref is undefined"); 
    draw(dataset, dimensions, chart.value)
})
</script>

<template>
    <article ref="chart" id="chart"></article>
</template>

<style>
svg {
    width: 100vw;
    height: 100vw;
}
</style>
