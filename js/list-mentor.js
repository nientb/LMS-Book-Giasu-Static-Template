// LIST MENTOR
const listMentorEl = document.getElementById("list-mentor");
const paginationEl = document.getElementById("pagination");
let popupEl = document.getElementById("popup");

let mentors = window.mentors;
if (mentors.length) {
  // PAGINATION
  const currPage = 1;
  const limit = 6;
  const totalPage = Math.ceil(mentors.length / limit);

  paginationEl.innerHTML = createPagination(totalPage, currPage);

  function createPagination(totalPages, page) {
    window.scrollTo(0, 0);
    const startPage = (page - 1) * limit;
    const endPage = page * limit;
    const result = mentors.slice(startPage, endPage);
    renderListMentor(result);
    let liTag = "";
    let active;
    let beforePage = page - 1;
    let afterPage = page + 1;
    if (page > 1) {
      liTag += `<li class="btn prev" onclick="createPagination(${totalPages}, ${
        page - 1
      })"><span><i class="fas fa-angle-left"></i></span></li>`;
    }
    if (page > 2) {
      liTag += `<li class="first numb" onclick="createPagination(${totalPages}, 1)"><span>1</span></li>`;
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
      liTag += `<li class="numb ${active}" onclick="createPagination(${totalPages}, ${i})"><span>${i}</span></li>`;
    }
    if (page < totalPages - 1) {
      if (page < totalPages - 2) {
        liTag += `<li class="dots"><span>...</span></li>`;
      }
      liTag += `<li class="last numb" onclick="createPagination(${totalPages}, ${totalPages})"><span>${totalPages}</span></li>`;
    }
    if (page < totalPages) {
      liTag += `<li class="btn next" onclick="createPagination(${totalPages}, ${
        page + 1
      })"><span><i class="fas fa-angle-right"></i></span></li>`;
    }
    paginationEl.innerHTML = liTag;
    return liTag;
  }

  // RENDER LIST MENTOR
  function renderListMentor(data) {
    listMentorEl.innerHTML = "";
    for (let mentor of data) {
      const li = document.createElement("li");
      li.innerHTML = `
      <div onclick='onDetailMentor(${JSON.stringify(mentor)})' class="cursor-pointer">
        <div class="relative flex justify-center">
          <img src="${mentor.picture}" alt="teacher">
          <div class="absolute bottom-0 text-center px-4 py-1 text-white rounded-xl z-10" style="background-image: linear-gradient(${
            mentor.color[0]
          }, ${mentor.color[1]});">${mentor.course}</div>
        </div>
        <div class="relative rounded px-2 pt-2 pb-2 text-center shadow-xl info-before info-after">
          <div class="font-medium text-sm">${mentor.name}</div>
          <div class="text-xs text-slate-400 my-1">${mentor.workPlace}</div>
          <span class="text-lg font-semibold">-${mentor.code}-</span>
          <div class="text-sm">${mentor.degree}</div>
        </div>
      </div>
      `;
      listMentorEl.appendChild(li);
    }
  }
}

// SHOW DETAIL MENTOR POPUP
function onDetailMentor(mentor) {
  if (popupEl.classList.contains('hidden')) {
    popupEl.classList.remove('hidden');
  }
  popupEl.innerHTML = '';
  popupEl.innerHTML = `
    <div>
      <div class="w-full md:w-8/12 xl:w-7/12 h-screen md:h-4/6 relative py-10 px-12 mt-0 md:mt-[60px] m-auto flex flex-col md:flex-row gap-6 bg-white rounded">
        <div class="absolute right-4 top-2 text-2xl hover:opacity-60 cursor-pointer" onclick="onClose()"><i class="fa-regular fa-circle-xmark"></i></div>  
        <div class="flex-1"><img class="w-[300px]" src="${mentor.picture}" alt="${mentor.name}" /></div>
        <div class="flex-1">
          <div class="text-xl font-bold text-primary">${mentor.name}</div>
          <div class="font-semibold">Mã gia sư: ${mentor.code}</div>
          <div class="relative flex justify-between items-start gap-4 rounded-t-2xl rounded-br-2xl shadow-xl py-4 px-4 mt-5 mb-8 detail-mentor">
            <div class="flex-1 text-center">
              <div class="flex justify-center">
                <img src="public/images/map.png" alt="map" />
              </div>
              <div class="text-[12px]">Bộ môn</div>
              <div class="font-medium text-[14px]">${mentor.course}</div>
            </div>
            <div class="flex-1 text-center">
              <div class="flex justify-center">
                <img src="public/images/briefcase.png" alt="map" />
              </div>
              <div class="text-[12px]">Nơi công tác</div>
              <div class="font-medium max-h-[120px] text-ellipsis overflow-auto scrollbar-custom text-[14px]">${mentor.workPlace}</div>
            </div>
            <div class="flex-1 text-center">
              <div class="flex justify-center">
                <img src="public/images/award.png" alt="map" />
              </div>
              <div class="text-[12px]">Học vị</div>
              <div class="font-medium text-[14px]">${mentor.degree}</div>
            </div>
          </div>
          <div class="text-sm break-all h-[230px] text-ellipsis overflow-auto scrollbar-custom">${mentor.description}</div>
        </div>
      </div>
    </div>
  `
}

function onClose () {
  popupEl.classList.add('hidden');
}
