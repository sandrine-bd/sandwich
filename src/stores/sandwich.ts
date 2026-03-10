import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import { useIngredientsStore } from './ingredients'

// Sandwich : composé de 4 ingrédients types
export interface Sandwich {
  id: number
  name: string
  bread: string
  sauce: string
  cheese: string
  filling: string
}

// Données initiales
const adjectives = ['Rustique', 'Gourmand', 'Épicé', 'Classique', 'Sauvage', 'Délicat', 'Fumé', 'Croustillant']
const nouns = ['Montagnard', 'Marin', 'Campagnard', 'Aventurier', 'Voyageur', 'Gourmet', 'Chasseur']

// Prend un tableau et retourne un élément au hasard
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateName(): string {
  return `Le ${pickRandom(adjectives)} ${pickRandom(nouns)}`
}

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

// Store
export const useSandwichStore = defineStore('sandwich', () => {
  // État réactif
  const currentSandwich = ref<Sandwich | null>(null)
  const savedSandwiches = ref<Sandwich[]>(loadFromStorage('saved-sandwiches', []))

  watch(
    savedSandwiches,
    (newVal) => { localStorage.setItem('saved-sandwiches', JSON.stringify(newVal)) },
    { deep: true }
  )
  
  // nextId calculé depuis les données persistées pour éviter les collisions d'id
  let nextId = savedSandwiches.value.reduce((max, s) => Math.max(max, s.id), 0) + 1

  // Un sandwich est un doublon si les 4 ingrédients sont identiques
  const isDuplicate = computed(() => {
    if (!currentSandwich.value) return false
    const c = currentSandwich.value
    return savedSandwiches.value.some(
        s => s.bread === c.bread &&
            s.sauce === c.sauce &&
            s.cheese === c.cheese &&
            s.filling === c.filling
        )
  })

  const totalSaved = computed(() => savedSandwiches.value.length)
  
  // Action : générer un sandwich aléatoire
  function generate() {
    const { ingredients } = useIngredientsStore()

    currentSandwich.value = {
      id: nextId++,
      name: generateName(),
      bread: pickRandom(ingredients.breads),
      sauce: pickRandom(ingredients.sauces),
      cheese: pickRandom(ingredients.cheeses),
      filling: pickRandom(ingredients.fillings),
    }
  }

  // Action : sauvegarder le sandwich courant dans la liste
  function save() {
    if (currentSandwich.value && !isDuplicate.value) {
        savedSandwiches.value.push({ ...currentSandwich.value })
    }
  }

  // Action : supprimer un sandwich de la liste par son id
  function remove(id: number) {
    savedSandwiches.value = savedSandwiches.value.filter(s => s.id !== id)
  }

  return { currentSandwich, savedSandwiches, isDuplicate, totalSaved, generate, save, remove }
})