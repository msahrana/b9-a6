let count = 0;
// all post section
const loadAllPost = async (searchValue) => {
  document.getElementById("loading-spinner").classList.remove("hidden");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValue}`
  );
  const data = await res.json();
  document.getElementById("loading-spinner").classList.add("hidden");
  const allPost = data.posts;
  displayPost(allPost);
};

const displayPost = (allPost) => {
  const discussBarContainer = document.getElementById("discuss-bar");
  discussBarContainer.textContent = "";
  allPost.forEach((post) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="flex flex-col lg:flex-row gap-4 bg-slate-200 rounded-lg p-4">
                    <div>
                        <div id="isActive" class="w-4 h-4 rounded-full ${
                          post.isActive ? "bg-green-500" : "bg-red-500"
                        } ml-24 translate-y-4"></div>
                        <img class="w-32" src="${post.image} alt="">
                    </div>
                    <div class="space-y-6 w-full">
                        <div class="flex gap-5">
                            <h4># <span>${post.category}</span></h4>
                            <h4>Author: <span>${post.author.name}</span></h4>
                        </div>
                        <h2 class="text-xl font-semibold">${post.title}</h2>
                        <p>${post.description}</p>
                            <div class="divider"></div>
                        <div class="flex flex-col lg:flex-row justify-between items-center pl-2 pr-5">
                            <div class="flex gap-5 justify-center items-center">
                                <div class="flex gap-4 justify-center items-center">
                                    <img class="w-8" src="./images/view.png" alt="">
                                    <p>${post.comment_count}</p>
                                </div>
                                <div class="flex gap-4 justify-center items-center">
                                    <img class="w-8" src="./images/eye.png" alt="">
                                    <p>${post.view_count}</p>
                                </div>
                                <div class="flex gap-4 justify-center items-center">
                                    <img class="w-8" src="./images/time.png" alt="">
                                    <p>${
                                      post.posted_time
                                    } <span> min </span></p>
                                </div>
                            </div>
                            <div>
                            <button onclick="markRead('${post.title.slice(
                              0,
                              30
                            )}', ${
      post.view_count
    })" class="btn bg-green-500 rounded-xl"><img class="w-6 rounded-full"
                                        src="./images/mark.png" alt=""></button>
                            </div>
                        </div>
                    </div>
                </div>
    `;
    discussBarContainer.appendChild(div);
  });
};
// latest post section
const latestPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  const postContainer = document.getElementById("post-bar");
  data.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class=" border-2 border-gray-100 rounded-lg space-y-4 p-5">
                <img class="w-72 mx-auto" src=${item.cover_image} alt="">
                <div class="flex gap-4 pl-2">
                    <img class="w-8" src="./images/calendar.png" alt="">
                    <p>${
                      item.author.posted_date
                        ? item.author.posted_date
                        : "No publish date"
                    }</p>
                </div>
                <h4 class="font-semibold pl-2">${item.title}</h4>
                <p class="pl-2">${item.description}</p>
                <div class="flex space-x-6 items-center">
                    <img class="w-12 rounded-full" src=${
                      item.profile_image
                    } alt="">
                    <div class="pl-2">
                        <h5 class="font-semibold">${item.author.name}</h5>
                        <p>${
                          item.author.designation
                            ? item.author.designation
                            : "Unknown"
                        }</p>
                    </div>
                </div>
            </div>
    `;
    postContainer.appendChild(div);
  });
};

// mark as read
const markReadAs = document.getElementById("mark-read");
const markRead = async (text, view) => {
  count++;
  document.getElementById("counted").innerText = count;
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="mt-2 bg-gray-100 rounded-2xl p-4">
      <div class="grid grid-cols-3 justify-between">
      ${text} <img class="w-12 ml-20" src="./images/eye.png" alt=""> ${view}
      </div>
  </div>
  `;
  markReadAs.appendChild(div);
};

//check bg color
const checkIconColor = (items) => {
  const checkIcon = document.getElementById("isActive");
  if (items.isActive) {
    checkIcon.style.backgroundColor = "green";
  } else {
    checkIcon.style.backgroundColor = "red";
  }
};

// search section
document.getElementById("search-btn").addEventListener("click", function () {
  const searchValue = document.getElementById("search-box").value;
  loadAllPost(searchValue);
});

// document.getElementById("loading-spinner").classList.remove("hidden");
// setTimeout(() => {
//   document.getElementById("loading-spinner").classList.add("hidden");
// }, 2000);

loadAllPost("");
latestPost();
