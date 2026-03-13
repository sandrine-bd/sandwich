<script setup lang="ts">
import { ref } from 'vue'
import { useIngredientsStore, type Category } from '@/stores/ingredients'
import { storeToRefs } from 'pinia'

const store = useIngredientsStore()
const { ingredients } = storeToRefs(store)

const newIngredient = ref<Record<Category, string>>({
  breads: '',
  sauces: '',
  cheeses: '',
  fillings: '',
})

const labels: Record<Category, { emoji: string; title: string }> = {
  breads:   { emoji: '🍞', title: 'Pains' },
  sauces:   { emoji: '🥫', title: 'Sauces' },
  cheeses:  { emoji: '🧀', title: 'Fromages' },
  fillings: { emoji: '🥩', title: 'Garnitures' },
}

function add(category: Category) {
  store.addIngredient(category, newIngredient.value[category])
  newIngredient.value[category] = ''
}
</script>

<template>
  <div>
    <!-- En-tête -->
    <header class="admin-header">
      <RouterLink to="/" class="btn btn--ghost">← Retour</RouterLink>
      <div class="admin-header__title">
        <div class="admin-header__eyebrow">Administration</div>
        <h1>Gestion des <em>ingrédients</em></h1>
      </div>
    </header>

    <!-- Grille des catégories -->
    <div class="admin-grid">
      <div
        v-for="(meta, category) in labels"
        :key="category"
        class="admin-card"
      >
        <h2>{{ meta.emoji }} {{ meta.title }}</h2>

        <!-- Tags des ingrédients existants -->
        <div class="admin-card__tags">
          <TransitionGroup name="tag">
            <span
              v-for="item in ingredients[category]"
              :key="item"
              class="admin-tag"
            >
              {{ item }}
              <button
                @click="store.removeIngredient(category, item)"
                :title="`Supprimer ${item}`"
              >✕</button>
            </span>
          </TransitionGroup>
        </div>

        <!-- Ajout -->
        <div class="admin-card__add">
          <input
            class="input"
            v-model="newIngredient[category]"
            placeholder="Nouvel ingrédient..."
            @keyup.enter="add(category)"
          />
          <button class="btn" @click="add(category)">＋</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem 0 2.5rem;
}

.admin-header__eyebrow {
  font-family: 'Special Elite', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--mustard-dk);
  margin-bottom: 0.3rem;
}

.admin-header__title h1 {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
}

.admin-header__title em {
  font-style: italic;
  color: var(--brick);
}

.admin-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 1rem;
  min-height: 2rem;
}

.admin-card__add {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.admin-card__add .input {
  flex: 1;
}

.admin-card__add .btn {
  flex-shrink: 0;
}

/* Transitions tags */
.tag-enter-active { animation: fadeIn 0.2s ease both; }
.tag-leave-active { animation: fadeIn 0.15s reverse ease both; }
</style>
