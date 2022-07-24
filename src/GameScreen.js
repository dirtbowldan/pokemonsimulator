import "./gamescreen.scss";
import { useState } from "react";
import PokemonPartyCard from "./PokemonPartyCard";
import SelectorLog from "./SelectorLog";
import { gen3pokemon } from "./allpokemon";
import React from "react";
import ReactDOM from "react-dom/client";
import FireRedSequence from "./FireRedSequence";
import Gen3Pokemon from "./allpokemonbasestats";
import gen3moveset from "./gen3movesets";
import allmoves from "./allmoves";

const GameScreen = () => {
  const emptyPokemon = {
    pokeId: 0,
    name: "Empty",
    level: 0,
    type: "none",

    basestats: {
      hp: 0,
      att: 0,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 0,
    },

    currentstats: {
      currenthp: 0,
      maxhp: 0,
      att: 0,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 0,
    },

    moves: {
      move1: {
        name: "0",
        power: 0,
        accurracy: 0,
        type: "",
        currpp: 0,
        maxpp: 0,
      },
      move2: {
        name: "0",
        power: 0,
        accurracy: 0,
        type: "",
        currpp: 0,
        maxpp: 0,
      },
      move3: {
        name: "0",
        power: 0,
        accurracy: 0,
        type: "",
        currpp: 0,
        maxpp: 0,
      },
      move4: {
        name: "0",
        power: 0,
        accurracy: 0,
        type: "",
        currpp: 0,
        maxpp: 0,
      },
    },
  };

  const userPokemon = {
    pokeId: 1,
    name: "Wigglybuff",
    level: 25,
    type: "normal",

    basestats: {
      hp: 140,
      att: 70,
      def: 45,
      spa: 85,
      spd: 50,
      spe: 45,
    },

    currentstats: {
      currenthp: 140,
      maxhp: 140,
      att: 70,
      def: 45,
      spa: 85,
      spd: 50,
      spe: 45,
    },

    moves: {
      move1: {
        name: "Tackle",
        power: 40,
        accurracy: 95,
        type: "Normal",
        currpp: 15,
        maxpp: 15,
      },
      move2: {
        name: "Body Slam",
        power: 70,
        accurracy: 95,
        type: "Normal",
        currpp: 15,
        maxpp: 15,
      },
      move3: {
        name: "Tackle",
        power: 40,
        accurracy: 95,
        type: "Normal",
        currpp: 15,
        maxpp: 15,
      },
      move4: {
        name: "Tackle",
        power: 40,
        accurracy: 95,
        type: "Normal",
        currpp: 15,
        maxpp: 15,
      },
    },
  };

  const emptymove = {
    accuracy: "0",
    contestEffectId: "0",
    contestTypeId: "0",
    dmgClassId: "0",
    effectChance: "",
    effectId: "0",
    genId: "0",
    level: "0",
    moveId: "0",
    moveName: "",
    power: "0",
    pp: "0",
    priority: "0",
    superContestEffectId: "0",
    targetId: "0",
    typeId: "0",
  };
  //  Current Computer Team

  const [cpuCurrentPokemon, updateCpuCurrentPokemon] = React.useState([
    emptyPokemon,
  ]);
  //Current User Team
  let rivalstarter = 0;
  const [allUserPokemon, updateUserPokemon] = React.useState([
    emptyPokemon,
    emptyPokemon,
    emptyPokemon,
    emptyPokemon,
    emptyPokemon,
    emptyPokemon,
  ]);
  

  //Sets Text Log Ref
  const refLog = React.useRef();

  //Shows current team

  //Recieve Pokemon From the Log
  const calcEffect = (effectId) => {};

  const receivePokemon = (event) => {
    //Get new pokemon info from database
    const newpokemon =
      Gen3Pokemon[parseInt(event.currentTarget.getAttribute("name"))];
    let temp = allUserPokemon;
    let ct = 0;
    var level = 5;
    newpokemon.level = level;
    var newhp = Math.floor(
      ((2 * newpokemon.base.HP + 31) * level) / 100 + parseInt(level) + 10
    );
    newpokemon.currentstats = {
      maxhp: newhp,
      currenthp: newhp,
      att: Math.floor(((2 * newpokemon.base.att + 31) * level) / 100 + 5),
      def: Math.floor(((2 * newpokemon.base.def + 31) * level) / 100 + 5),
      spa: Math.floor(((2 * newpokemon.base.spa + 31) * level) / 100 + 5),
      spd: Math.floor(((2 * newpokemon.base.spd + 31) * level) / 100 + 5),
      spe: Math.floor(((2 * newpokemon.base.spe + 31) * level) / 100 + 5),
    };

    newpokemon.name = newpokemon.name.english;

    newpokemon.moveset = [];

    const newmoveset = gen3moveset.filter(
      (move) => move.pokeId == newpokemon.pokeId
    );
    
    let templearnset = newmoveset.filter((move) => move.movemethod == "1");
    
    let learnset = [];
    let tmset = [];
    let tutorset = [];
    templearnset.forEach((move) => {
      let newmove = allmoves[move.moveId - 1];
      newmove.level = move.level;

      learnset.push(newmove);
    });

  
    let learnnow = [];

    learnset.forEach((move) => {
      if (move.level <= newpokemon.level && move.level) {
        learnnow.push(move);
      }
    });

    console.log("learnow", learnnow);

    while (learnnow.length < 4) {
      learnnow.push(emptymove);
    }

    newpokemon.moves = {};
    newpokemon.moves.move1 = learnnow[0];
    newpokemon.moves.move2 = learnnow[1];
    newpokemon.moves.move3 = learnnow[2];
    newpokemon.moves.move4 = learnnow[3];

    console.log(newpokemon);

    //Checks to see if pokemon should be in party or pc (will update to less rigid system in future)

    while (true) {
      if (temp[5].pokeId !== 0) {
        temp.push(newpokemon);
        break;
      }

      if (temp[ct].pokeId === 0) {
        temp[ct] = newpokemon;
        break;
      }
      ct++;
    }

    //adds newpokemon to team officially

    updateUserPokemon([...temp]);

    //creates info to send to log
  };

  const setCpuPokemon = (pokemon) => {
    //Get new pokemon info from database
    let newpokemonarr = [];
    for (let i = 0; i < pokemon.length; i++) {
      const newpokemon = Gen3Pokemon[pokemon[i]];
      var level = 5;
      newpokemon.level = level;
      var newhp = Math.floor(
        ((2 * newpokemon.base.HP + 31) * level) / 100 + parseInt(level) + 10
      );
      newpokemon.currentstats = {
        maxhp: newhp,
        currenthp: newhp,
        att: Math.floor(((2 * newpokemon.base.att + 31) * level) / 100 + 5),
        def: Math.floor(((2 * newpokemon.base.def + 31) * level) / 100 + 5),
        spa: Math.floor(((2 * newpokemon.base.spa + 31) * level) / 100 + 5),
        spd: Math.floor(((2 * newpokemon.base.spd + 31) * level) / 100 + 5),
        spe: Math.floor(((2 * newpokemon.base.spe + 31) * level) / 100 + 5),
      };
      newpokemon.name = newpokemon.name.english;
      newpokemon.moveset = [];

    const newmoveset = gen3moveset.filter(
      (move) => move.pokeId == newpokemon.pokeId
    );


    
    let templearnset = newmoveset.filter((move) => move.movemethod == "1");
    
    let learnset = [];
    let tmset = [];
    let tutorset = [];
    templearnset.forEach((move) => {
      let newmove = allmoves[move.moveId - 1];
      newmove.level = move.level;

      learnset.push(newmove);
    });

   
    let learnnow = [];

    learnset.forEach((move) => {
      if (move.level <= newpokemon.level && move.level) {
        learnnow.push(move);
      }
    });

    

    while (learnnow.length < 4) {
      learnnow.push(emptymove);
    }

    newpokemon.moves = {};
    newpokemon.moves.move1 = learnnow[0];
    newpokemon.moves.move2 = learnnow[1];
    newpokemon.moves.move3 = learnnow[2];
    newpokemon.moves.move4 = learnnow[3];

      newpokemonarr.push(newpokemon);

      
    }

    //Checks to see if pokemon should be in party or pc (will update to less rigid system in future)

    //adds newpokemon to team officially
    console.log("newpokemon", newpokemonarr)
    updateCpuCurrentPokemon(newpokemonarr);

    //creates info to send to log
  };

  //Takes in a node from other commands and appends it to refLog

  const updateLog = (jsobj) => {
    updateLogInfo((prevState) => {
      return [...prevState, jsobj];
    });
  };

  
  const calcDamage = (move, attacker, defender) => {
    console.log("damage", attacker)
    console.log(defender)
    let damage =
      (((2 * attacker.level) / 5 + 2) *
        move.power *
        attacker.currentstats.att) /
        defender.currentstats.def /
      50;

      return damage
  }


  
  
  
  const calcMove = (move, attacker, defender) =>{
    let bothpokemonarray =[attacker, defender]
    console.log("calcMove", attacker)
    console.log(move)
    if(move.effectId === "1"){

      let attackerdamage = calcDamage(move, attacker, defender)
      let defendernewhealth = Math.ceil(
      defender.currentstats.currenthp - attackerdamage
      );

      let newdefender = {
        ...defender,

        
            currentstats: {
            ...defender.currentstats,
            currenthp: defendernewhealth,
          },
       
      };
      
      bothpokemonarray[1] = newdefender
    } 

    
    //Defender Stat Att down 1 state

    
    
    return bothpokemonarray
  }
  
  
  
  
  //Executes a move in the turn

  const executeMove = (event) => {
    let userpkmn = allUserPokemon[0]
    let cpupkmn = cpuCurrentPokemon[0]
    
    console.log("execute user pokemon", userpkmn)
    let movename = event.currentTarget.getAttribute("name");
    let usermove = userpkmn.moves[movename]
    let cpumove = cpupkmn.moves.move1
    console.log("usermove", usermove)
    console.log("cpumove", cpumove)
    let bothpkmn = calcMove(usermove, userpkmn, cpupkmn)
    bothpkmn = calcMove(cpumove, bothpkmn[1], bothpkmn[0])
    userpkmn = bothpkmn[1]
    cpupkmn = bothpkmn[0]

    
    
    
    
    
    

    //updates the health of pokemon affected

    updateUserPokemon((prevState) => {
      console.log("Update state prevstate");
      let dup = [...prevState];
      dup.shift();
      console.log("first dup");
      console.log(dup);
      
      dup.unshift(userpkmn);
      console.log("final");
      console.log(dup);

      return [...dup];
    });

    //updates cpu pokemon
    updateCpuCurrentPokemon((prevState) => {
      console.log("Update state prevstate");
      let dup = [...prevState];
      dup.shift();
      console.log("first dup");
      console.log(dup);
      dup.unshift(cpupkmn);
      console.log("final");
      console.log(dup);

      return [...dup];
    });
  };
  let stage = 0;
  const stages = FireRedSequence;
  const [currentStage, updateCurrentStage] = React.useState(stages);
  const nextStep = () => {
    console.log(stages[stage]);
    if (stages[stage].type === "pick") {
      updateLogInfo([
        <div onClick={nextStep}>
          <SelectorLog
            pokemon={stages[stage].pokemon}
            receivePokemon={receivePokemon}
            level={stages[stage].level}
          />
        </div>,
      ]);
    }
    if (stages[stage].type === "battle") {
      console.log("yo");

      if (stages[stage].rival) {
        if (allUserPokemon[0].pokeId === 1) {
          setCpuPokemon([4]);
          rivalstarter = 4;
        }
        if (allUserPokemon[0].pokeId === 4) {
          setCpuPokemon([7]);
          rivalstarter = 7;
        }
        if (allUserPokemon[0].pokeId === 7) {
          setCpuPokemon([1]);
          rivalstarter = 1;
        }
      } else {
        setCpuPokemon(stages[stage].pokemon);
      }

      updateLogInfo([<div onClick={nextStep}>Fight</div>]);
    }
    if (stages[stage].type === "receive") {
      updateLogInfo([<div onClick={nextStep}>why</div>]);
    }
    stage++;
  };
  const [logInfo, updateLogInfo] = React.useState([
    <button onClick={nextStep}>Start</button>,
  ]);
  return (
    <div className="screen">
      <div className="gamearea">
        <div className="battleScene">
          <h1>Battle Name</h1>
          <div className="fight">
            <div className="pokemon">
              <span className="pokemonInfo">
                <div className="info">
                  Lvl. {allUserPokemon[0].level} {allUserPokemon[0].name}
                </div>
                <span className="healthinfo">
                  <span className="healthbar"></span>
                  <div className="healthnumber">
                    {allUserPokemon[0].currentstats.currenthp}/
                    {allUserPokemon[0].currentstats.maxhp}
                  </div>
                </span>
                <div className="stats">
                  <div className="stat">
                    Att: {allUserPokemon[0].currentstats.att}
                  </div>
                  <div className="stat">
                    Def: {allUserPokemon[0].currentstats.def}
                  </div>
                  <div className="stat">
                    SpA: {allUserPokemon[0].currentstats.spa}
                  </div>
                  <div className="stat">
                    SpD: {allUserPokemon[0].currentstats.spd}
                  </div>
                  <div className="stat">
                    Spe: {allUserPokemon[0].currentstats.spe}
                  </div>
                  <div className="stat">Type: {allUserPokemon[0].type}</div>
                </div>
              </span>
              <img
                src={require("./pokeimgs/" + allUserPokemon[0].pokeId + ".png")}
              />
            </div>
            <div className="cpupokemon">
              <span className="pokemonInfo">
                <div className="info">
                  Lvl. {cpuCurrentPokemon[0].level} {cpuCurrentPokemon[0].name}
                </div>
                <span className="healthinfo">
                  <span className="healthbar"></span>
                  <div className="healthnumber">
                    {cpuCurrentPokemon[0].currentstats.currenthp}/
                    {cpuCurrentPokemon[0].currentstats.maxhp}
                  </div>
                </span>
                <div className="stats">
                  <div className="stat">
                    Att: {cpuCurrentPokemon[0].currentstats.att}
                  </div>
                  <div className="stat">
                    Def: {cpuCurrentPokemon[0].currentstats.def}
                  </div>
                  <div className="stat">
                    SpA: {cpuCurrentPokemon[0].currentstats.spa}
                  </div>
                  <div className="stat">
                    SpD: {cpuCurrentPokemon[0].currentstats.spd}
                  </div>
                  <div className="stat">
                    Spe: {cpuCurrentPokemon[0].currentstats.spe}
                  </div>
                  <div className="stat">Type: {cpuCurrentPokemon[0].type}</div>
                </div>
              </span>
              <img
                src={require("./pokeimgs/" +
                  cpuCurrentPokemon[0].pokeId +
                  ".png")}
              />
            </div>
          </div>
          <div className="actions">
            <div className="moves">
              <a
                className="move"
                value="move1"
                onClick={executeMove}
                name="move1"
              >
                <div className="movetitle">
                  {allUserPokemon[0].moves.move1.moveName}
                </div>
                <div> {allUserPokemon[0].moves.move1.typeId}</div>
                <div>{allUserPokemon[0].moves.move1.power}</div>

                <div>PP: {allUserPokemon[0].moves.move1.pp}</div>
              </a>
              <a className="move" onClick={executeMove} name="move2">
                <div className="movetitle">
                  {allUserPokemon[0].moves.move2.moveName}
                </div>
                <div> {allUserPokemon[0].moves.move2.typeId}</div>
                <div>{allUserPokemon[0].moves.move2.power}</div>

                <div>PP: {allUserPokemon[0].moves.move2.pp}</div>
              </a>
              <a className="move" onClick={executeMove} name="move3">
                <div className="movetitle">
                  {allUserPokemon[0].moves.move3.moveName}
                </div>
                <div>{allUserPokemon[0].moves.move3.typeId}</div>
                <div>{allUserPokemon[0].moves.move3.power}</div>

                <div>PP: {allUserPokemon[0].moves.move3.pp}</div>
              </a>
              <a className="move" onClick={executeMove} name="move4">
                <div className="movetitle">
                  {allUserPokemon[0].moves.move4.moveName}
                </div>
                <div> {allUserPokemon[0].moves.move4.typeId}</div>
                <div>{allUserPokemon[0].moves.move4.power}</div>

                <div>PP: {allUserPokemon[0].moves.move4.pp}</div>
              </a>
            </div>
          </div>
        </div>
        <div className="pokemonparty">
          <PokemonPartyCard userPokemon={allUserPokemon[0]} />
          <PokemonPartyCard userPokemon={allUserPokemon[1]} />
          <PokemonPartyCard userPokemon={allUserPokemon[2]} />
          <PokemonPartyCard userPokemon={allUserPokemon[3]} />
          <PokemonPartyCard userPokemon={allUserPokemon[4]} />
          <PokemonPartyCard userPokemon={allUserPokemon[5]} />
        </div>
      </div>

      <div className="gametext">
        <div className="battleInfo">
          <div id="reflog" className="infoStream" ref={refLog}>
            <h3>Welcome to Pokemon FireRed Nuzlocke Sim</h3>
            <p>
              This is the Event Log where you will see all actions and result
              and make decisions about your story.
            </p>

            <p>
              Levels will increase to level cap for all pokemon for each fight
              and you will recieve one random pokemon from each area as you
              would in a normal nuzlocke except you will not have to catch them.
              No duplicate pokemon will be given.
            </p>

            <h4>Select your Starter Pokemon!</h4>

            {logInfo}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
