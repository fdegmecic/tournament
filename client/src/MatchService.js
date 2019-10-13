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
    static insertMatch(playerOne,playerTwo){
        return axios.post(url, {
            playerOne,
            playerTwo,
            result:0
        })
    }
    static updateMatch(id, result){
        return axios.patch(`${url}${id}`, {
            result
        })
    }
}

export default MatchService;