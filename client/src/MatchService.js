import axios from 'axios';

const url = 'http://localhost:5000/api/matches/';

class MatchService { 
    static getMatches(){
        return new Promise(async (resolve, reject)=>{
            try{
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(match=>({...match}))
                );
            }catch(err){
                reject(err);
            }
        })
    }
    static insertMatch(playerOneId, playerTwoId, tournament){
        return axios.post(url, {
            playerOneId,
            playerTwoId,
            result:0,
            tournament            
        })
    }
    static updateMatch(id, result){
        return axios.patch(`${url}${id}`, {
            result
        })
    }
}

export default MatchService;