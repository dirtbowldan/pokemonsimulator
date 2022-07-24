import { gen3pokemon } from "./allpokemon"
import "./gamescreen.scss";
const PokemonPartyCard = ({userPokemon}) => {

    
    let typecolor = ""
    let textcolor = ""
    if(userPokemon.type == "Normal"){

        typecolor = "gray"
        textcolor = "black"
    }
    if(userPokemon.type == "Fire"){

        typecolor = "red"
        textcolor = "white"
    }
    if(userPokemon.type == "Water"){

        typecolor = "blue"
        textcolor = "white"
    }
    if(userPokemon.type == "Grass"){

        typecolor = "green"
        textcolor = "white"
    }
    if(userPokemon.type == "Electric"){

        typecolor = "yellow"
        textcolor = "black"
    }


    const myComponentStyle = {
        color: textcolor,
        backgroundColor: typecolor,
        marginRight: "25%",
        marginLeft: "25%",
        textAlign: "center"
     }
      
    return (

                <div className="pokecard" name={userPokemon.name}>
                  <img name={"" + userPokemon.pokeId} src={require("./pokeimgs/"+userPokemon.pokeId+".png")}/>
                    <div className="pokecardinfo">
                    <p className="pokename">{userPokemon.name}</p>
                    <p>Lvl. {userPokemon.level}</p>
                    <p className="type" style={myComponentStyle}>{userPokemon.type}</p>
                    <p>Base Stats:</p>
                    <div className="basestats">
                    
                    <p>Att: {userPokemon.currentstats.att}</p>
                    <p>Def: {userPokemon.currentstats.def}</p>
                    <p>SpA: {userPokemon.currentstats.spa}</p>
                    <p>SpD: {userPokemon.currentstats.spd}</p>
                    <p>Spe: {userPokemon.currentstats.spe}</p>

                    </div>
                  
                    </div>

                </div>


    )
}

export default PokemonPartyCard