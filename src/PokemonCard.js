
import Gen3Pokemon  from "./allpokemonbasestats.js"
import "./gamescreen.scss";
const PokemonCard = ({pokeId, receive, level}) => {
    let typecolor = ""
    let textcolor = ""
    console.log()
    const gen3pokemon = Gen3Pokemon
    if(gen3pokemon[pokeId].type == "Normal"){

        typecolor = "gray"
        textcolor = "black"
    }
    if(gen3pokemon[pokeId].type == "Fire"){

        typecolor = "red"
        textcolor = "white"
    }
    if(gen3pokemon[pokeId].type == "Water"){

        typecolor = "blue"
        textcolor = "white"
    }
    if(gen3pokemon[pokeId].type == "Grass"){

        typecolor = "green"
        textcolor = "white"
    }
    if(gen3pokemon[pokeId].type == "Electric"){

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

                <a className="pokecard" onClick={receive} name={""+pokeId} level={level}>
                  <img name={"" + pokeId} src={require("./pokeimgs/"+pokeId+".png")}/>
                    <div className="pokecardinfo">
                    <p className="pokename">{gen3pokemon[pokeId].name.english}</p>
                    <p>Lvl. {level}</p>
                    <p className="type" style={myComponentStyle}>{gen3pokemon[pokeId].type}</p>
                    <p>Base Stats:</p>
                    <div className="basestats">
                    <p>HP: {gen3pokemon[pokeId].base.HP}</p>
                    <p>Att: {gen3pokemon[pokeId].base.att}</p>
                    <p>Def: {gen3pokemon[pokeId].base.def}</p>
                    <p>SpA: {gen3pokemon[pokeId].base.spa}</p>
                    <p>SpD: {gen3pokemon[pokeId].base.spd}</p>
                    <p>Spe: {gen3pokemon[pokeId].base.spe}</p>

                    </div>
                  
                    </div>

                </a>


    )
}

export default PokemonCard