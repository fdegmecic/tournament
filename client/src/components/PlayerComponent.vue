<template>
  <div class="container">
    <h1>Yugio turnir bre</h1>
    <div class="create-player">
      <label for="create-player">Dodaj igrača </label>
      <input type="text" id="create-player" v-model="name" placeholder="Create a new player">
      <button v-on:click="createPlayer">Dodaj!</button>
    </div>
    <!--create player here -->
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="player-container">
      <div class="player"
      v-for="(player, index) in players"
      v-bind:item="player"
      v-bind:index="index"
      v-bind:key="player._id"
      v-on:dblclick="deletePlayer(player._id)"
      v-on:update-wins="updateWins">
      <p class="text">{{ player.name }}</p>
      <p class="text"> Wins: {{ player.wins }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerService from '../PlayerService'; 
export default {
  name: 'PlayerComponent',
  data(){
    return{
      players:[],
      error: '',
      name: ''
    }
  },
  async created(){
    try{
      this.players = await PlayerService.getPlayers();
    }catch(err){
      this.error=err.message;
    }
  },
  methods: {
    async createPlayer(){
      await PlayerService.insertPlayer(this.name);
      this.players = await PlayerService.getPlayers();
    },
    async deletePlayer(id){
      await PlayerService.deletePlayer(id);
      this.players = await PlayerService.getPlayers();
    },
    updateWins(){
      console.log(1)
    }    
  },
  computed:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.player {
  padding: 20px;
    font-size: 1.3em;
    background-color: #E0EDF4;
    border-left: 5px solid #3EB3F6;
    margin-bottom: 2px;
    color: #3E5252;
}

div.created-at{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15 px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
