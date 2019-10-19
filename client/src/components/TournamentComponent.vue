<template>
<div class="container">
        <p>Tournaments</p>
    <div class="create-tournament">
        <label for="create-player">Dodaj novi turnir </label>
        <input type="text" id="create-tournament" v-model="name" placeholder="Dodajte novi turnir">
        <button v-on:click="createTournament">Dodaj!</button>
    </div>
    <div class="tournament-container">
      <div class="tournament"
      v-for="tournament in tournaments"
      v-bind:key="tournament._id">
      {{ tournament.name }}
      Date: {{ tournament.date }}
      </div>
    </div>
</div>
</template>

<script>
import TournamentService from '../TournamentService'
export default {
    name:'TournamentComponent',
    data(){
        return{
            tournaments:[],
            name:''
        }
    },
    async created(){
        try{
        this.tournaments = await TournamentService.getTournaments();
        }catch(err){
        this.error=err.message;
        }
    },
    methods:{
        async createTournament(){
            await TournamentService.inserTournament(this.name);
            this.tournaments=await TournamentService.getTournaments();
            this.name ='';
        }
    }
}

</script>

<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}
p {
    width: calc(100% - 40px);
    border: 0;
    padding: 20px;
    font-size: 1.3em;
    background-color: #323333;
    color: #fff;
  }
</style>