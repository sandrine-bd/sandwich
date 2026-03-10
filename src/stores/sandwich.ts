import { defineStore } from 'pinia'
import { ref } from 'vue'

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

// Store
export const useSandwichStore = defineStore('sandwich', () => {
  // État réactif
  const currentSandwich = ref<Sandwich | null>(null)
  const savedSandwiches = ref<Sandwich[]>([])
  let nextId = 1

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

  return { currentSandwich, savedSandwiches, generate }
})