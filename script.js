let interviewList = [];
let rejectList = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interview-Count');
let rejectCount = document.getElementById('reject-Count');

const allCardSection = document.getElementById('all-cards');
const filterSection = document.getElementById('filtered-section');
// step-1 calculate count
function calculateCount() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectCount.innerText = rejectList.length;
}
calculateCount();
// step-1 finish

// step 2 start;
const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectFilterBtn = document.getElementById('reject-filter-btn');
const noJobsPart = document.querySelector('.no-job-part');

// Step 1 - Add
const availableJob = document.getElementById('available-job'); //===============

function updateAvailableJob() {
  const totalJobs = allCardSection.children.length;

  if (currentStatus === 'interview-filter-btn') {
    if (interviewList.length > 0) {
      availableJob.innerText = interviewList.length + ' of ' + totalJobs;
    } else {
      availableJob.innerText = '0';
    }
  } else if (currentStatus === 'reject-filter-btn') {
    if (rejectList.length > 0) {
      availableJob.innerText = rejectList.length + ' of ' + totalJobs;
    } else {
      availableJob.innerText = '0';
    }
  } else {
    availableJob.innerText = totalJobs;
  }
}


function toggleStyle(id) {
  // reset all button style
  allFilterBtn.classList.add('bg-gray-300', 'text-black');
  interviewFilterBtn.classList.add('bg-gray-300', 'text-black');
  rejectFilterBtn.classList.add('bg-gray-300', 'text-black');

  allFilterBtn.classList.remove('bg-blue-500', 'text-white');
  interviewFilterBtn.classList.remove('bg-blue-500', 'text-white');
  rejectFilterBtn.classList.remove('bg-blue-500', 'text-white');

  const selected = document.getElementById(id);
  selected.classList.remove('bg-gray-300');
  selected.classList.add('bg-blue-500', 'text-white');

  currentStatus = id;
    if (id === 'interview-filter-btn') {
      allCardSection.classList.add('hidden');
      filterSection.classList.remove('hidden');
      renderInterview();
    } else if (id === 'reject-filter-btn') {
      allCardSection.classList.add('hidden');
      filterSection.classList.remove('hidden');
      renderReject();
    } else {
      allCardSection.classList.remove('hidden');
      filterSection.classList.add('hidden');
      noJobsPart.classList.add('hidden');
  }
  updateAvailableJob();
  
}

// step 3 delegation
const mainContainer = document.querySelector('main');

mainContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('interview-btn')) {
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector('.companyName').innerText;
    const position = parentNode.querySelector('.position').innerText;
    const location = parentNode.querySelector('.location').innerText;
    const type = parentNode.querySelector('.type').innerText;

    const stats = parentNode.querySelector('.stats');
    stats.classList.remove(
      'bg-green-200',
      'bg-red-400',
      'bg-green-400',
      'hidden',
    );
    stats.classList.add('bg-green-400');

    const salary = parentNode.querySelector('.salary').innerText;
    const description = parentNode.querySelector('.description').innerText;
    // console.log(companyName,position,location,type,stats,salary,description)

    parentNode.querySelector('.stats').innerText = 'INTERVIEW';
    const cardInfo = {
      companyName,
      position,
      location,
      type,
      stats: 'INTERVIEW',
      salary,
      description,
    };
    // console.log(cardInfo)

    const interviewExist = interviewList.find(
      item => item.companyName == cardInfo.companyName,
    );

    if (!interviewExist) {
      interviewList.push(cardInfo);
    }
    // step 3 finish
    rejectList = rejectList.filter(
      item => item.companyName != cardInfo.companyName,
    );

    if (currentStatus == 'reject-filter-btn') {
      renderReject();
    }

    calculateCount();
    updateAvailableJob();
    
  } else if (event.target.classList.contains('reject-btn')) {
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector('.companyName').innerText;
    const position = parentNode.querySelector('.position').innerText;
    const location = parentNode.querySelector('.location').innerText;
    const type = parentNode.querySelector('.type').innerText;

    const stats = parentNode.querySelector('.stats');
    stats.classList.remove(
      'bg-green-200',
      'bg-green-400',
      'bg-red-400',
      'hidden',
    );
    stats.classList.add('bg-red-400');
    const salary = parentNode.querySelector('.salary').innerText;
    const description = parentNode.querySelector('.description').innerText;
    // console.log(companyName,position,location,type,stats,salary,description)

    parentNode.querySelector('.stats').innerText = 'REJECTED';
    const cardInfo = {
      companyName,
      position,
      location,
      type,
      stats: 'REJECTED',
      salary,
      description,
    };
    // console.log(cardInfo)

    const interviewExist = rejectList.find(
      item => item.companyName == cardInfo.companyName,
    );

    if (!interviewExist) {
      rejectList.push(cardInfo);
    }

    interviewList = interviewList.filter(
      item => item.companyName != cardInfo.companyName,
    );

    if (currentStatus == 'interview-filter-btn') {
      renderInterview();
    }
    calculateCount();
    updateAvailableJob();
  }
});

// step 4  html file create
function renderInterview() {
  filterSection.innerHTML = '';

  if (interviewList.length === 0) {
    noJobsPart.classList.remove('hidden');
    return;
  } else {
    noJobsPart.classList.add('hidden');
  }

  for (let interview of interviewList) {
    console.log(interview);

    let div = document.createElement('div');
    div.className = 'flex bg-white justify-between p-6 mb-6 rounded-xl';
    div.innerHTML = `
      <div class="space-y-6">
          <!-- part 1 -->
          <div>
            <p class="companyName text-4xl">${interview.companyName}</p>
            <p class="position text-2xl text-gray-400 mt-3">${interview.position}</p>
            <div class="my-6">
              <button class="location text-gray-400">${interview.location}</button>
              <button class="type text-gray-400">${interview.type}</button>
              <button class="salary text-gray-400">${interview.salary}</button>
            </div>

            <div>
              <button class="stats bg-green-400 px-5 py-2 rounded-md">${interview.stats}</button>
            </div>

            <p class="description my-2">${interview.description}</p>

            <div class="flex gap-5 mt-4">
              <button class="btn btn-outline btn-success interview-btn">Interview</button>
              <button class="btn btn-outline btn-error px-7 reject-btn">Reject</button>
            </div>
          </div>
        </div>
        <!-- delete button -->
        <div>
            <button class="btn btn-circle deleted">
              <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
        `;
    filterSection.appendChild(div);
  }
}

function renderReject() {
  filterSection.innerHTML = '';

  if (rejectList.length === 0) {
    noJobsPart.classList.remove('hidden');
    return;
  } else {
    noJobsPart.classList.add('hidden');
  }

  for (let reject of rejectList) {
    console.log(reject);

    let div = document.createElement('div');
    div.className = 'flex bg-white justify-between p-6 mb-6 rounded-xl';
    div.innerHTML = `
      <div class="space-y-6">
          <!-- part 1 -->
          <div>
            <p class="companyName text-4xl">${reject.companyName}</p>
            <p class="position text-2xl text-gray-400 mt-3">${reject.position}</p>
            <div class="my-6">
              <button class="location text-gray-400">${reject.location}</button>
              <button class="type text-gray-400">${reject.type}</button>
              <button class="salary text-gray-400">${reject.salary}</button>
            </div>

            <div>
              <button class="stats bg-red-400 px-5 py-2 rounded-md">${reject.stats}</button>
            </div>

            <p class="description my-2">${reject.description}</p>

            <div class="flex gap-5 mt-4">
              <button class="btn btn-outline btn-success interview-btn">Interview</button>
              <button class="btn btn-outline btn-error px-7 reject-btn">Reject</button>
            </div>
          </div>
        </div>
        <!-- delete button -->
        <div>
            <button class="btn btn-circle deleted">
              <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
        `;
    filterSection.appendChild(div);
  }
}
