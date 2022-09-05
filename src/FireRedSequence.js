const FireRedSequence = [

    {
        type: "pick",
        pokemon: [1 , 4, 7], 
        level: 5

    },

    {
        type:"battle",
        pokemon: [1, 4, 7],
        rival: true,
        first: true,
        levelcap: 5


    },

    {
        type: "receive",
        pokemon:[10]

    },

    {
        type:"battle",
        pokemon: [22, 14],
        rival: false,
        first: false,
        levelcap: 15


    },


]

export default FireRedSequence