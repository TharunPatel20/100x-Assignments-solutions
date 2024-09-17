document.getElementById("output").innerHTML = "";
const outputEle = document.getElementById("output");

function removeThem() {
  document.getElementById("output").innerHTML = "List is clear";
}

async function getThem() {
  document.getElementById("output").innerHTML = "";
  const numberOfCards = parseInt(
    document.getElementById("NoOfcards").value,
    10
  );
  const category = document.getElementById("category").value;

  if (category === "random") {
    await withoutCategory(numberOfCards);
    //   } else if (category === "all") {
    //     await withoutCategory(numberOfCards);
  } else {
    await withCategory(category, numberOfCards);
  }
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 10)); // Add a delay
}

async function withCategory(category, numberOfCards) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/type/${category}`
    );
    const pokemonList = response.data.pokemon.slice(0, numberOfCards);

    for (const pokemon of pokemonList) {
      try {
        const res = await axios.get(pokemon.pokemon.url);
        const card = `
        
          <div>
            <h3>${res.data.name}</h3>
            <p>Types: ${res.data.types
              .map((type) => type.type.name)
              .join(", ")}</p>
            <img src="${res.data.sprites.front_default}" alt="${
          res.data.name
        }" />
          </div>
        `;
        outputEle.innerHTML += card;
      } catch (error) {
        console.log(error);
      }
      await delay();
    }
  } catch (error) {
    console.log(error);
  }
}

async function withoutCategory(numberOfCards) {
  for (let i = 0; i < numberOfCards; i++) {
    const id = Math.floor(Math.random() * 898) + 1; // Corrected ID range
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const card = `
      
        <div>
          <h3>${res.data.name}</h3>
          <p>Types: ${res.data.types
            .map((type) => type.type.name)
            .join(", ")}</p>
          <img src="${res.data.sprites.front_default}" alt="${res.data.name}" />
        </div>
       
      `;
      outputEle.innerHTML += card;
      await delay(); // Add a delay to avoid hitting the API too quickly
    } catch (error) {
      console.log(error);
    }
  }
}
