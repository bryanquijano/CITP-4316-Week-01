// DRY version: Don't Repeat Yourself

const todos = [];

// building an array with this function
// Going to return an array
const get = (elements) =>
  elements.map((element) => document.getElementById(element));

// Sending every element of the array and assignming them to each variable given
const [pendingList, completedList, addForm, newTodo] = get([
  "pendingList",
  "completedList",
  "addForm",
  "newTodo",
]);

const newList = [
  {
    element: pendingList,
    status: "pending",
  },
  {
    element: completedList,
    status: "done",
  },
];

const cssClasses = {
  pending:
    "bg-white w-full text-center text-red-400 rounded text-xl py-4 transition transform ease-in-out duration-300 hover:bg-red-500 hover:text-white hover:scale-110 hover:rotate-1 cursor-pointer",
  done: "bg-white w-full text-center text-green-400 rounded text-xl py-4 transition transform ease-in-out duration-300 hover:bg-green-500 hover:text-white hover:scale-110 hover:-rotate-1 cursor-pointer",
};

const updateTodos = () => {
  // For every element in the newList, we are targetting that particular list
  newList.forEach((list) => {
    const filteredTodos = todos.filter((todo) => todo.status === list.status);

    list.element.innerHTML = "";
    // Mapping every element inside of the array
    filteredTodos.forEach((todo) => {
      // Creating a list (li) item
      const item = document.createElement("li");
      item.className = cssClasses[list.status];
      // Inside that li item, we are adding the "text" field from the array
      item.innerText = todo.text;
      item.id = todo.id;
      // We are attatching the item to the list
      list.element.appendChild(item);
    });
  });
};

// JS is looking for when something happens on addForm. In this case, when it's submit since it's a form
addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  todos.push({
    id: Math.floor(Math.random() * 100000).toString(),
    text: newTodo.value,
    status: "pending",
  });
  newTodo.value = "";
  updateTodos();
});

pendingList.addEventListener("click", (event) => {
  todos.find((todo) => todo.id === event.target.id).status = "done";
  updateTodos();
});

// Same as above but this time to move completed items to pending items
completedList.addEventListener("click", (event) => {
  todos.find((todo) => todo.id === event.target.id).status = "pending";
  updateTodos();
});
