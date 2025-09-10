const categoryPetsContainer = document.getElementById("categoryPetsContainer");
const showPetsContainer = document.getElementById("showPetsContainer");
const likeImgContainer = document.getElementById("likeImgContainer");
const modalShowContainer = document.getElementById("modalShowContainer");
const adoptContainerBtn = document.getElementById("adoptContainerButton");
let likeThumbnails = [];
const loadCategoryAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => {
      showCategoryAllPets(data.categories);
    });
};

const showCategoryAllPets = (categoryAllPets) => {
  // console.log(categoryAllPets);
  // categoryPetsContainer = "";
  categoryAllPets.forEach((categoryPet) => {
    categoryPetsContainer.innerHTML += `
    <div id='${categoryPet.id}' class="category-click flex items-center gap-4  border-green-700 rounded-3xl py-3 px-6 hover:shadow-2xl hover:bg-green-300 hover:text-white cursor-pointer">
     <img class="h-10" src="${categoryPet.category_icon}"/>
     <h1 class="font-bold text-xl">${categoryPet.category}</h1>
    </div>
  `;
  });
};
categoryPetsContainer.addEventListener("click", (e) => {
  if (e.target.className.includes("category-click")) {
    const activeButtons = document.getElementsByClassName("category-click");
    for (const button of activeButtons) {
      button.classList.remove("border");
      // console.log(activeButtons);
    }
    e.target.classList.add("border");
    // console.log(e.target.id);
    const name = e.target.children[1].innerText;

    loadCategoryPets(name);
  }
});
const loadCategoryPets = (name) => {
  loading();
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${name}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.data);
      showCategoryPetsByName(data.data);
    })
    .catch((err) => {
      errorMessage();
    });
};
const showCategoryPetsByName = (categoryPetsByName) => {
  if (categoryPetsByName.length === 0) {
    errorMessage();
    return;
  }
  showPetsContainer.innerHTML = "";
  categoryPetsByName.forEach((singlePet) => {
    showPetsContainer.innerHTML += `

     <div id=${singlePet.petId} class=" shadow-2xl p-3 w-fit rounded-md">
      <img class="w-[270px] h-[160px] rounded-sm" src="${singlePet.image}"/>
      <h1 class="font-bold text-lg my-1">${singlePet.pet_name}</h1>
      <p class="text-gray-500">Breed:${singlePet.breed}</p>
      <p class="text-gray-500">Birth:${singlePet.date_of_birth}</p>
      <p class="text-gray-500">Gender:${singlePet.gender}</p>
      <p class="text-gray-500"> Price:${singlePet.price}$</p>

      <div class="flex justify-around my-5">
        <a class="btn like"><i class="fa-regular fa-thumbs-up"></i></a>
        <a class="btn" id="adoptContainerButton">Adopt</a>
        <a class="btn">Details</a>
      </div>

     </div>

    `;
  });
};
const loadAllPets = () => {
  loading();
  fetch(" https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      showAllPets(data.pets);
    })
    .catch((err) => {
      errorMessage();
    });
};
const showAllPets = (allPets) => {
  showPetsContainer.innerHTML = "";
  allPets.forEach((singlePet) => {
    // console.log(singlePet);
    showPetsContainer.innerHTML += `

     <div id=${singlePet.petId} class=" shadow-2xl p-3 w-fit rounded-md">
      <img class="w-[270px] h-[160px] rounded-sm" src="${singlePet.image}"/>
      <h1 class="font-bold text-lg my-1">${singlePet.pet_name}</h1>
      <p class="text-gray-500">Breed:${singlePet.breed}</p>
      <p class="text-gray-500">Birth:${singlePet.date_of_birth}</p>
      <p class="text-gray-500">Gender:${singlePet.gender}</p>
      <p class="text-gray-500"> Price:${singlePet.price}$</p>

      <div class="flex justify-around my-5">
        <a class="btn like"><i class="fa-regular fa-thumbs-up"></i></a>
        <a class="btn"id="adoptContainerButton">Adopt</a>
        <a class="btn">Details</a>
      </div>

     </div>

    `;
  });
};

showPetsContainer.addEventListener("click", (e) => {
  if (e.target.className.includes("like")) {
    const image = e.target.parentNode.parentNode.children[0].src;
    const id = e.target.parentNode.parentNode.id;
    // console.log(id);
    e.target.classList.add("bg-green-500");
    for (const likeImage of likeThumbnails) {
      if (likeImage.id === id) {
        // console.log("same id");
        removeLikeImage(id);
        e.target.classList.remove("bg-green-500");
        showLikeThumbnail(likeThumbnails);
        return;
      }
    }
    likeThumbnails.push({
      id: id,
      image: image,
    });
    showLikeThumbnail(likeThumbnails);
  }
  if (e.target.innerText === "Details") {
    const id = e.target.parentNode.parentNode.id;
    // console.log(id);
    // console.log("details click");
    loadDetailsById(id);
    my_modal_5.showModal();
  }
  if (e.target.innerText === "Adopt") {
    console.log("click Adopt ");

    e.target.innerText = "Adopted";
    e.target.classList.add("bg-green-400");
  }
});
const showLikeThumbnail = (likeThumbnails) => {
  likeImgContainer.innerHTML = "";
  likeThumbnails.forEach((likeImage) => {
    likeImgContainer.innerHTML += `
     <img class="rounded-sm" src="${likeImage.image}"/>
    
    `;
  });
};
const removeLikeImage = (id) => {
  const filteredLikeImage = likeThumbnails.filter(
    (likeThumbnail) => likeThumbnail.id !== id
  );
  likeThumbnails = filteredLikeImage;
  showLikeThumbnail(likeThumbnails);
};
const loadDetailsById = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showModalDetailsById(data.petData);
    });
};
const showModalDetailsById = (detailsPet) => {
  // console.log(detailsPet);
  modalShowContainer.innerHTML = `
   <div class="space-y-2">
    <img src="${detailsPet.image}"/>
    <h1 class="font-bold text-lg">${detailsPet.pet_name}</h1>

    <div class="grid grid-cols-2 ">
       <p>Breed:${detailsPet.breed}</p>
        <p>Birth:${detailsPet.date_of_birth}</p>
       <p>Gender:${detailsPet.gender}</p>
       <p>Price:${detailsPet.price}</p>
       <p>Vaccinated status:${detailsPet.vaccinated_status}</p>
         </div>
       <h1 class="font-bold text-lg">Details Information</h1>
       <p>${detailsPet.pet_details}</p>
       
 
   
   
   
   </div>
  `;
};

const loading = () => {
  showPetsContainer.innerHTML = `
<div class="grid col-span-11 justify-center items-center">
  <span class="loading loading-spinner text-success"></span>

</div>
  `;
};
const errorMessage = () => {
  showPetsContainer.innerHTML = `
<div class="grid col-span-11 justify-center items-center">
  <img class="mx-auto" src='./images/error.webp'/>
  <h1 class="text-center text-2xl font-bold">No Information Available</h1>
  <p class="text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br>
its layout. The point of using Lorem Ipsum is that it has a.</p>

</div>
  `;
};

loadCategoryAllPets();

loadAllPets();
