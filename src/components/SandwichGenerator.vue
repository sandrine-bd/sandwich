<script setup lang="ts">
import { useSandwichStore } from '@/stores/sandwich'
import { storeToRefs } from 'pinia'

const store = useSandwichStore()

const { currentSandwich, isDuplicate } = storeToRefs(store)
</script>

<template>
  <div>
    <button @click="store.generate()">🎲 Générer un sandwich</button>

    <!-- Affichage du résultat si un sandwich a été généré -->
    <div v-if="currentSandwich">
      <h2>{{ currentSandwich.name }}</h2>   <!-- ← nom affiché en titre -->
      <ul>
        <li>🍞 Pain : {{ currentSandwich.bread }}</li>
        <li>🥩 Garniture : {{ currentSandwich.filling }}</li>
        <li>🧀 Fromage : {{ currentSandwich.cheese }}</li>
        <li>🥫 Sauce : {{ currentSandwich.sauce }}</li>
      </ul>
      
      <!-- ← Bouton désactivé + message si doublon -->
      <button @click="store.save()" :disabled="isDuplicate">
        💾 Sauvegarder
      </button>
      <p v-if="isDuplicate">⚠️ Ce sandwich est déjà dans ta liste !</p>
    </div>
  </div>
</template>