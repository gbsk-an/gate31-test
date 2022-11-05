let info = {
  fetchInfo: function () {
    fetch("https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7")
      .then((response) => {
        return response.json();
      })
      .then((data) => this.displayData(data))
      .catch(function (err) {
        console.log("Fetch Error", err);
      });
  },
  displayData: function (data) {
    const wrapper = document.querySelector(".wrapper");
    const container = document.createElement("div");
    data.forEach((el) => {
      const block = document.createElement("div");
      const title = document.createElement("h3");
      const body = document.createElement("p");
      const blockCheckbox = document.createElement("div");
      const checkbox = document.createElement("input");

      container.classList.add("container");
      block.classList.add("block");
      title.classList.add("block-title");
      body.classList.add("block-text");
      blockCheckbox.classList.add("block-checkbox");
      checkbox.setAttribute("type", "checkbox");
      checkbox.classList.add("block-checkbox_style");
      title.innerText = el.title;
      body.innerText = el.body;

      wrapper.appendChild(container);
      container.appendChild(block);
      block.appendChild(title);
      block.appendChild(body);
      block.appendChild(blockCheckbox);
      blockCheckbox.appendChild(checkbox);

      checkbox.addEventListener("change", function () {
        if (this.checked) {
          block.classList.add("block-check");
          title.classList.add('block-title_check');
          body.classList.add('block-text_check');
        } else {
          block.classList.remove("block-check");
          title.classList.remove("block-title_check");
          body.classList.remove("block-text_check");
        }
      });
    });
  },
};
const searchField = document.querySelector(".search-field");
searchField.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTitle = event.target.querySelector(".search-field_title").value;
  history.pushState(null,null, `?search=${searchTitle}`)
  searchBlocks(searchTitle);
});

function searchBlocks(searchTitle) {
  const wrapper = document.querySelector(".wrapper");
  let arr = wrapper.querySelectorAll(".block");
  if (searchTitle.length == 0) {
    alert("You have to write something!");
  };
  arr.forEach((el) => {
    el.style.display = "block";
    let value = el.querySelector(".block-title").innerHTML;
    if (!value.includes(searchTitle)) {
      el.style.display = "none";
    }
  });
}

info.fetchInfo();
