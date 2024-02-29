//
const contentEl = document.getElementById("content");
const navLinkEl = document.getElementById("nav-link");
const contentMentorEl = document.getElementById("content-mentor");
const popupEl = document.getElementById("popup");

// CREATE NAVBAR LINK
const contentNavlink = () => {
  const navLinks = ["Đăng ký môn học", "Đặt lịch", "Lịch học"];
  navLinkEl.innerHTML = "";
  let content = "";
  navLinks.forEach((nav, index) => {
    content += `<div onclick="onClick(event, ${index})" class="text-xl text-[#535A65] font-semibold cursor-pointer ${
      index === 0 ? "active--link" : ""
    } navbar-link">${nav}</div>`;
  });
  navLinkEl.innerHTML = content;
};

function onClick(e, index) {
  const navbars = document.querySelectorAll(".navbar-link");
  navbars.forEach((nav) => {
    if (nav.classList.contains("active--link")) {
      nav.classList.remove("active--link");
    }
  });
  e.target.classList.add("active--link");
  switch (index) {
    case 0:
      if (contentMentorEl.classList.contains("hidden")) {
        contentMentorEl.classList.remove("hidden");
      }
      if (contentEl.classList.contains("w-full")) {
        contentMentorEl.classList.add("w-2/3");
      }
      contentRegister();
      break;
    case 1:
      if (contentMentorEl.classList.contains("hidden")) {
        contentMentorEl.classList.remove("hidden");
      }
      if (contentEl.classList.contains("w-full")) {
        contentMentorEl.classList.add("w-2/3");
      }
      bookLearn();
      break;
    case 2:
      contentMentorEl.classList.add("hidden");
      contentEl.classList.add("w-full");
      scheduleLearn();
      break;
    default:
      if (contentMentorEl.classList.contains("hidden")) {
        contentMentorEl.classList.remove("hidden");
      }
      if (contentEl.classList.contains("w-full")) {
        contentMentorEl.classList.add("w-2/3");
      }
      contentRegister();
      break;
  }
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

// BOOK CALENDER
const bookLearn = () => {
  contentEl.innerHTML = "";
  contentEl.innerHTML = `
    <div class="w-5/6 p-6 rounded-lg bg-[#FAFAFA]">
      <form class="flex flex-col gap-4">
        <div class="italic">Học viên có thể đăng ký học thử, đặt lịch trực tiếp với gia sư theo ý thích. </div>
        <div class="flex justify-between items-center">
          <label class="font-semibold flex-auto">Chọn môn học <span class="text-[red]">*</span></label>
          <div class="bg-white py-2 px-4 rounded-md flex" onclick='onSelectCourse(event)'>
            <input class="w-[300px] bg-white" disabled  type="text" name="course" placeholder="Danh sách môn học" />
            <button class="bg-primary py-1 px-2 rounded text-white hover:opacity-70">Chọn</button>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <label class="font-semibold">Chọn ngày</label>
          <input type="text" name="course" placeholder="Danh sách môn học" />
        </div>
        <div class="flex justify-between items-center">
          <label class="font-semibold flex-auto">Chọn gia sư</label>
          <div class="bg-white py-2 px-4 rounded-md flex" onclick='onSelectMentor(event)'>
            <input class="w-[300px] disabled bg-white" disabled type="text" name="mentor" placeholder="Chọn gia sư" />
            <button class="bg-primary py-1 px-2 rounded text-white hover:opacity-70">Chọn</button>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div><span class="text-[red]">*</span> Phần không được bỏ trống</div>
          <div><button class="text-white bg-primary py-2 px-12 hover:opacity-80 rounded-md">Tìm kiếm</button></div>
        </div>
      </form>
    </div>
  `;
};

function onSelectCourse(e) {
  e.preventDefault();
  console.log('course');
}

function onSelectMentor(e) {
  e.preventDefault();
  console.log('mentor');
}


// SCHEDULE
const scheduleLearn = () => {
  const schedules = window.schedules;
  contentEl.innerHTML = "";
  contentEl.innerHTML = `
    <div>
      <div>
        <h2 class="text-3xl">Buổi học sắp diễn ra</h2>
        <div class="mt-4 mb-6">
          <div class="italic">Vui lòng truy cập đường link zoom để tham gia buổi học</div>
          <div class="italic">Lưu ý: Để buổi học đạt được hiệu quả, học viên cần chuẩn bị các nội dung sau:</div>
          <div class="italic">- Tham dự đúng giờ</div>
          <div class="italic">- Kiểm tra sẵn sàng: đường truyền internet, camera, mic.</div>
          <div class="italic">Trường hợp không thể tham gia vào thời gian đã đăng ký, bấm nút ‘x’ bên cạnh buổi học để huỷ.</div>
        </div>
        <table class="w-full">
          <div class="h-[10px] rounded-t-md bg-primary"></div>
          <tr class="bg-primary text-white rounded-t-xl">
            <th class="px-4 pb-4 pt-3">Thời gian</th>
            <th class="px-4 pb-4 pt-3">Gia sư</th>
            <th class="px-4 pb-4 pt-3">Môn học</th>
            <th class="px-4 pb-4 pt-3">Hình thức</th>
            <th class="px-4 pb-4 pt-3">Zoom ID</th>
            <th class="px-4 pb-4 pt-3"></th>
          </tr>
          ${scheduleList()}
        </table>
      </div>
      <div>
        <h2 class="text-3xl mt-8 mb-4">Buổi học đã diễn ra/ Đã hủy</h2>
        <table class="w-full">
          <div class="h-[10px] rounded-t-md bg-primary"></div>
          <tr class="bg-primary text-white rounded-t-xl">
            <th class="px-4 pb-4 pt-3">Thời gian</th>
            <th class="px-4 pb-4 pt-3">Gia sư</th>
            <th class="px-4 pb-4 pt-3">Môn học</th>
            <th class="px-4 pb-4 pt-3">Ghi chú</th>
            <th class="px-4 pb-4 pt-3">Trạng thái</th>
          </tr>
          ${scheduleCancel()}
        </table>
      </div>
    </div>
  `;

  function scheduleList() {
    let listContent = "";
    for (const schedule of schedules) {
      listContent += `
        <tr class="even:bg-gray-100 text-center">
          <td class="p-4">${schedule.time}</td>
          <td class="p-4">${schedule.mentor}</td>
          <td class="p-4">${schedule.course}</td>
          <td class="p-4">${schedule.mode}</td>
          <td class="p-4">${schedule.zoomId}</td>
          <td class="p-4"><button class="text-[red] text-[20px] hover:opacity-70"><i class="fa-regular fa-circle-xmark"></i></button></td>
        </tr>
      `;
    }
    return listContent;
  }

  function scheduleCancel() {
    let listContent = "";
    for (const schedule of schedules) {
      listContent += `
        <tr class="even:bg-gray-100 text-center">
          <td class="p-4">${schedule.time}</td>
          <td class="p-4">${schedule.mentor}</td>
          <td class="p-4">${schedule.course}</td>
          <td class="p-4">${schedule.mode}</td>
          <td class="p-4">${schedule.zoomId}</td>
        </tr>
      `;
    }
    return listContent;
  }
};

// POPUP
function coursePopup() {
  popupEl.innerHTML = '';
  popupEl.innerHTML`
    <div>
      <div>
        <h2 class="text-xl font-bold">Chọn môn học</h2>
        <div>
          
        </div>
      </div>
    </div>
  `
}

// INITIAL
const init = () => {
  contentNavlink();
  contentRegister();
};
init();
