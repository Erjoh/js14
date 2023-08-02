const imgWrap = document.querySelector('.img-wrapper')
const rate = document.querySelector('.rate')
const like = document.querySelector('.like')
const dislike = document.querySelector('.dislike')
const vote = document.querySelector('#vote')
const breeds = document.querySelector('#breeds')
// const tabs = document.querySelector('.tab')
const uptipe = document.querySelector('.uptipe')
const selectOpt = document.querySelector('.select-opt')

const breedDiv = document.querySelector('.breed-desc')

let array;

const handleCats = async () => {
    await fetch('https://api.thecatapi.com/v1/images/search')
        .then(res => res.json())
        .then(data => {
            imgWrap.innerHTML = `
                    <img src=${data[0].url} alt="list-img"/>
                    `
        })
        .catch(err => console.log(err))

}

like.addEventListener('click', () => {
    handleCats()
})
dislike.addEventListener('click', () => {
    handleCats()
})

vote.addEventListener('click', () => {
    imgWrap.style.display = 'block'
    uptipe.style.display = 'none'
    rate.style.display = 'block'
    handleCats()
})

const handleBreeds = async () => {
    let bredList = []
    await fetch('https://api.thecatapi.com/v1/breeds')
        .then(res => res.json())
        .then(bred => {
        array = bred
            showBreed(bred[0])
            bred.map(porody => {
                selectOpt.innerHTML += `
        <option class="">${porody.name}</option>
        `
            })
            const selectedIndex = document.getElementById('#select-opt').selectedIndex

        })
        .catch(err => console.log(err))

}

const getBreedImg = async (breed) => {
    const response = await  fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`)
    const jsonBody = await response.json()
    return jsonBody
}

selectOpt.addEventListener('change', async (event)=> {
  const chosenBred =  array.filter((item)=> item.name === event.target.value)
    showBreed(chosenBred[0])
})

const showBreed = async (chosenBred) => {
    const fetchedBreed = await getBreedImg(chosenBred.id)
    breedDiv.innerHTML = `
                 <img src=${fetchedBreed[0].url} alt="bred-img">
                <h3>${chosenBred.name}</h3>
                 <p>id:${chosenBred.id}</p>
                 <p>${chosenBred.description}</p>
                 <p>${chosenBred.temperament}</p>
                 <span>${chosenBred.weight.metric} kgs</span>
                 <span>${chosenBred.life_span} average life span</span>
                `
}

// data => {
//     uptipe.innerHTML = `
//         <span>${data.origin}</span>
//         <span>${data.life_span}</span>
//                 `

breeds.addEventListener('click', () => {
    handleBreeds()
    rate.style.display = 'none'
    imgWrap.style.display = 'none'
    uptipe.style.display = 'block'
})