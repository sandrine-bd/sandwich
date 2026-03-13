<script setup lang="ts">
import { useSandwichStore } from '@/stores/sandwich'
import { storeToRefs } from 'pinia'

const store = useSandwichStore()
const { currentSandwich, isDuplicate } = storeToRefs(store)
</script>

<template>
  <section class="generator">
    <!-- Bouton principal -->
    <div class="generator__action">
      <button class="btn btn--primary btn--generate" @click="store.generate()">
        🎲 Générer un sandwich
      </button>
    </div>

    <!-- Résultat -->
    <Transition name="stamp">
      <div v-if="currentSandwich" class="sandwich-card" :key="currentSandwich.id">
        <!-- Tampon décoratif -->
        <div class="sandwich-card__stamp">MAISON</div>

        <h2 class="sandwich-card__name">{{ currentSandwich.name }}</h2>

        <ul class="ingredient-list">
          <li><span class="ingredient-label">Pain</span>{{ currentSandwich.bread }}</li>
          <li><span class="ingredient-label">Garniture</span>{{ currentSandwich.filling }}</li>
          <li><span class="ingredient-label">Fromage</span>{{ currentSandwich.cheese }}</li>
          <li><span class="ingredient-label">Sauce</span>{{ currentSandwich.sauce }}</li>
        </ul>

        <div class="sandwich-card__footer">
          <button
            class="btn btn--primary"
            :disabled="isDuplicate"
            @click="store.save()"
          >
            💾 Sauvegarder
          </button>
          <p v-if="isDuplicate" class="alert">
            ⚠ Ce sandwich est déjà dans votre carnet.
          </p>
        </div>
      </div>
    </Transition>

    <!-- État initial -->
    <div v-if="!currentSandwich" class="generator__placeholder">
      <span>Cliquez pour composer votre sandwich du jour</span>
    </div>
  </section>
</template>

<style scoped>
.generator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
}

.generator__action {
  text-align: center;
}

.btn--generate {
  font-size: 1.1rem;
  padding: 0.8em 2.2em;
  letter-spacing: 0.08em;
}

/* Tampon rotatif dans le coin */
.sandwich-card__stamp {
  position: absolute;
  top: 1rem;
  right: 1.2rem;
  font-family: 'Special Elite', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--mustard-dk);
  border: 1.5px solid var(--mustard);
  padding: 0.2em 0.5em;
  opacity: 0.7;
  transform: rotate(6deg);
}

.sandwich-card {
  width: 100%;
  max-width: 480px;
}

.sandwich-card__name {
  font-size: 1.8rem;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px dashed var(--cream-dk);
}

.ingredient-label {
  font-family: 'Special Elite', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mustard-dk);
  width: 6rem;
  flex-shrink: 0;
}

.sandwich-card__footer {
  margin-top: 1.4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Placeholder avant génération */
.generator__placeholder {
  font-style: italic;
  color: var(--ink-lt);
  font-size: 0.9rem;
  opacity: 0.6;
  text-align: center;
  padding: 1.5rem;
  border: 2px dashed var(--cream-dk);
  width: 100%;
  max-width: 480px;
}

/* Transition Vue */
.stamp-enter-active {
  animation: stampIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
.stamp-leave-active {
  animation: stampIn 0.2s reverse ease-in both;
}
</style>
