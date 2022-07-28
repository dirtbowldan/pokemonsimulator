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
import BattleScene from "./BattleScene";
var stage = 0

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
    profile: {
      height: "1 m",
      weight: "13 kg",
      egg: ["Monster", "Grass"],
      ability: [
        ["Overgrow", "false"],
        ["Chlorophyll", "true"],
      ],
      gender: "87.5:12.5",
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

 const selectPokemon= (event) => {
  receivePokemon(parseInt(event.currentTarget.getAttribute("name")))
 }

  //Recieve Pokemon From the Log

  const receivePokemon = (pokeId) => {
    //Get new pokemon info from database
    const newpokemon =
      Gen3Pokemon[pokeId];
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

    while (learnnow.length < 4) {
      learnnow.push(emptymove);
    }

    newpokemon.moves = {};
    newpokemon.moves.move1 = learnnow[0];
    newpokemon.moves.move2 = learnnow[1];
    newpokemon.moves.move3 = learnnow[2];
    newpokemon.moves.move4 = learnnow[3];

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

    updateCpuCurrentPokemon(newpokemonarr);

    //creates info to send to log
  };

  //Takes in a node from other commands and appends it to refLog

  const updateLog = (jsobj) => {
    updateLogInfo((prevState) => {
      return [...prevState, jsobj];
    });
  };

  //Executes a move in the turn

  
  const stages = FireRedSequence;
  
  const [currentStage, updateCurrentStage] = React.useState(stages);
  const nextStep = () => {
    if (stages[stage].type === "pick") {
      updateLogInfo([
        <div onClick={nextStep}>
          <SelectorLog
            pokemon={stages[stage].pokemon}
            receivePokemon={selectPokemon}
            level={stages[stage].level}
          />
        </div>,
      ]);
    }
    if (stages[stage].type === "battle") {
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
      setCpuPokemon([0]);
      receivePokemon(stages[stage].pokemon)
      updateLogInfo([<button onClick={nextStep}>next route</button>]);
    }
    stage++;
  };
  const [logInfo, updateLogInfo] = React.useState([
    <button onClick={nextStep}>Start</button>,
  ]);
  let userpokemonparty = [
    allUserPokemon[0],
    allUserPokemon[1],
    allUserPokemon[2],
    allUserPokemon[3],
    allUserPokemon[4],
    allUserPokemon[5],
  ];

  return (
    <div className="screen">
      <div className="gamearea">
        <BattleScene
          userpokemonparty={userpokemonparty}
          cpupokemonparty={cpuCurrentPokemon}
          nextStep={nextStep}
        />
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
