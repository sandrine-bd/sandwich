<script setup lang="ts">
import SandwichGenerator from '@/components/SandwichGenerator.vue'
import SandwichList from '@/components/SandwichList.vue'
</script>

<template>
  <div>
    <!-- En-tête -->
    <header class="page-header">
      <div class="page-header__eyebrow">Depuis 1952</div>
      <h1>Le&nbsp;Générateur<br><em>de Sandwich</em></h1>
      <p class="page-header__sub">
        Compositions uniques tirées des meilleurs ingrédients de la maison.
      </p>
      <RouterLink to="/admin" class="btn btn--ghost" style="margin-top: 1.2rem;">
        ⚙ Gérer les ingrédients
      </RouterLink>
    </header>

    <SandwichGenerator />

    <div class="divider">Vos créations</div>

    <SandwichList />
  </div>
</template>

<style scoped>
.page-header {
  text-align: center;
  padding: 3rem 0 2.5rem;
  position: relative;
}

.page-header::before {
  content: '✦  ✦  ✦';
  display: block;
  color: var(--mustard);
  letter-spacing: 0.5em;
  font-size: 0.7rem;
  margin-bottom: 1rem;
}

.page-header__eyebrow {
  font-family: 'Special Elite', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--mustard-dk);
  margin-bottom: 0.6rem;
}

h1 em {
  font-style: italic;
  color: var(--brick);
}

.page-header__sub {
  max-width: 38ch;
  margin: 0.8rem auto 0;
  color: var(--ink-lt);
  font-style: italic;
  font-size: 0.95rem;
  line-height: 1.6;
}
</style>
