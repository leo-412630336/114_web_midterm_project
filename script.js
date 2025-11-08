/* --- DOM 元素選取 --- */
// 獲取登入表單
const loginForm = document.getElementById("loginForm");
// 獲取註冊表單
const registerForm = document.getElementById("registerForm");
// 獲取「顯示註冊」的連結
const showRegister = document.getElementById("showRegister");
// 獲取「顯示登入」的連結
const showLogin = document.getElementById("showLogin");
// 獲取顯示錯誤/成功訊息的區塊
const msgBox = document.getElementById("msgBox");

/* --- 事件監聽：點擊「顯示註冊」連結 --- */
// 檢查元素是否存在
if (showRegister) {
  // 綁定點擊事件
  showRegister.addEventListener("click", (e) => {
    e.preventDefault(); // 防止連結跳轉
    loginForm.classList.add("d-none"); // 隱藏登入表單
    registerForm.classList.remove("d-none"); // 顯示註冊表單
    msgBox.textContent = ""; // 清空訊息
  });
}

/* --- 事件監聽：點擊「顯示登入」連結 --- */
if (showLogin) {
  showLogin.addEventListener("click", (e) => {
    e.preventDefault(); // 防止連結跳轉
    registerForm.classList.add("d-none"); // 隱藏註冊表單
    loginForm.classList.remove("d-none"); // 顯示登入表單
    msgBox.textContent = ""; // 清空訊息
  });
}

/* --- 事件監聽：註冊表單提交 --- */
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // 防止表單預設提交

    // 獲取表單輸入值
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("regConfirm").value;

    // 檢查兩次密碼是否一致
    if (password !== confirm) {
      msgBox.textContent = "密碼不一致";
      return;
    }

    // 從 localStorage 獲取所有使用者資料，如果沒有則建立一個空物件
    let users = JSON.parse(localStorage.getItem("users")) || {};

    // 檢查帳號是否已存在
    if (users[username]) {
      msgBox.textContent = "帳號已存在";
      return;
    }

    // 建立新使用者物件，並包含一個空的 records 陣列
    users[username] = {
      password: password,
      records: []
    };

    // 將更新後的使用者物件存回 localStorage
    localStorage.setItem("users", JSON.stringify(users));
    msgBox.textContent = "註冊成功";

    // 重設表單並切換回登入畫面
    registerForm.reset();
    registerForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
  });
}

/* --- 事件監聽：登入表單提交 --- */
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // 防止表單預設提交

    // 獲取表單輸入值
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    // 從 localStorage 獲取使用者資料
    let users = JSON.parse(localStorage.getItem("users")) || {};

    // 檢查帳號是否存在
    if (!users[username]) {
      msgBox.textContent = "無此帳號";
      return;
    }

    // 檢查密碼是否正確
    if (users[username].password !== password) {
      msgBox.textContent = "密碼錯誤";
      return;
    }

    // 登入成功，將目前使用者名稱存入 localStorage
    localStorage.setItem("currentUser", username);
    // 跳轉到儀表板頁面
    window.location.href = "dashboard.html";
  });
}