import React, { useEffect } from "react";
var live = false
const BattleScene = ({ userpokemonparty, cpupokemonparty, nextStep }) => {
  console.log("userbattle team", userpokemonparty);
  console.log("cpu poke battle team", cpupokemonparty)
  let placeholder = {
    ability: "",
    pokeId: 0,
    battlestats: {
      att: { value: 0, stage: 0 },
      currenthp: 1,
      def: { value: 0, stage: 0 },
      maxhp: 1,
      spa: { value: 0, stage: 0 },
      spd: { value: 0, stage: 0 },
      spe: { value: 0, stage: 0 },
    },
    moves: {
      move1: {
        moveId: 0,
        moveName: "",
        pp: 0,
        power: 0,
      },
      move2: {
        moveId: 0,
        moveName: "",
        pp: 0,
        power: 0,
      },
      move3: {
        moveId: 0,
        moveName: "",
        pp: 0,
        power: 0,
      },
      move4: {
        moveId: 0,
        moveName: "",
        pp: 0,
        power: 0,
      },
    },
    condition: {},
    item: "",
    level: 0,
    name: "",
    status: "",
  };

  let newuserbattleteam = [placeholder];
  let newcpubattleteam = [placeholder];
  const [userBattleTeam, updateUserBattleTeam] =
    React.useState(newuserbattleteam);
  const [cpuBattleTeam, updateCpuBattleTeam] =
    React.useState(newuserbattleteam);

  
  if(userpokemonparty[0].pokeId === 0){
    live= false

  } else {

    live = true
  }
  
    useEffect(() => {
    console.log("use effect");

    userpokemonparty.forEach((pokemon) => {
      let newpkmn = {};
      if (pokemon.pokeId != 0) {
        newpkmn = pokemon;
        let userbattlepkmn = {};
        userbattlepkmn.battlestats = {
          maxhp: newpkmn.currentstats.maxhp,
          currenthp: newpkmn.currentstats.currenthp,
          att: { value: newpkmn.currentstats.att, stage: 0 },
          def: { value: newpkmn.currentstats.def, stage: 0 },
          spa: { value: newpkmn.currentstats.spa, stage: 0 },
          spd: { value: newpkmn.currentstats.spd, stage: 0 },
          spe: { value: newpkmn.currentstats.spe, stage: 0 },
        };
        userbattlepkmn.level = pokemon.level;
        userbattlepkmn.name = pokemon.name;
        userbattlepkmn.status = "";
        userbattlepkmn.item = "";
        userbattlepkmn.condition = {};
        userbattlepkmn.pokeId = pokemon.pokeId;
        userbattlepkmn.moves = pokemon.moves;
        userbattlepkmn.type = pokemon.type;
        //Remember to set this on reception of pokemon!!!!!
        userbattlepkmn.ability = pokemon.profile.ability[0][0];

        newuserbattleteam.push(userbattlepkmn);
      }
    });
    
    newuserbattleteam = newuserbattleteam.filter(
      (pokemon) => pokemon.pokeId != 0
    );

    if (newuserbattleteam.length != 0) {
      updateUserBattleTeam([...newuserbattleteam]);
    }

    cpupokemonparty.forEach((pokemon) => {
      let newpkmn = {};
      
        newpkmn = pokemon;
        let userbattlepkmn = {};
        userbattlepkmn.battlestats = {
          maxhp: newpkmn.currentstats.maxhp,
          currenthp: newpkmn.currentstats.currenthp,
          att: { value: newpkmn.currentstats.att, stage: 0 },
          def: { value: newpkmn.currentstats.def, stage: 0 },
          spa: { value: newpkmn.currentstats.spa, stage: 0 },
          spd: { value: newpkmn.currentstats.spd, stage: 0 },
          spe: { value: newpkmn.currentstats.spe, stage: 0 },
        };
        userbattlepkmn.level = pokemon.level;
        userbattlepkmn.name = pokemon.name;
        userbattlepkmn.status = "";
        userbattlepkmn.item = "";
        userbattlepkmn.condition = {};
        userbattlepkmn.pokeId = pokemon.pokeId;
        userbattlepkmn.moves = pokemon.moves;
        userbattlepkmn.type = pokemon.type;
        //Remember to set this on reception of pokemon!!!!!
        userbattlepkmn.ability = pokemon.profile.ability[0][0];

        newcpubattleteam.push(userbattlepkmn);
      
    });
    newcpubattleteam = newcpubattleteam.filter(
      (pokemon) => pokemon.pokeId != 0
    );
    if(newcpubattleteam.length === 0){
      newcpubattleteam = [placeholder]

    }

    if (newcpubattleteam.length != 0) {
      updateCpuBattleTeam([...newcpubattleteam]);
    }


  }, [userpokemonparty, cpupokemonparty]);

  const calcDamage = (move, attacker, defender) => {
    console.log(attacker);
    console.log(defender);
    let damage =
      (((2 * attacker.level) / 5 + 2) *
        move.power *
        attacker.battlestats.att.value) /
      defender.battlestats.def.value /
      50;

    return damage;
  };

  const calcMove = (move, attacker, defender) => {
    let bothpokemonarray = [attacker, defender];
    let newattacker = attacker;
    let newdefender = defender;
    // Effect Normal Damage
    if (move.effectId === "1") {
      let attackerdamage = calcDamage(move, attacker, defender);
      let defendernewhealth = Math.ceil(
        defender.battlestats.currenthp - attackerdamage
      );

      newdefender = {
        ...defender,

        battlestats: {
          ...defender.battlestats,
          currenthp: defendernewhealth,
        },
      };

      bothpokemonarray = [newattacker, newdefender];
    }

    return bothpokemonarray;
  };

  let userfainted = 0;
  let cpufainted = 0;
  const checkBattleState = () => {
    if(live){
    if (userBattleTeam[0].battlestats.currenthp <= 0) {
      console.log("switch pokemon");
      userfainted = userfainted + 1;
      if (userfainted === userBattleTeam.length) {
        console.log("you lose");
        live = false
       
      }
    }

    if (cpuBattleTeam[0].battlestats.currenthp <= 0) {
      console.log("switch pokemon");
      cpufainted = cpufainted + 1;
      if (cpufainted === cpuBattleTeam.length) {
        console.log("you win");
        live = false
        nextStep();
      }
    }

}
  };

  const checkPriority = (usermove, userpokemon, cpumove, cpupokemon) => {
    console.log("moves", usermove, cpumove);
    console.log("prioritys", usermove.priority, cpumove.priority); //priority value is str not int change
    if (parseInt(usermove.priority) != parseInt(cpumove.priority)) {
      if (parseInt(usermove.priority) > parseInt(usermove.priority)) {
        return [
          { move: usermove, pokemon: userpokemon },
          { move: cpumove, pokemon: cpupokemon },
        ];
      } else {
        return [
          { move: cpumove, pokemon: cpupokemon },
          { move: usermove, pokemon: userpokemon },
        ];
      }
    } else {
      if (
        userpokemon.battlestats.spe.value != cpupokemon.battlestats.spe.value
      ) {
        console.log("speed diff");
        if (
          userpokemon.battlestats.spe.value > cpupokemon.battlestats.spe.value
        ) {
          console.log("you are faster");
          return [
            { move: usermove, pokemon: userpokemon },
            { move: cpumove, pokemon: cpupokemon },
          ];
        } else {
          return [
            { move: cpumove, pokemon: cpupokemon },
            { move: usermove, pokemon: userpokemon },
          ];
        }
      } else {
        let random = Math.floor(Math.random() * 2);
        console.log(random);
        if (random === 0) {
          return [
            { move: cpumove, pokemon: cpupokemon },
            { move: usermove, pokemon: userpokemon },
          ];
        } else {
          return [
            { move: usermove, pokemon: userpokemon },
            { move: cpumove, pokemon: cpupokemon },
          ];
        }
      }
    }
  };

  //Executes a move in the turn
  const [movelockout, setMoveLockout] = React.useState("auto");
  const executeMove = (event) => {
    setMoveLockout("none");
    let movename = event.currentTarget.getAttribute("name");
    let usermove = userBattleTeam[0].moves[movename];
    let cpumove = cpuBattleTeam[0].moves.move1;
    let battleorder = checkPriority(
      usermove,
      userBattleTeam[0],
      cpumove,
      cpuBattleTeam[0]
    );

    console.log("battle order", battleorder);
    let moveorder = [battleorder[0].move, battleorder[1].move];

    let bothpokemon = [battleorder[0].pokemon, battleorder[1].pokemon];

    bothpokemon = calcMove(moveorder[0], bothpokemon[0], bothpokemon[1]);

    bothpokemon = calcMove(moveorder[1], bothpokemon[1], bothpokemon[0]);
    console.log("first move", bothpokemon);

    let userpkmn =
      bothpokemon[0].name === userBattleTeam[0].name
        ? bothpokemon[0]
        : bothpokemon[1];

    let cpupkmn =
      bothpokemon[0].name === cpuBattleTeam[0].name
        ? bothpokemon[0]
        : bothpokemon[1];

    if (bothpokemon[0].name === userBattleTeam[0].name) {
      updateUserBattleTeam((prevState) => {
        let dup = [...prevState];
        dup.shift();

        dup.unshift(userpkmn);
        return [...dup];
      });

      setTimeout(() => {
        updateCpuBattleTeam((prevState) => {
          let dup = [...prevState];
          dup.shift();

          dup.unshift(cpupkmn);

          return [...dup];
        });
        setMoveLockout("auto");
      }, 1000);
    } else {
      updateCpuBattleTeam((prevState) => {
        let dup = [...prevState];
        dup.shift();

        dup.unshift(cpupkmn);

        return [...dup];
      });

      setTimeout(() => {
        updateUserBattleTeam((prevState) => {
          let dup = [...prevState];
          dup.shift();

          dup.unshift(userpkmn);
          return [...dup];
        });

        setMoveLockout("auto");
      }, 1000);
    }

    console.log(userBattleTeam);
    console.log(bothpokemon);
  };

  let healthbar = {
    height: 20,
    width:
      toString(
        userBattleTeam[0].battlestats.currenthp /
          userBattleTeam[0].battlestats.maxhp
      ) + "",
    borderRadius: 10,
    backgroundColor: "blue",
  };

  useEffect(() => {
    checkBattleState();
  }, [
    userBattleTeam[0].battlestats.currenthp,
    cpuBattleTeam[0].battlestats.currenthp,
  ]);

  const checkItem = () => {};

  const battleTurn = (event) => {
    //when battle starts check abilities and items

    //checkAction |  item, attack, switch  |
    let actionname = event.currentTarget.getAttribute("name");
    //check abilities and held items
    //use action 1
    //check for switch or game end

    //use action 2
    //check for switch or game end

    //post attack effects i.e. poison, abilities, items
  };

  return (
    <div className="battleScene">
      <h1>Battle Name</h1>
      <div className="fight">
        <div className="pokemon">
          <span className="pokemonInfo">
            <div className="info">
              Lvl. {userBattleTeam[0].level} {userBattleTeam[0].name}
            </div>
            <span className="healthinfo">
              <span
                className="healthbar"
                style={{
                  width:
                    (userBattleTeam[0].battlestats.currenthp /
                      (userBattleTeam[0].battlestats.maxhp + 1)) *
                      100 +
                    "%",
                  backgroundColor: "red",
                }}
              ></span>
              <div className="healthnumber">
                {userBattleTeam[0].battlestats.currenthp}/
                {userBattleTeam[0].battlestats.maxhp}
              </div>
            </span>
            <div className="stats">
              <div className="stat">
                Att: {userBattleTeam[0].battlestats.att.value}
              </div>
              <div className="stat">
                Def: {userBattleTeam[0].battlestats.def.value}
              </div>
              <div className="stat">
                SpA: {userBattleTeam[0].battlestats.spa.value}
              </div>
              <div className="stat">
                SpD: {userBattleTeam[0].battlestats.spd.value}
              </div>
              <div className="stat">
                Spe: {userBattleTeam[0].battlestats.spe.value}
              </div>
              <div className="stat">Type: {userBattleTeam[0].type}</div>
            </div>
          </span>
          <img
            src={require("./pokeimgs/" + userBattleTeam[0].pokeId + ".png")}
          />
        </div>
        <div className="cpupokemon">
          <span className="pokemonInfo">
            <div className="info">
              Lvl. {cpuBattleTeam[0].level} {cpuBattleTeam[0].name}
            </div>
            <span className="healthinfo">
              <span
                className="healthbar"
                style={{
                  width:
                    (cpuBattleTeam[0].battlestats.currenthp /
                      (cpuBattleTeam[0].battlestats.maxhp + 1)) *
                      100 +
                    "%",
                  backgroundColor: "green",
                }}
              ></span>
              <div className="healthnumber">
                {cpuBattleTeam[0].battlestats.currenthp}/
                {cpuBattleTeam[0].battlestats.maxhp}
              </div>
            </span>
            <div className="stats">
              <div className="stat">
                Att: {cpuBattleTeam[0].battlestats.att.value}
              </div>
              <div className="stat">
                Def: {cpuBattleTeam[0].battlestats.def.value}
              </div>
              <div className="stat">
                SpA: {cpuBattleTeam[0].battlestats.spa.value}
              </div>
              <div className="stat">
                SpD: {cpuBattleTeam[0].battlestats.spd.value}
              </div>
              <div className="stat">
                Spe: {cpuBattleTeam[0].battlestats.spe.value}
              </div>
              <div className="stat">Type: {cpuBattleTeam[0].type}</div>
            </div>
          </span>
          <img
            src={require("./pokeimgs/" + cpuBattleTeam[0].pokeId + ".png")}
          />
        </div>
      </div>
      <div className="actions">
        <div className="moves">
          <a
            className="move"
            value="move1"
            onClick={executeMove}
            style={{ pointerEvents: movelockout }}
            name="move1"
          >
            <div className="movetitle">
              {userBattleTeam[0].moves.move1.moveName}
            </div>
            <div> {userBattleTeam[0].moves.move1.typeId}</div>
            <div>{userBattleTeam[0].moves.move1.power}</div>

            <div>PP: {userBattleTeam[0].moves.move1.pp}</div>
          </a>
          <a className="move" onClick={executeMove} name="move2">
            <div className="movetitle">
              {userBattleTeam[0].moves.move2.moveName}
            </div>
            <div> {userBattleTeam[0].moves.move2.typeId}</div>
            <div>{userBattleTeam[0].moves.move2.power}</div>

            <div>PP: {userBattleTeam[0].moves.move2.pp}</div>
          </a>
          <a className="move" onClick={executeMove} name="move3">
            <div className="movetitle">
              {userBattleTeam[0].moves.move3.moveName}
            </div>
            <div>{userBattleTeam[0].moves.move3.typeId}</div>
            <div>{userBattleTeam[0].moves.move3.power}</div>

            <div>PP: {userBattleTeam[0].moves.move3.pp}</div>
          </a>
          <a className="move" onClick={executeMove} name="move4">
            <div className="movetitle">
              {userBattleTeam[0].moves.move4.moveName}
            </div>
            <div> {userBattleTeam[0].moves.move4.typeId}</div>
            <div>{userBattleTeam[0].moves.move4.power}</div>

            <div>PP: {userBattleTeam[0].moves.move4.pp}</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BattleScene;
