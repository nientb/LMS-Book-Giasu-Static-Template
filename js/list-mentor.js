// LIST MENTOR
const listMentorEl = document.getElementById("list-mentor");
const paginationEl = document.getElementById("pagination");

const mentors = window.mentors;

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
  paginationContent();

  // RENDER LIST MENTOR
  function renderListMentor(data) {
    listMentorEl.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      const li = document.createElement("li");
      li.innerHTML = `
      <div>
        <div class="relative flex justify-center">
          <img src="${data[i].picture}" alt="teacher">
          <div class="absolute bottom-0 text-center px-4 py-1 text-white rounded-xl z-10" style="background-image: linear-gradient(${data[i].color[0]}, ${data[i].color[1]});">${data[i].course}</div>
        </div>
        <div class="relative rounded px-2 pt-2 pb-2 text-center shadow-xl info-before info-after">
          <div class="font-medium text-sm">${data[i].name}</div>
          <div class="text-xs text-slate-400 my-1">${data[i].workPlace}</div>
          <span class="text-lg font-semibold">-${data[i].code}-</span>
          <div class="text-sm">${data[i].degree}</div>
        </div>
      </div>
      `;
      listMentorEl.appendChild(li);
    }
  }
}
