const loadcatagory = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => {
            diplayData(data.categories)

        })
}
const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => {
            document.getElementById("btn-all").classList.add("active");
            videoapi(data.videos)
        })
    removeActive();
}
const removeActive = () => {
    const calssActive = document.getElementsByClassName("active");
    for (const btn of calssActive) {
        btn.classList.remove("active")
    }
}
const catagoriapi = (id) => {
    const url = `
    https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            videoapi(data.category)
            removeActive();
            const btnSelected = document.getElementById(`btn-${id}`);
            btnSelected.classList.add("active");

        })
}
const videoapi = (allvideos) => {
    const videoSection = document.getElementById("video-conteiner");
    videoSection.innerHTML = "";
    if (allvideos.length === 0) {
        videoSection.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center py-20 text-center">
        <img src="/assests/Icon.png" alt="">
        <h2 class="text-2xl font-bold">Oops! No Video Abailable!</h2>
    </div>
        `;
        return;
    }
    allvideos.forEach((video) => {
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
         <div class="card bg-base-10">
            <figure class="relative">
                <img class=" h-[160px] rounded-sm object-cover" src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute  bottom-2 right-2 text-white bg-black px-2 text-sm rounded">3hrs 56min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <h2 class="text-sm font-semibold">${video.title}</h2>
                    <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} <img
                           class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>
                           <p class="text-sm text-gray-400">${video.others.views}</p>
                </div>
            </div>
        </div>
    `;
        videoSection.append(videoCard)
    });

}

const diplayData = (categorie) => {
    const catagoryContainer = document.getElementById("catagory-container");

    for (const cat of categorie) {
        const catagoryDiv = document.createElement("div");
        catagoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="catagoriapi(${cat.category_id});" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-[#F9F9F9]">${cat.category}</button>
        
        `;
        catagoryContainer.append(catagoryDiv)
    }
}
loadcatagory();