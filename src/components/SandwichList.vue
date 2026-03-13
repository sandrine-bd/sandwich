<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSandwichStore } from '@/stores/sandwich'
import { storeToRefs } from 'pinia'

const store = useSandwichStore()
const { savedSandwiches, totalSaved } = storeToRefs(store)

const filterQuery = ref('')

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
  <section class="list-section">
    <!-- En-tête avec compteur -->
    <div class="list-section__header">
      <h2>Carnet de recettes</h2>
      <span class="badge">{{ totalSaved }}</span>
    </div>

    <!-- Filtre -->
    <div class="list-section__filter" v-if="savedSandwiches.length > 0">
      <input
        class="input"
        v-model="filterQuery"
        placeholder="Filtrer par ingrédient..."
        type="search"
      />
    </div>

    <!-- État vide -->
    <div v-if="savedSandwiches.length === 0" class="empty-state">
      Votre carnet est vide.<br>
      <small>Générez et sauvegardez votre premier sandwich.</small>
    </div>

    <template v-else>
      <!-- Aucun résultat de filtre -->
      <div v-if="filteredSandwiches.length === 0" class="empty-state">
        Aucun sandwich ne contient <em>« {{ filterQuery }} »</em>.
      </div>

      <!-- Liste -->
      <TransitionGroup name="list" tag="ul" class="saved-list" v-else>
        <li
          v-for="sandwich in filteredSandwiches"
          :key="sandwich.id"
          class="saved-item"
        >
          <div class="saved-item__info">
            <div class="saved-item__name">{{ sandwich.name }}</div>
            <div class="saved-item__details">
              {{ sandwich.bread }} · {{ sandwich.filling }} · {{ sandwich.cheese }} · {{ sandwich.sauce }}
            </div>
          </div>
          <button class="btn btn--danger" @click="store.remove(sandwich.id)">
            🗑 Suppr.
          </button>
        </li>
      </TransitionGroup>
    </template>
  </section>
</template>

<style scoped>
.list-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-section__header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.list-section__filter {
  max-width: 340px;
}

.saved-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Transitions TransitionGroup */
.list-enter-active { animation: slideIn 0.25s ease both; }
.list-leave-active {
  animation: slideIn 0.2s reverse ease both;
  position: absolute;
  width: 100%;
}
.list-move { transition: transform 0.25s ease; }
</style>
