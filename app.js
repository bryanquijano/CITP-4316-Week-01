const todos = [];

const pendingClasses =
  "bg-white w-full text-center text-red-400 rounded text-xl py-4 transition transform ease-in-out duration-300 hover:bg-red-500 hover:text-white hover:scale-110 hover:rotate-1 cursor-pointer";
const completedClasses =
  "bg-white w-full text-center text-green-400 rounded text-xl py-4 transition transform ease-in-out duration-300 hover:bg-green-500 hover:text-white hover:scale-110 hover:-rotate-1 cursor-pointer";

const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

const showTodos = () => {
  const pendingTodos = todos.filter((todo) => todo.status === "pending");
  pendingList.innerHTML = "";
  // Mapping every element inside of the array
  pendingTodos.forEach((todo) => {
    // Creating a list (li) item
    const pendingItem = document.createElement("li");
    pendingItem.className = pendingClasses;
    // Inside that li item, we are adding the "text" field from the array
    pendingItem.innerText = todo.text;
    pendingItem.id = todo.id;
    // We are attatching the item to the list
    pendingList.appendChild(pendingItem);
  });

  const completedTodos = todos.filter((todo) => todo.status === "done");
  completedList.innerHTML = "";

  completedTodos.forEach((todo) => {
    const completedItem = document.createElement("li");
    completedItem.className = completedClasses;
    completedItem.innerText = todo.text;
    completedItem.id = todo.id;

    completedList.appendChild(completedItem);
  });
};

const addForm = document.getElementById("addForm");
const newTodo = document.getElementById("newTodo");
// JS is looking for when something happens on addForm. In this case, when it's submit since it's a form
addForm.addEventListener("submit", (event) => {
  // Prevents browser from refreshing when form is submit
  event.preventDefault();
  // Add the new item to the array when the form is submit
  todos.push({
    // Function will create random numbers for the ids
    id: Math.floor(Math.random() * 100000).toString(),
    text: newTodo.value,
    status: "pending",
  });
  // Clear the text in the input box after the form is submit
  newTodo.value = "";
  showTodos();
});

pendingList.addEventListener("click", (event) => {
  /* When one of the items under pending is clicked 
       find the item in the array by it's id and changed
       it's status from pending to done
    */
  todos.find((todo) => todo.id === event.target.id).status = "done";
  // This will rerender the DOM to show the pending item clicked under completed items
  showTodos();
});

// Same as above but this time to move completed items to pending items
completedList.addEventListener("click", (event) => {
  todos.find((todo) => todo.id === event.target.id).status = "pending";
  showTodos();
});
