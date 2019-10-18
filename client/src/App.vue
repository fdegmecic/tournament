<template>
  <div id="app">
    <img height="100px"
    width="150px" alt="Vue logo" src="./assets/logo.png">
    <PlayerComponent />
    <TournamentComponent />
    <MatchComponent />
  </div>
</template>

<script>
import PlayerComponent from './components/PlayerComponent.vue'
import MatchComponent from './components/MatchComponent.vue'
import TournamentComponent from './components/TournamentComponent.vue'

export default {
  name: 'app',
  components: {
    PlayerComponent,
    TournamentComponent,
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
