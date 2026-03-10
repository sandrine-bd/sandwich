<script setup lang="ts">
import { ref } from 'vue'
import { useIngredientsStore, type Category } from '@/stores/ingredients'
import { storeToRefs } from 'pinia'

const store = useIngredientsStore()
const { ingredients } = storeToRefs(store)

// Champ de saisie indépendant par catégorie
const newIngredient = ref<Record<Category, string>>({
  breads: '',
  sauces: '',
  cheeses: '',
  fillings: '',
})

// Labels lisibles pour l'affichage
const labels: Record<Category, string> = {
  breads: '🍞 Pains',
  sauces: '🥫 Sauces',
  cheeses: '🧀 Fromages',
  fillings: '🥩 Garnitures',
}

function add(category: Category) {
  store.addIngredient(category, newIngredient.value[category])
  newIngredient.value[category] = ''  // vider le champ après ajout
}
</script>

<template>
  <main>
    <h1>⚙️ Gestion des ingrédients</h1>
    <RouterLink to="/">← Retour au générateur</RouterLink>

    <section v-for="(label, category) in labels" :key="category">
      <h2>{{ label }}</h2>

      <ul>
        <li v-for="item in ingredients[category]" :key="item">
          {{ item }}
          <button @click="store.removeIngredient(category, item)">🗑️</button>
        </li>
      </ul>

      <div>
        <input
          v-model="newIngredient[category]"
          :placeholder="`Nouvel ingrédient...`"
          @keyup.enter="add(category)"
        />
        <button @click="add(category)">＋ Ajouter</button>
      </div>
    </section>
  </main>
</template>