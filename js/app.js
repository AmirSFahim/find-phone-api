const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit)
}

const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ''
    // display 20 phone only 
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {

        showAll.classList.add('d-none')
    }

    const nophone = document.getElementById('no-found-message')

    if (phones.length === 0) {
        nophone.classList.remove('d-none')
    }
    else nophone.classList.add('d-none')
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                                to additional content. This content is a little bit longer.</p>
                                <button onclick="loadPhoneDetail('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">show details</button>
                        </div>
                    </div>
        `
        phoneContainer.appendChild(phoneDiv)

    })// stop loader 
    toggleApiner(false)
}

const processSearch = (dataLimit) => {
    toggleApiner(true);
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit)
}
document.getElementById('btn-search').addEventListener('click', function () {
    // start loader 
    processSearch(10);
})

// enter key 
document.getElementById('searchField').addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        processSearch(10);
    }
})


const toggleApiner = isLoading => {
    const loaderScetion = document.getElementById('loader')
    if (isLoading) {

        loaderScetion.classList.remove('d-none')
    }
    else {
        loaderScetion.classList.add('d-none')
    }
}



// show all btn load show all 
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})



// loadphone detai 
const loadPhoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`

    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)

}

const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById('phoneDetailModalDetail');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-detais')
    phoneDetails.innerHTML = `
 <p> realease date : ${phone.releaseDate ? phone.releaseDate : 'no release date '} </p>
 <P> storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'no informatin'} </p>
 <p> others: ${phone.others ? phone.others.Bluethooth : 'no bluethooth'}</p>
 `
}

// loadPhone('apple')