<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { draw as drawLineChart } from "../services/charts";
import { getDataPoints } from "../services/requests";

const dataset = await getDataPoints();

const chart = ref(null);

onMounted(() => {
    if (!chart.value) throw new Error("ref is undefined"); 
    drawLineChart(dataset)
})
</script>

<template>
    <article ref="chart" id="chart"/>
</template>

<style>
    #chart {
        width: 80%;
        height: 50%;
        min-width: 160px;
        aspect-ratio: 16/9;
        border: blueviolet 1px solid;
        margin: auto;
    }

</style>
