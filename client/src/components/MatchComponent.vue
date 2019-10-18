<template>
    <div class="container">
        <p>Dodaj meč</p>
        <div class="create-match">
            <label >Select tournament: </label>    
            <select v-model="tournament">
                <option v-for="tournament in tournaments"
                v-bind:key="tournament.name"
                v-bind:item="tournament">
                {{tournament.name}}
                </option>
            </select>
            <label >Select players: </label>
            <select v-model="playerOne">
                <option v-for="player in players"
                v-bind:key="player._id">
                {{player.name}}
                </option>
            </select>
            vs.
            <select v-model="playerTwo">
                <option v-for="player in players"
                v-bind:key="player._id"
                >{{player.name}}
                </option>
            </select>
            <button v-on:click="createMatch">Dodaj</button>
        </div>
        <div class="container">
            <p>Nedovršeni mečevi</p>
            <ul>
                <li v-bind:key="match._id"
                v-for="match in unfinishedMatch">
                    {{match.playerOne}}
                    <button v-on:click="updateMatch(match._id,result=1), decidePlayer(match._id)" @click="$emit('update-wins')">Winner</button>
                    vs.
                    {{match.playerTwo}}
                    <button v-on:click="updateMatch(match._id,result=2), decidePlayer(match._id), $emit('update-wins')">Winner</button>
                </li>
            </ul>
        </div>
        <div class="container">
            <p>Dovršeni mečevi</p>
                <div v-bind:key="match._id"
                v-for="match in finishedMatch">
                    {{match.playerOne}}
                    vs.
                    {{match.playerTwo}}
                    <span v-if="match.result==1">WINNER: {{match.playerOne}}</span>
                    <span v-if="match.result==2">WINNER: {{match.playerTwo}}</span>      
                </div>
        </div>
    </div>
</template>
<script>
import PlayerService from '../PlayerService'
import MatchService from '../MatchService'
import TournamentService from '../TournamentService';
export default {
    name:'MatchComponent',
    data(){
        return{
            players:[],
            matches:[],
            tournaments:[],
            playerOne:'',
            playerTwo:'',
            tournament:''
        }
    },
    async created(){
        try{
        this.players = await PlayerService.getPlayers();
        this.matches = await MatchService.getMatches();
        this.tournaments = await TournamentService.getTournaments();
        }catch(err){
        this.error=err.message;
        }
    },
    methods:{
        async createMatch(){
            const tournamentId = this.tournaments.filter(tournament => tournament.name == this.tournament).map(tournament=>{ return tournament._id})
            await MatchService.insertMatch(this.playerOne,this.playerTwo, tournamentId);
            this.matches=await MatchService.getMatches();
            this.playerOne ='';
            this.playerTwo='';
        },
        async updateMatch(id){
            await MatchService.updateMatch(id,this.result);
            this.matches=await MatchService.getMatches();
            
        },
        async decidePlayer(id){
                if(this.result==1){
                   const winner = this.matches.filter(match => match._id == id).map(match=>{ return match.playerOne})
                   const winnerId = this.players.filter(player=>player.name==winner).map(player=>{return player._id})
                   var winnerPoints = this.players.filter(player=>player.name==winner).map(player=>{return player.wins})
                   winnerPoints++;
                   await PlayerService.updatePlayer(winnerId, winnerPoints) 
                }
                if(this.result==2){
                   const winner1 = this.matches.filter(match => match._id == id).map(match=>{ return match.playerTwo})
                   const winnerId1 = this.players.filter(player=>player.name==winner1).map(player=>{return player._id})
                   var winnerPoints1 = this.players.filter(player=>player.name==winner1).map(player=>{return player.wins})
                   winnerPoints1++;
                   await PlayerService.updatePlayer(winnerId1, winnerPoints1)                 
                }
        }
    },
    computed:{
        unfinishedMatch(){
            return this.matches.filter(match=>match.result==0);
        },
        finishedMatch(){
            return this.matches.filter(match=>match.result!==0)
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