<template>
  <header class="header">
      <h1 class="titulo">Studio Cappi</h1>
  </header>
</template>

<script>
export default {
    name: 'Hearder'
    

}
</script>

<style>
    .header{
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .titulo{
        font-size: 1.2 rem;
        color: #ffff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;

        
    }
</style>