$(async function () {

    const holder = $("#holder");
    const cardsCountLabel = $("#cards-count");
    const loadRemoteCardsButton = $("#load-remote-cards-btn");

    loadCards();

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

    function setCardsCount(count) {
        cardsCountLabel.text(count);
    }
    
    async function loadCards() {
        let data = await getJsonData();

        data.data.forEach(element => {
            let template = `<div class="col-xl-3 col-lg-3 col-md-4 col-12 my-3">
            <div class="card-container p-0">
                <img class="" src="${element.path}" alt="user" loading="lazy" />   
            </div>
        </div>`;
            holder.append(template)
        });

        holder.slideDown("fast");

        setCardsCount(data.data.length);
        return data.data.length;
    }

    async function removeCards() {
        return new Promise((resolve, reject) => {
            holder.slideUp("slow", function() {
                $(this).children().remove();
                setTimeout(function() {
                    resolve("Done");
                }, 1000)
            });
        });
    }

    function showToast(message) {
        Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            title: message,
            icon: "success"
          });
    }

    function clearLocalStorage() {
        localStorage.clear();
    }

    loadRemoteCardsButton.on("click", async  function() {
        clearLocalStorage();
        setCardsCount(0);
        await removeCards();
        let cardsCount = await loadCards();
        setCardsCount(cardsCount);
        showToast(`Cards Loaded Successfully`);
    });
});