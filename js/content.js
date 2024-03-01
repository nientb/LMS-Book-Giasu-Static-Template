//
const contentEl = document.getElementById("content");
const navLinkEl = document.getElementById("nav-link");
const contentMentorEl = document.getElementById("content-mentor");
// const popupEl = document.getElementById("popup");


const courses = window.courses;
console.log(mentors);
// const mentors = window.mentors;
let limitCourse = 8;
let limitMentor = 3;
let mode;

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
      listContent += `<li class="flex justify-between even:bg-gray-100 py-2 px-4"><div>${course.name}</div><button class="bg-primary py-1 px-8 rounded-md text-white">Đăng ký</button></li>`;
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
  mode = 'COURSE';
  coursePopup();
}

function onSelectMentor(e) {
  e.preventDefault();
  mode = 'MENTOR';
  mentorPopup();
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

// CREATE POPUP
if (courses.length && mentors.length) {
  let page = 1;
  // // CREATE POPUP WITH COURSE LIST
  function coursePopup() {
    const totalPage = Math.ceil(courses.length / limitCourse);
    if (popupEl.classList.contains('hidden')) {
      popupEl.classList.remove('hidden');
    }
    createdPagination(totalPage, page)
  }

  // CREATE POPUP WITH MENTOR LIST
  function mentorPopup () {
    const totalPage = Math.ceil(mentors.length / limitMentor);
    if (popupEl.classList.contains('hidden')) {
      popupEl.classList.remove('hidden');
    }
    createdPagination(totalPage, page)
  }
}

function listCourse(data) {
  let content = '';
  data.forEach(course => {
    content += `
    <li class="flex items-center gap-4">
      <div class="basic-1/5">
        <img class="w-[150px]" src="${course.picture}" alt="${course.name}" />
      </div>
      <div class="basic-3/5">
        <h3 class="text-lg font-semibold">${course.name}</h3>
        <p class="text-sm text-slate-800 w-[150px] text-ellipsis overflow-hidden h-[40px]">${course.description}</p>
      </div>
      <div class="basic-1/5"><button class="bg-primary text-white py-1 px-4 rounded">Chọn</button></div>
    </li>
    `;
  })
  return content;
}

function listMentor(data) {
  let content = '';
  data.forEach(mentor => {
    content += `
    <li class="flex items-center justify-start w-fit gap-5 border border-slate-200 rounded-md">
      <div class="">
        <img class="w-[100px] rounded-md" src="${mentor.picture}" alt="${mentor.name}" />
      </div>
      <div class="">
        <h3 class="text-lg font-semibold">${mentor.name}</h3>
        <p class="text-sm text-slate-800 text-ellipsis overflow-hidden max-h-[40px]">${mentor.workPlace}</p>
        <span class="text-md font-semibold text-[#8D939E]">Mã gia sư: ${mentor.code}</span>
      </div>
      <div class="basic-1/5 pr-4"><button class="bg-primary text-white py-1 px-4 rounded">Chọn</button></div>
    </li>
    `;
  })
  return content;
}

// CREATE PAGINATION
function createdPagination(totalPages, page) {
  console.log(mode);
  window.scrollTo(0, 0);
  let result = []
  if (mode === 'MENTOR') {
    const startPage = (page - 1) * limitMentor;
    const endPage = page * limitMentor;
    const data = mentors.slice(startPage, endPage);
    result.push(...data);
  }
  if (mode === 'COURSE') {
    const startPage = (page - 1) * limitCourse;
    const endPage = page * limitCourse;
    const data = courses.slice(startPage, endPage);
    result.push(...data);
  }
    
  let liTag = "";
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page > 1) {
    liTag += `<li class="btn prev" onclick="createdPagination(${totalPages}, ${page - 1
      })"><span><i class="fas fa-angle-left"></i></span></li>`;
  }
  if (page > 2) {
    liTag += `<li class="first numb" onclick="createdPagination(${totalPages}, 1)"><span>1</span></li>`;
    if (page > 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }
  // how many pages or li show before the current li
  if (page == totalPages) {
    if (beforePage - 1 > 1) {
      beforePage = beforePage - 1;
    }
  } else if (page == totalPages - 1) {
    if (page > 1) {
      beforePage = beforePage;
    }
  }
  // how many pages or li show after the current li
  if (page == 1) {
    if (afterPage + 1 < totalPages) {
      afterPage = afterPage + 1;
    }
  } else if (page == 2) {
    afterPage = afterPage;
  }
  for (var i = beforePage; i <= afterPage; i++) {
    if (i > totalPages) {
      continue;
    }
    if (i == 0) {
      i = i + 1;
    }
    if (page == i) {
      active = "active";
    } else {
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="createdPagination(${totalPages}, ${i})"><span>${i}</span></li>`;
  }
  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createdPagination(${totalPages}, ${totalPages})"><span>${totalPages}</span></li>`;
  }
  if (page < totalPages) {
    liTag += `<li class="btn next" onclick="createdPagination(${totalPages}, ${page + 1
      })"><span><i class="fas fa-angle-right"></i></span></li>`;
  }
  
  // UPDATE POPUP ELEMENT
  if (mode === 'COURSE') {
    console.log(result);

    popupEl.innerHTML = `
      <div class="w-6/12 h-5/6 relative py-10 px-12 mt-[60px] m-auto gap-6 bg-white rounded">
        <div class="absolute right-4 top-2 text-2xl hover:opacity-60 cursor-pointer" onclick="onClose()"><i class="fa-solid fa-xmark"></i></div>
        <div>
          <h2 class="text-2xl font-bold border-l-2 border-solid border-black pl-2">Chọn môn học</h2>
        </div>
        <ul class="grid grid-cols-2 gap-8">
          ${listCourse(result)}
        </ul>
        <div class="pagination mt-8">
          <ul>
            ${liTag}
          </ul>
        </div>
      </div>
    `;
  }
  if (mode === 'MENTOR') {
    popupEl.innerHTML = `
      <div class="relative w-6/12 h-5/6 relative py-10 px-12 mt-[60px] m-auto gap-6 bg-white rounded">
        <div class="absolute right-4 top-2 text-2xl hover:opacity-60 cursor-pointer" onclick="onClose()"><i class="fa-solid fa-xmark"></i></div>
        <div>
          <h2 class="text-2xl font-bold border-l-2 border-solid border-black pl-2">Chọn gia sư</h2>
        </div>
        <ul class="flex flex-col gap-4">
          ${listMentor(result)}
        </ul>
        <div class="pagination mt-8">
          <ul>
            ${liTag}
          </ul>
        </div>
      </div>
    `;
  }
}

function onClose () {
  popupEl.classList.add('hidden');
}

// INITIAL
const init = () => {
  contentNavlink();
  contentRegister();
};
init();
