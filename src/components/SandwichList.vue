<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSandwichStore } from '@/stores/sandwich'
import { storeToRefs } from 'pinia'

const store = useSandwichStore()
const { savedSandwiches, totalSaved } = storeToRefs(store)

// État local : le texte de recherche
const filterQuery = ref('')

// Liste dérivée : on filtre sans modifier les données originales
const filteredSandwiches = computed(() => {
  const query = filterQuery.value.toLowerCase().trim()
  if (!query) return savedSandwiches.value

  return savedSandwiches.value.filter(s =>
    [s.bread, s.sauce, s.cheese, s.filling].some(
      ingredient => ingredient.toLowerCase().includes(query)
    )
  )
})
</script>

<template>
  <div>
    <!-- Compteur dans le titre -->
    <h2>Sandwichs sauvegardés ({{ totalSaved }})</h2>

    <!-- Champ de filtre -->
    <input
      v-model="filterQuery"
      placeholder="Filtrer par ingrédient..."
      type="search"
    />

    <!-- Afficher un message vide si aucun sandwich -->
    <p v-if="savedSandwiches.length === 0">Aucun sandwich sauvegardé.</p>

    <!-- Itérer sur filteredSandwiches -->
    <template v-else>
      <p v-if="filteredSandwiches.length === 0">Aucun résultat pour "{{ filterQuery }}".</p>
      <ul v-else>
        <li v-for="sandwich in filteredSandwiches" :key="sandwich.id">
          <span>{{ sandwich.bread }} · {{ sandwich.filling }} · {{ sandwich.cheese }} · {{ sandwich.sauce }}</span>
          <button @click="store.remove(sandwich.id)">🗑️ Supprimer</button>
        </li>
      </ul>
    </template>
  </div>
</template>