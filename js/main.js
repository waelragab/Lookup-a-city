const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");



//Search states.json and filter it
const searchStates = async searchText => {
    const res = await fetch("../data/states.json")
    const states = await res.json();

   //get matches to current text input
   let matches = states.filter(state => {
       const regex = new RegExp(`^${searchText}`, "gi");
       return state.city.match(regex) || state.country.match(regex)
   });

   if(searchText.length === 0){
       matches = [];
       matchList.innerHTML = "";
   }
   outputHtml(matches);
}

const outputHtml = matches =>{
    if(matches.length > 0){
        const html = matches.map(match => `
    <div class="card card-body mb-1">
        <h4>${match.city} (${match.country})
            <span class="text-primary">
                ${match.iso2}
            </span>
        </h4>
        <span class="text-primary">
                Population: ${match.population}
            </span>
        <small> Lat: ${match.lat} <br> Long: ${match.lng}</small>
    </div>
        `).join(" ");
        matchList.innerHTML = html;
    }
};

search.addEventListener("input", () => searchStates(search.value));