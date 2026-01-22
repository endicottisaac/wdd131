const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

button.addEventListener("click", function () {
  if (input.value.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = input.value;
    const delButton = document.createElement("button");
    delButton.textContent = "❌";
    delButton.setAttribute("aria-label", `Remove ${input.value}`);
    delButton.classList.add("delete");
    delButton.addEventListener("click", function () {
      list.removeChild(li);
      input.focus();
    });
    li.appendChild(delButton);
    list.appendChild(li);
    input.value = "";
  }
  input.focus();
});
