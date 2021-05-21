const submitForm = (e) => {
  const getInputValue = (id) => document.getElementById(id).value;
  const userName = getInputValue("name");
  const userEmail = getInputValue("email");

  const user = { userName, userEmail };
  let users = [];
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }
  const uniqueUserCheck = users.find((user) => user.userEmail === userEmail);
  if (!!uniqueUserCheck) {
    alert("Duplicate Entry");
  } else {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert('Success');
  }

  fetchList();
  e.preventDefault();
};
document.getElementById("form").addEventListener("submit", submitForm);

const deleteUser = (email) => {
  let users = JSON.parse(localStorage.getItem("users"));
  const remainingUsers = users.filter((user) => user.userEmail !== email);
  localStorage.setItem("users", JSON.stringify(remainingUsers));
  fetchList();
};
const fetchList = () => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userList = document.getElementById("table__body");
  userList.innerHTML = "";

  if (users !== null) {
    for (let i = 0; i < users.length; i++) {
      const { userName, userEmail } = users[i];

      userList.innerHTML += `<tr>
      <td>${userName}</td>
      <td>${userEmail}</td>
      <td><a href="#" onclick="deleteUser('${userEmail}')" class="btn btn-warning">Delete</a></td>
      </tr>`;
    }
  }
};
