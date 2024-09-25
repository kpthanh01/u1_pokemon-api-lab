const inputTag = document.getElementById('input');
const searchTag = document.getElementById('search');
const spriteTag = document.getElementById('sprite');
const nameTag = document.getElementById('name');
const orderNumTag = document.getElementById('order');
const statsTag = document.getElementById('stats');
const abilityTag = document.getElementById('abilities');
const typesTag = document.getElementById('types');
const infoTag = document.querySelector('.infoContainer');
let pkmAPI = 'https://pokeapi.co/api/v2/pokemon/';
let pokeData = '';
let statList = [];
let stats = ['Hp', 'Atk', 'Def', 'sp.Atk', 'Sp.Def', 'Speed']
const colorTypes = {
  normal: '#9fa19f',
  fighting: '#ff8000',
  flying: '#81b9ef',
  poison: '#9141cb',
  ground: '#915121',
  rock: '#afa981',
  bug: '#91a119',
  ghost: '#704170',
  steel: '#5d7d89',
  stellar: '#40b5a5',
  fire: '#e62829',
  water: '#2980ef',
  grass: '#4da838',
  electric: '#e6b30c',
  psychic: '#ef4179',
  ice: '#3ec7ea',
  dragon: '#5060e1',
  dark: '#624d4e',
  fairy: '#ef70ef'
}

let getPokemon = async (name) => {
  let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  pokeData = pokemon.data
  statList = [...pokeData.stats]
  statList.forEach(item => {

  })
}

function renderInfo() {
  console.log(statList)
  spriteTag.style.display = 'block';
  infoTag.style.display = 'block';
  spriteTag.setAttribute('src', `${pokeData.sprites.front_default}`);
  nameTag.innerText = pokeData.name;
  orderNumTag.innerText = `#${pokeData.order}`;

  let statValue = '';
  let abilitesValue = '';
  let typesValue = '';

  pokeData.types.forEach(item => {
    let color = '';
    Object.keys(colorTypes).forEach(value => {
      value === item.type.name ? color = colorTypes[value] : ''
    })
    typesValue += `<p style="background-color:${color};">${item.type.name}</p>`
    typesTag.innerHTML = typesValue
  })

  pokeData.abilities.forEach(item => {
    abilitesValue += `<p>${item.ability.name}</p>`
    abilityTag.innerHTML = abilitesValue
  })

  pokeData.stats.forEach((item, index) => {
    statValue += `<p>${stats[index]}: ${item.base_stat}</p>`
    statsTag.innerHTML = statValue
  })
}

searchTag.addEventListener('click', () => {
  if (inputTag.value) {
    getPokemon(inputTag.value);
    setTimeout(renderInfo, 100);
  } 
})
