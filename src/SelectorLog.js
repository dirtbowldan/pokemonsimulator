import React from "react";
import PokemonCard from "./PokemonCard";


class SelectorLog extends React.Component {
    constructor() {
      super();
      this.inputRef = React.createRef();
    }
  
    hide = () => {
        
      
    };
    

    render() {
      return (
        <>
          <div ref={this.inputRef} onClick={() => this.hide()} className="select" >
              {this.props.pokemon.map((item) => { return (<PokemonCard pokeId={item} receive={this.props.receivePokemon} level ={this.props.level} />)})}
            </div>
         
        </>
      );
    }
  }
   
  export default SelectorLog