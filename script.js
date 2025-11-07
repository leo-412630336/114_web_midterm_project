// 取得 DOM 元素的參考
// 登入表單
const loginForm = document.getElementById("loginForm");
// 註冊表單
const registerForm = document.getElementById("registerForm");
// 顯示註冊表單的按鈕
const showRegister = document.getElementById("showRegister");
// 顯示登入表單的按鈕
const showLogin = document.getElementById("showLogin");
// 訊息顯示區域
const msgBox = document.getElementById("msgBox");
// 切換到註冊表單的事件處理
if (showRegister) {
  showRegister.addEventListener("click", (e) => {
    e.preventDefault();  // 防止表單預設提交行為
    loginForm.classList.add("d-none");  // 隱藏登入表單
    registerForm.classList.remove("d-none");  // 顯示註冊表單
    msgBox.textContent = "";  // 清空訊息框
  });
}

// 切換到登入表單的事件處理
if (showLogin) {
  showLogin.addEventListener("click", (e) => {
    e.preventDefault();  // 防止表單預設提交行為
    registerForm.classList.add("d-none");  // 隱藏註冊表單
    loginForm.classList.remove("d-none");  // 顯示登入表單
    msgBox.textContent = "";  // 清空訊息框
  });
}
// 處理註冊表單提交事件
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();  // 防止表單預設提交行為

    // 獲取表單輸入值
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("regConfirm").value;

    // 驗證密碼是否一致
    if (password !== confirm) {
      msgBox.textContent = "密碼不一致";
      return;
    }

    // 從 localStorage 獲取現有使用者資料，如果沒有則建立空物件
    let users = JSON.parse(localStorage.getItem("users")) || {};

    // 檢查使用者是否已存在
    if (users[username]) {
      msgBox.textContent = "帳號已存在";
      return;
    }

    // 建立新使用者資料
    users[username] = {
      password: password,
      records: []  // 初始化空的記錄陣列
    };

    // 儲存更新後的使用者資料
    localStorage.setItem("users", JSON.stringify(users));
    msgBox.textContent = "註冊成功";

    // 重置表單並切換回登入頁面
    registerForm.reset();
    registerForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
  });
}
// 處理登入表單提交事件
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();  // 防止表單預設提交行為

    // 獲取表單輸入值
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    // 從 localStorage 獲取使用者資料
    let users = JSON.parse(localStorage.getItem("users")) || {};

    // 驗證帳號是否存在
    if (!users[username]) {
      msgBox.textContent = "無此帳號";
      return;
    }

    // 驗證密碼是否正確
    if (users[username].password !== password) {
      msgBox.textContent = "密碼錯誤";
      return;
    }

    // 登入成功：儲存當前使用者並轉導至儀表板頁面
    localStorage.setItem("currentUser", username);
    window.location.href = "dashboard.html"; 
  });
}
