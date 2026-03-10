import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Sandwich : composé de 4 ingrédients types
export interface Sandwich {
  id: number
  bread: string
  sauce: string
  cheese: string
  filling: string
}

// Données initiales
const breads = ['Baguette', 'Ciabatta', 'Pain de seigle', 'Wrap', 'Pain aux céréales']
const sauces = ['Mayonnaise', 'Moutarde', 'Pesto', 'Sauce barbecue', 'Sauce aigre-douce']
const cheeses = ['Cheddar', 'Mozzarella', 'Gouda', 'Emmental', 'Roquefort']
const fillings = ['Jambon', 'Poulet', 'Saumon', 'Thon', 'Bacon']

// Prend un tableau et retourne un élément au hasard
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Clé localStorage et fonction de chargement initial
const STORAGE_KEY = 'saved-sandwiches'

function loadFromStorage(): Sandwich[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Store
export const useSandwichStore = defineStore('sandwich', () => {
  // État réactif
  const currentSandwich = ref<Sandwich | null>(null)

  // Initialisation depuis localStorage au lieu d'un tableau vide
  const savedSandwiches = ref<Sandwich[]>(loadFromStorage())

  // nextId calculé depuis les données persistées pour éviter les collisions d'id
  let nextId = savedSandwiches.value.reduce((max, s) => Math.max(max, s.id), 0) + 1
  
  // Synchroniser localStorage à chaque changement de la liste
  watch(
    savedSandwiches,
    (newVal) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
    },
    { deep: true }  // car on surveille un tableau d'objets
  )

  // Action : générer un sandwich aléatoire
  function generate() {
    currentSandwich.value = {
      id: nextId++,
      bread: pickRandom(breads),
      sauce: pickRandom(sauces),
      cheese: pickRandom(cheeses),
      filling: pickRandom(fillings),
    }
  }

  // Action : sauvegarder le sandwich courant dans la liste
  function save() {
    if (currentSandwich.value) {
      savedSandwiches.value.push({ ...currentSandwich.value })
    }
  }

  // Action : supprimer un sandwich de la liste par son id
  function remove(id: number) {
    savedSandwiches.value = savedSandwiches.value.filter(s => s.id !== id)
  }

  return { currentSandwich, savedSandwiches, generate, save, remove }
})