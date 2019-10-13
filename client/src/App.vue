<template>
  <div id="app">
    <img height="100px"
    width="150px" alt="Vue logo" src="./assets/logo.png">
    <PlayerComponent />
    <MatchComponent />
  </div>
</template>

<script>
import PlayerComponent from './components/PlayerComponent.vue'
import MatchComponent from './components/MatchComponent.vue'

export default {
  name: 'app',
  components: {
    PlayerComponent,
    MatchComponent
  }
}
</script>

<style>
body {
  background-color: #EEEEEE;
  font-family: 'Montserrat', sans-serif;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  padding-top: 50px;
}
body, html {
  margin: 0;
  height: 100%;
}
#app {
    width: 50%;
}
</style>
