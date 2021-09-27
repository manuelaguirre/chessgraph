<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { draw as drawLineChart } from "../services/charts";
import { getDataPoints } from "../services/requests";
import { SVGDimensions } from "../types";

const dimensions: SVGDimensions = {
        height: 200,
        width: 300,
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
    drawLineChart(dataset, dimensions)
})
</script>

<template>
    <article ref="chart" id="chart"/>
</template>

<style>
    #chart {
        width: 50%;
        max-height: 70vh;
        margin: auto;

        border: blueviolet 1px solid;
    }


</style>
