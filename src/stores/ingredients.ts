import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type Category = 'breads' | 'sauces' | 'cheeses' | 'fillings'

export interface Ingredients {
  breads: string[]
  sauces: string[]
  cheeses: string[]
  fillings: string[]
}

// Données initiales — déplacées ici depuis sandwich.ts
const defaults: Ingredients = {
  breads:   ['Baguette', 'Ciabatta', 'Pain de seigle', 'Wrap', 'Pain aux céréales'],
  sauces:   ['Mayonnaise', 'Moutarde', 'Pesto', 'Sauce barbecue', 'Sauce aigre-douce'],
  cheeses:  ['Cheddar', 'Mozzarella', 'Gouda', 'Emmental', 'Roquefort'],
  fillings: ['Jambon', 'Poulet', 'Saumon', 'Thon', 'Bacon'],
}

// Même pattern que sandwich.ts
function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const useIngredientsStore = defineStore('ingredients', () => {
  const ingredients = ref<Ingredients>(loadFromStorage('ingredients', defaults))

  // Même pattern que sandwich.ts
  watch(
    ingredients,
    (newVal) => {
      localStorage.setItem('ingredients', JSON.stringify(newVal))
    },
    { deep: true }
  )

  function addIngredient(category: Category, name: string) {
    const trimmed = name.trim()
    // Garde-fou : pas de vide, pas de doublon
    if (trimmed && !ingredients.value[category].includes(trimmed)) {
      ingredients.value[category].push(trimmed)
    }
  }

  function removeIngredient(category: Category, name: string) {
    ingredients.value[category] = ingredients.value[category].filter(i => i !== name)
  }

  return { ingredients, addIngredient, removeIngredient }
})