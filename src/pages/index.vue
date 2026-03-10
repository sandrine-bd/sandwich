<script setup lang="ts">
import SandwichGenerator from '@/components/SandwichGenerator.vue'
import SandwichList from '@/components/SandwichList.vue'
</script>

<template>
  <main>
    <h1>🥖 Générateur de Sandwich</h1>
    <RouterLink to="/admin">⚙️ Gérer les ingrédients</RouterLink>
    <SandwichGenerator />
    <hr />
    <SandwichList />
  </main>
</template>
