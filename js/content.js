//
const contentEl = document.getElementById("content");
const navLinkEl = document.getElementById("nav-link");
const contentMentorEl = document.getElementById("content-mentor");
// const popupEl = document.getElementById("popup");

let filterCoursesList = window.filterCoursesList;
let courses = window.courses;
let schedules = window.schedules;
let newCourses = [...courses];
let newMentor = [...mentors];

let limitCourse = 6;
let limitMentor = 3;
if (window.innerWidth < 768) {
  limitMentor = 4;
  limitCourse = 4;
}
let mode;
let valueCourse = '';
let valueMentor = '';
let valueInputStartDate = '';
let valueInputEndDate = '';

// VALUE SEARCH FORM
let chooseCourse = 'Chọn môn học';
let chooseMentor;
let startDate;
let endDate;
let bookTime;
let messageINput = '';

///////////////////////////////// CREATE NAVBAR LINK ///////////////////////////////////////////////
const contentNavlink = () => {
  const navLinks = ["Đăng ký môn học", "Đặt lịch", "Lịch học"];
  navLinkEl.innerHTML = "";
  let content = "";
  navLinks.forEach((nav, index) => {
    content += `<div onclick="onClick(event, ${index})" class="text-md md:text-xl text-[#535A65] font-semibold cursor-pointer ${
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
        contentMentorEl.classList.add("md:block");
      }
      if (contentEl.classList.contains("w-full")) {
        contentEl.classList.add("md:w-3/5");
        contentMentorEl.classList.add("w-2/5");
      }
      contentRegister();
      break;
    case 1:
      contentMentorEl.classList.remove("md:block");
      contentMentorEl.classList.add("hidden");
      contentEl.classList.remove("md:w-3/5");
      contentEl.classList.add("w-full");
      bookLearn();
      break;
    case 2:
      contentMentorEl.classList.remove("md:block");
      contentMentorEl.classList.add("hidden");
      contentEl.classList.remove("md:w-3/5");
      contentEl.classList.add("w-full");
      scheduleLearn();
      break;
    default:
      if (contentMentorEl.classList.contains("hidden")) {
        contentMentorEl.classList.add("md:block");
      }
      if (contentEl.classList.contains("w-full")) {
        contentMentorEl.classList.add("w-2/5");
      }
      contentRegister();
      break;
  }
}

////////////////////////////////// CREATE REGISTER COURSE /////////////////////////////////////////
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

//////////////////////// CREATE BOOK CALENDER ///////////////////////////////////
const renderCourses = (courses) => {
  return courses.map(course => {
    return `<div class="text-sm md:text-base option" onclick='onSelectCourse(event, ${JSON.stringify(course.name)})'>${course.name}</div>`;
  }).join('');
};

const renderMentor = (mentors) => {
  return mentors.map(mentor => {
    return `<div class="cursor-pointer mb-4">
    <div class="relative flex justify-center">
      <img src="${mentor.picture}" alt="teacher" class="w-full">
      <div onclick='onSelectMentor(event, ${JSON.stringify(mentor)})' class="absolute bottom-0 text-center px-10 py-1 text-white rounded-xl z-10 bg-slate-200 text-gray-500 hover:bg-primary hover:text-white">Chọn</div>
    </div>
    <div class="relative bg-white rounded px-2 pt-2 pb-2 text-center shadow-xl book-mentor info-after">
      <div class="font-medium text-sm md:text-base">${mentor.name}</div>
      <span class="text-lg font-semibold">-${mentor.code}-</span>
    </div>
  </div>`
  }).join('')
};

const mentorSelected = () => {
  if(!chooseMentor) return `<div></div>`;
  return `<div class="cursor-pointer mb-4">
    <div class="relative flex justify-center">
      <img src="${chooseMentor.picture}" alt="teacher" class="w-full">
      <div onclick='onSelectMentorAgain(event)' class="absolute bottom-0 text-center px-8 py-1 text-white rounded-xl z-10 bg-primary text-white hover:shadow">Chọn lại</div>
    </div>
    <div class="relative bg-white rounded px-2 pt-2 pb-2 text-center shadow-xl book-mentor info-after">
      <div class="font-medium text-sm md:text-base">${chooseMentor.name}</div>
      <span class="text-lg font-semibold">-${chooseMentor.code}-</span>
    </div>
  </div>`;
};

let isMobile = false; //change selected mentor when at mobile surface

const renderBooked = () => {
  const currDate = new Date();
  const date = currDate.getDate();
  const month = currDate.getMonth() + 1;
  const year = currDate.getFullYear();
  return schedules.map(i => {
    return `<div class="flex justify-around items-center text-center even:bg-gray-100">
      <div class="text-sm md:text-base py-2">${date >= 10 ? date : '0' + date}/${month >= 10 ? month : '0' + month}/${year}</div>
      <div class="text-sm md:text-base py-2">${i.hours}</div>
      <div onclick='onCheckedDate(event, ${JSON.stringify(i)})' class="cursor-pointer select-date">
        <svg width="15" height="15" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.56074 17.8922C14.221 17.8922 17.9989 14.1143 17.9989 9.45405C17.9989 4.7938 14.221 1.01591 9.56074 1.01591C4.90049 1.01591 1.1226 4.7938 1.1226 9.45405C1.1226 14.1143 4.90049 17.8922 9.56074 17.8922ZM9.56074 18.8849C14.7693 18.8849 18.9916 14.6626 18.9916 9.45405C18.9916 4.24553 14.7693 0.0231934 9.56074 0.0231934C4.35222 0.0231934 0.129883 4.24553 0.129883 9.45405C0.129883 14.6626 4.35222 18.8849 9.56074 18.8849Z" fill="black"/>
        </svg>
      </div>
    </div>`
  }).join('')
}
    

const bookLearn = () => {
  contentEl.innerHTML = "";
  contentEl.innerHTML = `
    <div class="w-full p-0 md:p-6 rounded-lg bg-white">
      <form class="flex flex-col justify-start md:justify-center items-center gap-2 md:gap-4" onsubmit='onSubmitBook(event)' id="formId">
        <div class="w-full">
          <div class="flex items-center justify-start md:justify-center gap-5">
            <div class="text-base font-semibold">Đặt lịch môn</div>
            <div class="w-[220px] md:min-w-[250px] form-selects">
              <div class="form-select border-2 rounded-lg">
                <span class="w-[100px] md:w-[115px] grow-0 shrink-0 basis-auto whitespace-nowrap font-semibold text-sm md:text-base">${chooseCourse}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M9 1L5 5L1 1" stroke="#979797" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="form-options">
                ${renderCourses(newCourses)}
              </div>
            </div>
          </div>
        </div>
        <div class="italic">Học viên có thể đăng ký học thử, đặt lịch trực tiếp với gia sư theo ý thích. </div>
        <div class="flex flex-col max-w-[500px] md:flex-row justify-start md:justify-between items-start md:items-center gap-2 md:gap-4">
          <label class="w-fit grow-0 shrink-0 basis-auto font-semibold text-base whitespace-nowrap">Chọn ngày</label>
          <div class="flex items-center gap-1">
            <span class="text-xs md:text-sm">Từ</span>
            <div class="flex items-center w-auto p-1 md:p-2 rounded-md border bg-white mr-1 grow-1 shrink-1 basis-auto">
              <input class="width-input-register-date outline-none text-sm md:text-base" value="${valueInputStartDate}" onfocus="onSelectedDateStart(event)" type="text">
              <i class="hidden md:block fa-regular fa-calendar"></i>
            </div>
            <span class="text-xs md:text-sm whitespace-nowrap">Đến ngày</span>
            <div class="flex items-center w-auto  p-2 rounded-md border bg-white grow-1 shrink-1 basis-auto">
              <input class="width-input-register-date text-sm md:text-base outline-none" value="${valueInputEndDate}" onfocus="onSelectedDateEnd(event)" type="text">
              <i class="hidden md:block fa-regular fa-calendar"></i>
            </div>
          </div>
        </div>

        <div class="w-full flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 mt-2 md:mt-5" id="show-book-course">
          <div class="w-full max-h-[500px] md:max-h-[900px] bg-white md:bg-slate-50 rounded-lg p-0 md:p-7 overflow-y-auto overflow-x-hidden scrollbar-custom">
            <div class="text-lg md:text-xl font-semibold mb-1 md:mb-2">Chọn gia sư</div>
            <div class="${isMobile ? 'flex justify-center' : 'grid grid-cols-2'} mb-4">
              ${mentorSelected()}
              <div></div>
            </div>
            <div class="grid grid-cols-2 gap-4 bg-slate-50">
              ${renderMentor(newMentor)}
            </div>
          </div>
          <div class="w-full max-h-[500px] md:max-h-[900px] rounded-lg p-0 md:p-7 bg-white md:bg-slate-50 overflow-y-auto overflow-x-hidden scrollbar-custom">
            <div class="text-lg md:text-xl font-semibold mb-2">Chọn thời gian phù hợp với bạn</div>
            <div class="w-full flex flex-col border">
              <div class="flex justify-between bg-primary text-white rounded-t-lg">
                <div class="text-sm md:text-base py-2 ml-[65px]">Ngày</div>
                <div class="text-sm md:text-base py-2">Thời gian</div>
                <div class="text-sm md:text-base py-2 mr-[30px]">Select</div>
              </div>
              ${renderBooked()}
            </div>
          </div>
        </div>
        <div class="w-full">
          <div class="text-base font-semibold mt-3 md:mt-6 mb-2">Gửi gám của phụ huynh</div>
          <div>
            <textarea onchange='onInputMessage(event)' class="w-full py-1 md:py-2 px-2 md:px-4 rounded-md border text-sm md:text-base outline-none" rows="5" placeholder="Nếu có lời nhắn nhủ muốn gửi đến gia sư, phụ huynh hãy nhập tại đây" name="note"></textarea>
          </div>
        
        </div>
        <div class="py-4 w-full text-right md:text-center">
          <button type="submit" class="text-sm md:text-base text-white bg-primary py-2 px-10 rounded-md hover:opacity-70">Đặt lịch</button>
        </div>
      </form>
    </div>
  `;
};

// CHOOSE DATE
let minDate;
function onSelectedDateStart(e) {
  flatpickr(e.target, {
    dateFormat: 'd-m-Y',
    altInput: true,
    altFormat: "d/m/Y",
    minDate: "today",
    onChange: function (selectedDates, dateStr, instance) {
      console.log(dateStr, instance, selectedDates);
      valueInputStartDate = dateStr;
      startDate = selectedDates;
      minDate = dateStr;
    },
  }).open();
}

function onSelectedDateEnd(e) {
  flatpickr(e.target, {
    dateFormat: 'd-m-Y',
    altInput: true,
    altFormat: "d/m/Y",
    minDate: minDate,
    onChange: function (selectedDates, dateStr, instance) {
      valueInputEndDate = dateStr;
      endDate = selectedDates;
    },
  }).open();
}

// SELECTED VALUE
function onSelectCourse(e, name) {
  e.preventDefault();
  chooseCourse = name;
  bookLearn();
}

function onSelectMentor(e, mentor) {
  e.preventDefault();
  chooseMentor = mentor;
  document.getElementById('formId').scrollIntoView({behavior: 'smooth'});
  
  if (window.innerWidth < 768) {
    newMentor = [];
    isMobile = true;
  }
  bookLearn();
}

function onSelectMentorAgain (e) {
  e.preventDefault();
  chooseMentor = null;
  if (window.innerWidth < 768) {
    newMentor = mentors;
  }
  bookLearn();
}

function onCheckedDate (e, time) {
  e.preventDefault()
  bookTime = time;
  const selectDateEl = document.querySelectorAll('.select-date');
  selectDateEl.forEach(i => {
    const el = i.closest('.select-date');
    if(el.classList.contains('bg-primary')) {
      el.classList.remove('bg-primary')
    }
  })
  e.target.closest('.select-date').classList.add('bg-primary', 'rounded-full');
}

function onInputMessage (e) {
  messageINput = e.target.value;
}

////////////////////// CREATE SCHEDULE ////////////////////////////
const scheduleLearn = () => {
  contentEl.innerHTML = "";
  contentEl.innerHTML = `
    <div>
      <div>
        <h2 class="text-xl md:text-3xl font-semibold">Buổi học sắp diễn ra</h2>
        <div class="mt-3 md:mt-4 mb-6">
          <div class="italic">Vui lòng truy cập đường link zoom để tham gia buổi học</div>
          <div class="italic">Lưu ý: Để buổi học đạt được hiệu quả, học viên cần chuẩn bị các nội dung sau:</div>
          <div class="italic">- Tham dự đúng giờ</div>
          <div class="italic">- Kiểm tra sẵn sàng: đường truyền internet, camera, mic.</div>
          <div class="italic">Trường hợp không thể tham gia vào thời gian đã đăng ký, bấm nút ‘x’ bên cạnh buổi học để huỷ.</div>
        </div>
        <table class="w-full">
          <div class="h-[10px] rounded-t-md bg-primary"></div>
          <tr class="bg-primary text-white">
            <th class="px-0 md:px-4 pb-2 md:pb-4 pt-1 md:pt-3 text-xs md:text-base">Thời gian</th>
            <th class="px-0 md:px-4 pb-2 md:pb-4 pt-1 md:pt-3 text-xs md:text-base">Gia sư</th>
            <th class="px-0 md:px-4 pb-2 md:pb-4 pt-1 md:pt-3 text-xs md:text-base">Môn học</th>
            <th class="px-0 md:px-4 pb-2 md:pb-4 pt-1 md:pt-3 text-xs md:text-base">Hình thức</th>
            <th class="px-0 md:px-4 pb-2 md:pb-4 pt-1 md:pt-3 text-xs md:text-base">Zoom ID</th>
            <th class="px-0 md:px-4 pb-2 md:pb-4 pt-1 md:pt-3 text-xs md:text-base"></th>
          </tr>
          ${scheduleList()}
        </table>
      </div>
      <div>
        <h2 class="text-xl md:text-3xl font-semibold mt-8 mb-4">Buổi học đã diễn ra/ Đã hủy</h2>
        <table class="w-full">
          <div class="h-[9px] rounded-t-md bg-primary"></div>
          <tr class="bg-primary text-white rounded-t-xl">
            <th class="px-0 md:px-4 pb-2 md:pb-4 pt-1 md:pt-3 text-xs md:text-base">Thời gian</th>
            <th class="px-0 md:px-4 pb-2 md:pb-4 pt-1 md:pt-3 text-xs md:text-base">Gia sư</th>
            <th class="px-0 md:px-4 pb-2 md:pb-4 pt-1 md:pt-3 text-xs md:text-base">Môn học</th>
            <th class="px-0 md:px-4 pb-2 md:pb-4 pt-1 md:pt-3 text-xs md:text-base">Ghi chú</th>
            <th class="px-0 md:px-4 pb-2 md:pb-4 pt-1 md:pt-3 text-xs md:text-base">Trạng thái</th>
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
          <td class="p-0.5 md:p-4 text-xs md:text-base">${schedule.time}</td>
          <td class="p-0.5 md:p-4 text-xs md:text-base">${schedule.mentor}</td>
          <td class="p-0.5 md:p-4 text-xs md:text-base">${schedule.course}</td>
          <td class="p-0.5 md:p-4 text-xs md:text-base">${schedule.mode}</td>
          <td class="p-0.5 md:p-4 text-xs md:text-base">${schedule.zoomId}</td>
          <td class=""><button class="text-[red] p-0.5 md:p-4 text-sm md:text-[20px] hover:opacity-70"><i class="fa-regular fa-circle-xmark"></i></button></td>
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
          <td class="p-0.5 md:p-4 text-xs md:text-base">${schedule.time}</td>
          <td class="p-0.5 md:p-4 text-xs md:text-base">${schedule.mentor}</td>
          <td class="p-0.5 md:p-4 text-xs md:text-base">${schedule.course}</td>
          <td class="p-0.5 md:p-4 text-xs md:text-base">${schedule.mode}</td>
          <td class="p-0.5 md:p-4 text-xs md:text-base">${schedule.zoomId}</td>
        </tr>
      `;
    }
    return listContent;
  }
};
 

// BOOK CALENDAR LEARN
function onSubmitBook(e) {
  e.preventDefault();
  const data = {
    date: {
      start: startDate,
      end: endDate
    },
    mentor: chooseMentor,
    course: chooseCourse,
    timeLearn: bookTime,
    message: messageINput
  }
  console.log(data);

}

///////////////////// UTIL ///////////////////////////
function onClose () {
  popupEl.classList.add('hidden');
}
function removeAccents(str) {
  const updateStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return updateStr;
}

// INITIAL
const init = () => {
  contentNavlink();
  contentRegister();
};
init();
