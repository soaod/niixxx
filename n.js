$(async function () {

    const holder = $("#holder");


    async function getJsonData() {
        let cards = localStorage.getItem("cards");
        if ( localStorage.getItem("cards") ) {
            return JSON.parse(cards)
        } 
        let response = await fetch('https://raw.githubusercontent.com/soaod/niixxx/main/2987413980134.json');
        cards =  await (await response.json());

        localStorage.setItem("cards", JSON.stringify(cards));
        return cards;
    }

    let data = await getJsonData();

    data.data.forEach(element => {
        let template = `<div class="col-xl-3 col-lg-3 col-md-4 col-12 my-3">
        <div class="card-container p-0">
            <img class="" src="${element.path}" alt="user" loading="lazy" />   
        </div>
    </div>`;
        holder.append(template)
    });

});
