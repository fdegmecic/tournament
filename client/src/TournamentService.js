import axios from 'axios';

const url = 'http://localhost:5000/api/tournaments/';

class TournamentService{
    //get tournaments
    static getTournaments(){
        return new Promise(async (resolve, reject) => {
            try{
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(tournament =>({
                        ...tournament
                    }))
                );
            }catch(err){
                reject(err);
            }
        })
    }
    static inserTournament(name){
        return axios.post(url, {
            name
        })
    }
}
export default TournamentService