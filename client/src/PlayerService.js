import axios from 'axios';

const url = 'http://localhost:5000/api/players/';

class PlayerService{
    //get players
    static getPlayers(){
        return new Promise(async (resolve, reject) => {
            try{
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(player =>({
                        ...player
                    }))
                );
            }catch(err){
                reject(err);
            }
        })
    }
    //create players
    static insertPlayer(name){
        return axios.post(url, {
            name,
            wins:0
        })
    }
    //delete players
    static deletePlayer(id){
        return axios.delete(`${url}${id}`);
    }
    static updatePlayer(id, wins){
        return axios.patch(`${url}${id}`, {
            wins
        })
    }
}
export default PlayerService;