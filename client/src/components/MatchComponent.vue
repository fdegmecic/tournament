<template>
    <div class="container">
        <p>Dodaj meč</p>
        <div class="create-match">
            <label for="create-match">Select players: </label>
            <select v-model="playerOne">
                <option v-for="(player) in players"
            v-bind:key="player._id"
            >{{player.name}}</option>
            </select>
            vs.
            <select v-model="playerTwo">
                <option v-for="(player) in players"
            v-bind:key="player._id"
            >{{player.name}}</option>
            </select>
            <button v-on:click="createMatch">Dodaj</button>
        </div>
        <div class="container">
            <p>Nedovršeni mečevi</p>
            <ul>
                <li v-bind:key="match._id"
                v-for="match in unfinishedMatch"
                >
                    {{match.playerOne}}
                    <button v-on:click="updateMatch(match._id,result=1)">Winner</button>
                    vs.
                    {{match.playerTwo}}
                    <button v-on:click="updateMatch(match._id,result=2), updatePlayer()">Winner</button>
                </li>
            </ul>
        </div>
        <div class="container">
            <p>Dovršeni mečevi</p>
                <div v-bind:key="match._id"
                v-for="match in finishedMatch"
                >
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
export default {
    name:'MatchComponent',
    data(){
        return{
            players:[],
            matches:[],
            playerOne:'',
            playerTwo:''
        }
    },
    async created(){
        try{
        this.players = await PlayerService.getPlayers();
        this.matches = await MatchService.getMatches();
        }catch(err){
        this.error=err.message;
        }
    },
    methods:{
        async createMatch(){
            await MatchService.insertMatch(this.playerOne,this.playerTwo);
            this.matches=await MatchService.getMatches();
            this.playerOne ='';
            this.playerTwo='';
        },
        async updateMatch(id){
            await MatchService.updateMatch(id,this.result);
            this.matches=await MatchService.getMatches();
        },
         updatePlayer(){
            console.log("hello");
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