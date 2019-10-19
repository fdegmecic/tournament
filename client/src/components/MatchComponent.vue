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
                    {{playerName(match.playerOneId)}}
                    <button v-on:click="updateMatch(match._id,result=1), updateWinner(match._id)">Winner</button>
                    vs.
                    {{playerName(match.playerTwoId)}}
                    <button v-on:click="updateMatch(match._id,result=2), updateWinner(match._id)">Winner</button>
                </li>
            </ul>
        </div>
        <div class="container">
            <p>Dovršeni mečevi</p>
            <label >Select tournament to see the matches: </label>    
            <select v-model="tournamentMatch">
                <option v-for="tournament in tournaments"
                v-bind:key="tournament.name"
                v-bind:item="tournament">
                {{tournament.name}}
                </option>
            </select>
            <div v-bind:key="match._id"
                v-for="match in matchFilter">
                {{playerName(match.playerOneId)}}
                vs.
                {{playerName(match.playerTwoId)}}
                <span v-if="match.result==1">WINNER: {{playerName(match.playerOneId)}}</span>
                <span v-if="match.result==2">WINNER: {{playerName(match.playerTwoId)}}</span>      
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
            tournament:'',
            tournamentMatch:''
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
            const playerOneId = this.players.filter(player => player.name == this.playerOne).map(player=>{ return player._id})
            const playerTwoId = this.players.filter(player => player.name == this.playerTwo).map(player=>{ return player._id})
            await MatchService.insertMatch(playerOneId, playerTwoId, tournamentId);
            this.matches=await MatchService.getMatches();
            this.playerOne ='';
            this.playerTwo='';
        },
        async updateMatch(id){
            await MatchService.updateMatch(id,this.result);
            this.matches=await MatchService.getMatches();
            
        },
        async updateWinner(id){
                if(this.result==1){
                   const winner = this.matches.filter(match => match._id == id).map(match=>{ return match.playerOneId})
                   var winnerPoints = this.players.filter(player=>player.name==winner).map(player=>{return player.wins})
                   winnerPoints++;
                   await PlayerService.updatePlayer(winner, winnerPoints) 
                }
                if(this.result==2){
                   const winner1 = this.matches.filter(match => match._id == id).map(match=>{ return match.playerTwoId})
                   var winnerPoints1 = this.players.filter(player=>player.name==winner1).map(player=>{return player.wins})
                   winnerPoints1++;
                   await PlayerService.updatePlayer(winner1, winnerPoints1)                 
                }
        },
         playerName(id){
            const playerName = this.players.filter(player => player._id == id).map(player => {return player.name})
            return playerName
        }
    },
    computed:{
        unfinishedMatch(){
            return this.matches.filter(match=>match.result==0);
        },
        finishedMatch(){
            return this.matches.filter(match=>match.result!==0)
        },
        matchFilter(){
            const tournamentIdMatch = this.tournaments.filter(tournament => tournament.name == this.tournamentMatch).map(tournament=>{ return tournament._id})
            return this.matches.filter(match=>match.tournament==tournamentIdMatch && match.result!=0) 
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