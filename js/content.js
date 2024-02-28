//
const contentEl = document.getElementById("content");
const navLinkEl = document.getElementById("nav-link");

const contentNavlink = () => {
  const navLinks = ["Đăng ký môn học", "Đặt lịch", "Lịch học"];
  navLinkEl.innerHTML = "";
  let content = "";
  navLinks.forEach((nav, index) => {
    content += `<div onclick="onClick(event)" class="text-xl text-[#535A65] font-semibold cursor-pointer ${
      index === 0 ? "active--link" : ""
    } navbar-link">${nav}</div>`;
  });
  navLinkEl.innerHTML = content;
};

function onClick(e) {
  const navbars = document.querySelectorAll(".navbar-link");
  navbars.forEach((nav) => {
    if (nav.classList.contains("active--link")) {
      nav.classList.remove("active--link");
    }
  });
  e.target.classList.add("active--link");
}

// Register course
const contentRegister = () => {
  const courses = window.courses;
  function renderRegister() {
    contentEl.innerHTML = "";
    contentEl.innerHTML = `
      <div>
        <h2 class="text-2xl font-semibold">Danh sách môn học</h2>
        <span class="italic">Để đặt lịch học mà bạn muốn học thử, vui lòng nhấn nút “Đăng ký” bên cạnh tên môn học. Những môn học đã được đăng ký sẽ hiển thị trong phần chọn môn học tại màn “Đặt lịch”</span>
        <div class="rounded-md mt-8">
          <div class="font-semibold text-lg bg-gray-100 py-2 px-4 rounded-t-2xl">Khoá học gia sư</div>
          <ul>${listCourse()}</ul>
          <div class="bg-gray-100 p-2 rounded-b-2xl"></div>
        </div>
      </div>
    `;
  }

  function listCourse() {
    let listContent = "";
    for (const course of courses) {
      listContent += `<li class="flex justify-between even:bg-gray-100 py-2 px-4"><div>${course}</div><button class="bg-primary py-1 px-8 rounded-md text-white">Đăng ký</button></li>`;
    }
    return listContent;
  }

  if (courses.length) {
    renderRegister();
  }
};

const init = () => {
  contentNavlink();
  contentRegister();
};
init();
