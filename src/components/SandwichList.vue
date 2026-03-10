<script setup lang="ts">
import { useSandwichStore } from '@/stores/sandwich'
import { storeToRefs } from 'pinia'

const store = useSandwichStore()
const { savedSandwiches } = storeToRefs(store)
</script>

<template>
  <div>
    <h2>Sandwichs sauvegardés ({{ savedSandwiches.length }})</h2>

    <!-- Afficher un message vide si aucun sandwich -->
    <p v-if="savedSandwiches.length === 0">Aucun sandwich sauvegardé.</p>

    <ul v-else>
      <li v-for="sandwich in savedSandwiches" :key="sandwich.id">
        <span>{{ sandwich.bread }} · {{ sandwich.filling }} · {{ sandwich.cheese }} · {{ sandwich.sauce }}</span>
        <button @click="store.remove(sandwich.id)">🗑️ Supprimer</button>
      </li>
    </ul>
  </div>
</template>