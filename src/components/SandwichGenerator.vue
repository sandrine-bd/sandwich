<script setup lang="ts">
import { useSandwichStore } from '@/stores/sandwich'
import { storeToRefs } from 'pinia'

const store = useSandwichStore()

const { currentSandwich } = storeToRefs(store)
</script>

<template>
  <div>
    <button @click="store.generate()">🎲 Générer un sandwich</button>

    <!-- Affichage du résultat si un sandwich a été généré -->
    <div v-if="currentSandwich">
      <h2>Votre sandwich :</h2>
      <ul>
        <li>🍞 Pain : {{ currentSandwich.bread }}</li>
        <li>🥩 Garniture : {{ currentSandwich.filling }}</li>
        <li>🧀 Fromage : {{ currentSandwich.cheese }}</li>
        <li>🥫 Sauce : {{ currentSandwich.sauce }}</li>
      </ul>
      <button @click="store.save()">💾 Sauvegarder</button>
    </div>
  </div>
</template>