<script setup lang="ts">
import BaseTooltip from "./BaseTooltip.vue";

import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { draw as drawLineChart } from "../services/charts";
import { getDataPoints } from "../services/requests";
import { RatingDataPoint } from "../types";


const dataset = await getDataPoints();

const chart = ref(null);

onMounted(() => {
    if (!chart.value) throw new Error("ref is undefined");
    drawLineChart(dataset)
})

const showTooltip = (event: CustomEvent) => {
    const datum = event.detail as RatingDataPoint
    console.log(datum.rating); 
}

const hideTooltip = (event: CustomEvent) => {
    const datum = event.detail
}

</script>

<template>
    <article class="graphgroup-wrapper">
        <BaseTooltip class="tooltip"/>
        <article @tooltipenter="showTooltip" @tooltipexit="hideTooltip" ref="chart" id="chart" />
    </article>
</template>

<style>

.tooltip {
    border: crimson 1px solid;
}

.graphgroup-wrapper {
    display: grid;
    grid-template-columns: 1fr 3fr;
    width: 80%;
    height: 50%;
    min-width: 160px;
    aspect-ratio: 16/9;
}

#chart {
    border: blueviolet 1px solid;
    margin: auto;
}
</style>
