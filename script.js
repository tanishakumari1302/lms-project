const FAKE_USER = {
    email: "test@example.com",
    password: "1234"
};

const FAKE_ADMIN = {
    email: "admin@example.com",
    password: "admin123"
};

const FAKE_FACULTY = {
  email: "faculty@example.com",
  password: "faculty123"
};



const STUDENTS = [
    { id: 1, name: "Riya Sharma", email: "riya@example.com", course: "HTML & CSS Basics" },
    { id: 2, name: "Aman Verma", email: "aman@example.com", course: "JavaScript Fundamentals" },
    { id: 3, name: "Priya Singh", email: "priya@example.com", course: "Intro to Backend" }
];

const FACULTY = [
  { id: 1, name: "Dr. Anil Mehta", email: "anil@example.com", subject: "HTML & CSS" },
  { id: 2, name: "Ms. Kavita Rao", email: "kavita@example.com", subject: "JavaScript" },
  { id: 3, name: "Mr. Rohit Sen", email: "rohit@example.com", subject: "Backend Development" }
];



const COURSES = [
  {
    id: 1,
    title: "HTML & CSS Basics",
    description: "Learn to create web pages from scratch.",
    instructor: "Mr. Shivang Shukla",
    duration: "6 Weeks",
    level: "Beginner",
    students: 128,
    lessons: [
      { id: 1, title: "Introduction to HTML", done: true },
      { id: 2, title: "HTML Tags & Structure", done: true },
      { id: 3, title: "CSS Basics", done: true },
      { id: 4, title: "Flexbox & Grid", done: false },
      { id: 5, title: "Responsive Design", done: false }
    ]
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    description: "Learn to add logic and interactivity.",
    instructor: "Ms. Kavita Rao",
    duration: "8 Weeks",
    level: "Intermediate",
    students: 96,
    lessons: [
      { id: 1, title: "Variables & Data Types", done: true },
      { id: 2, title: "Functions", done: false },
      { id: 3, title: "DOM Manipulation", done: false },
      { id: 4, title: "Events", done: false }
    ]
  },
  {
    id: 3,
    title: "Intro to Backend",
    description: "Basic knowledge of servers and databases.",
    instructor: "Mr. Rohit Sen",
    duration: "10 Weeks",
    level: "Advanced",
    students: 54,
    lessons: [
      { id: 1, title: "What is a Server?", done: false },
      { id: 2, title: "Setting up Node.js", done: false },
      { id: 3, title: "Building an API", done: false }
    ]
  }
];

function getCourseById(id) {
    return COURSES.find(c => c.id === Number(id));
}


const QUIZZES = {
    1: {
        title: "HTML & CSS Quiz",
        questions: [
            {
                q: "What is the full form of HTML?",
                options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlink Text Mode Language"],
                answer: 0
            },
            {
                q: "What is the reason  for that CSS?",
                options: ["For server logic", "For styling", "For the database"],
                answer: 1
            }
        ]
        },
        2: {
            title: "javaScript Quiz",
            questions: [
                {
                    q: "What is the difference between 'let' and 'var'?",
                    options: ["No difference", "Difference in scope", "Both do the same thing"],
                    answer: 1
                }
            ]
        },
        3: {
            title: "Backend Quiz",
            questions: [
                {
                    q: "What is Node.js?",
                    options: ["Browser", "javaScript runtime", "Database"],
                    answer: 1
                }
            ]

        }
        
    };

    const GRADES = [
  { course: "HTML & CSS Basics", type: "Quiz", score: 90 },
  { course: "HTML & CSS Basics", type: "Assignment", score: 78 },
  { course: "JavaScript Fundamentals", type: "Quiz", score: 65 },
  { course: "JavaScript Fundamentals", type: "Assignment", score: 72 },
  { course: "Intro to Backend", type: "Quiz", score: 55 }
];

function scoreToGrade(score) {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 50) return "C";
  return "D";
}

    const NOTES = {
        1: [
            { title: "HTML Basics - Notes.pdf" },
            { title: "CSS Flexbox Guide.pdf" }
        ],
        2: [
            { title: "JavaScript Variables & Functions.pdf" }
        ],
        3: [
            { title: "Intro to Servers.pdf" }
        ]
    };

    const FACULTY_ASSIGNMENTS = [
        { id: 1, courseId: 1, title: "Build a Personal Portfolio Page", dueDate: "20 July 2026"},
        { id: 2, courseId: 2, title: "Create a To-Do List App", dueDate: "25 July 2026" }
    ];

    const ATTENDANCE = [
        { date: "10 July 2026", course: "HTML & CSS Basics", status: "Present" },
        { date: "11 July 2026", course: "HTML & CSS Basics", status: "Present" },
        { date: "12 July 2026", course: "JavaScript Fundamentals", status: "Absent" },
        { date: "13 July 2026", course: "JavaScript Fundamentals", status: "Present" },
        { date: "14 July 2026", course: "Intro to Backend", status: "Present" },

    ];


async function handleLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password: password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", data.user.name);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("errorMsg").textContent = data.message;
    }
  } catch (error) {
    document.getElementById("errorMsg").textContent = "Could not connect to the server. The backend is running?";
  }
}

async function handleSignup() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (!name || !email || !password) {
    document.getElementById("signupErrorMsg").textContent = "Fill in all the fields!";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name, email: email, password, role: "student" })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Signup successful! Log in now.");
      window.location.href = "index.html";
    } else {
      document.getElementById("signupErrorMsg").textContent = data.message;
    }
  } catch (error) {
    document.getElementById("signupErrorMsg").textContent = "Could not connect to the server. The backend is running.?";
  }
}

async function handleAdminLogin() {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  try {
    const response = await fetch("http://localhost:5000/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("isAdminLoggedIn", "true");
      localStorage.setItem("adminName", data.user.name);
      window.location.href = "admin-dashboard.html";
    } else {
      document.getElementById("adminErrorMsg").textContent = data.message;
    }
  } catch (error) {
    document.getElementById("adminErrorMsg").textContent = "Could not connect to the server";
  }
}

async function handleFacultyLogin() {
  const email = document.getElementById("facultyEmail").value;
  const password = document.getElementById("facultyPassword").value;

  try {
    const response = await fetch("http://localhost:5000/api/auth/faculty-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("isFacultyLoggedIn", "true");
      localStorage.setItem("facultyName", data.user.name);
      window.location.href = "faculty-dashboard.html";
    } else {
      document.getElementById("facultyErrorMsg").textContent = data.message;
    }
  } catch (error) {
    document.getElementById("facultyErrorMsg").textContent = "Could not connect to the server";
  }
}

function handleLogout(){
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
}
const courseListDiv = document.getElementById("courseList");

function handleAdminLogout() {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "admin-login.html";
}

function handleFacultyLogout() {
  localStorage.removeItem("isFacultyLoggedIn");
  window.location.href = "faculty-login.html";
}



if (courseListDiv) {
  fetch("http://localhost:5000/api/courses")
    .then(response => response.json())
    .then(courses => {
      courses.forEach(course => {
        const totalLessons = course.lessons.length;

        courseListDiv.innerHTML += `
        <a href="course.html?id=${course._id}" class="course-card">
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <p class="course-meta">👤 ${course.instructor}</p>
          <p class="progress-text">${totalLessons} lessons</p>
        </a>
        `;
      });
    })
    .catch(error => {
      courseListDiv.innerHTML = "<p>Courses load nahi ho paaye. Backend chal raha hai check karo.</p>";
    });
}

    // Stats calculate karke upar dikhana
    const studentNameSpan = document.getElementById("studentNameSpan");
    if (studentNameSpan) {
      const savedName = localStorage.getItem("userName");
      studentNameSpan.textContent = savedName || "Student";
    }
    const totalCoursesEl = document.getElementById("statTotalCourses");
    const completedEl = document.getElementById("statCompleted");
    if (totalCoursesEl) {
      totalCoursesEl.textContent = COURSES.length;
      let totalDone = 0;
      COURSES.forEach(c => totalDone += c.lessons.filter(l => l.done).length);
      completedEl.textContent = totalDone;
    }


    const courseTitleE1 = document.getElementById("courseTitle");

if (courseTitleE1) {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("id");

  fetch(`http://localhost:5000/api/courses/${courseId}`)
    .then(response => response.json())
    .then(course => {
      courseTitleE1.textContent = course.title;
      document.getElementById("courseDesc").textContent = course.description;
      document.getElementById("courseInstructor").textContent = course.instructor;
      document.getElementById("courseInstructor").textContent = course.instructor;
      document.getElementById("courseLessonCount").textContent = `${course.lessons.length} Lessons`;
      document.getElementById("quizLink").href = `quiz.html?id=${course._id}`;
      document.getElementById("assignmentLink").href = `assignment.html?id=${course._id}`;

      const lessonList = document.getElementById("lessonList");
      course.lessons.forEach((lesson, index) => {
        lessonList.innerHTML += `
          <li>
              <span>📖 Lesson ${index + 1}: ${lesson.title}</span>
         </li>
        `;
     });

      const notesList = document.getElementById("notesList");
      if (course.notes.length === 0) {
        notesList.innerHTML = "<li>No notes have been uploaded yet.</li>";
      } else {
        course.notes.forEach(note => {
          notesList.innerHTML += `<li>📄 ${note.title} — <a href="#" onclick="alert('Demo: The actual file will be downloaded here.')">Download</a></li>`;
        });
      }
    })
    .catch(error => {
      courseTitleE1.textContent = "Course not found!";
    });
}

const quizTitleEl = document.getElementById("quizTitle");
let currentQuiz = null;

if (quizTitleEl) {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("id");

  fetch(`http://localhost:5000/api/quizzes/course/${courseId}`)
    .then(response => response.json())
    .then(quiz => {
      currentQuiz = quiz;
      quizTitleEl.textContent = quiz.title;

      const quizContainer = document.getElementById("quizContainer");

      quiz.questions.forEach((q, index) => {
        quizContainer.innerHTML += `
          <div class="quiz-question">
            <h3>${index + 1}. ${q.q}</h3>
            ${q.options.map((opt, i) => `
              <label>
                <input type="radio" name="q${index}" value="${i}" />
                ${opt}
              </label>
            `).join("")}
          </div>
        `;
      });
    })
    .catch(error => {
      quizTitleEl.textContent = "Quiz not found!";
    });
}

function submitQuiz() {
  if (!currentQuiz) return;

  let score = 0;

  currentQuiz.questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && Number(selected.value) === q.answer) {
      score++;
    }
  });

  const total = currentQuiz.questions.length;
  const percent = Math.round((score / total) * 100);

  document.getElementById("resultBox").textContent = `Aapka score: ${score} / ${total} (${percent}%)`;
}



    
const gradeTable = document.getElementById("gradeTable");

if (gradeTable) {
  let total = 0;
  let highest = 0;

  GRADES.forEach(g => {
    const grade = scoreToGrade(g.score);
    gradeTable.innerHTML += `
      <tr>
        <td>${g.course}</td>
        <td>${g.type}</td>
        <td>${g.score}%</td>
        <td><span class="grade-badge grade-${grade}">${grade}</span></td>
      </tr>
    `;
    total += g.score;
    if (g.score > highest) highest = g.score;
  });

  document.getElementById("statAverage").textContent = Math.round(total / GRADES.length) + "%";
  document.getElementById("statHighest").textContent = highest + "%";
  document.getElementById("statTotalGraded").textContent = GRADES.length;
}

function submitAssignment() {
    const fileInput = document.getElementById("fileInput");
    const msg = document.getElementById("assignmentMsg");

    if (fileInput.files.length === 0) {
        msg.textContent = "First, select a file!";
        msg.style.color = "red";
    } else {
        const fileName = fileInput.files[0].name;
        msg.textContent = `"${fileName}" It has been submitted! ✅`;
        msg.style.color = "green";
    }
}

const attendanceTable = document.getElementById("attendanceTable");

if (attendanceTable) {
  ATTENDANCE.forEach(a => {
    const statusClass = a.status === "Present" ? "status-present" : "status-absent";
    attendanceTable.innerHTML += `
      <tr>
        <td>${a.date}</td>
        <td>${a.course}</td>
        <td class="${statusClass}">${a.status}</td>
      </tr>
    `;
  });
}

const adminDashboardCheck = document.querySelector(".navbar .brand");

if (window.location.pathname.includes("admin-") && !window.location.pathname.includes("admin-login")) {
    if (localStorage.getItem("isAdminLoggedIn") !== "true") {
        window.location.href = "admin-login.html";
    }
}

if (window.location.pathname.includes("faculty-") && !window.location.pathname.includes("faculty-login")) {
  if (localStorage.getItem("isFacultyLoggedIn") !== "true") {
    window.location.href = "faculty-login.html";
  }
}

const studentsTable = document.getElementById("studentsTable");

function renderStudents() {
    studentsTable.innerHTML = `
      <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Course</th>
      <th>Action</th>
      </tr>
    `;

    STUDENTS.forEach(s => {
        studentsTable.innerHTML += `
          <tr>
             <td>${s.name}</td>
             <td>${s.email}</td>
             <td>${s.course || "Not enrolled"}</td>
             <td><button class="btn-small" onclick="deleteStudent(${s.id})">Delete</button></td>
          </tr>
        `;
    });
}

function addStudent() {
    const name = document.getElementById("newStudentName").value;
    const email = document.getElementById("newStudentEmail").value;

    if (!name || !email) {
        alert("Fill in both the name and email!");
        return;
    }

    const newId = STUDENTS.length > 0 ? STUDENTS[STUDENTS.length - 1].id + 1 : 1;
    STUDENTS.push({ id: newId, name: name, email: email, course: "Not enrolled" });

    renderStudents();
    document.getElementById("newStudentName").value = "";
    document.getElementById("newStudentEmail").value = "";
}

function deleteStudent(id) {
    const index = STUDENTS.findIndex(s => s.id === id);
    STUDENTS.splice(index, 1);
    renderStudents();
}

if (studentsTable) {
    renderStudents();
}

const facultyTable = document.getElementById("facultyTable");

function renderFaculty() {
  facultyTable.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Subject</th>
      <th>Action</th>
    </tr>
  `;

  FACULTY.forEach(f => {
    facultyTable.innerHTML += `
      <tr>
        <td>${f.name}</td>
        <td>${f.email}</td>
        <td>${f.subject}</td>
        <td><button class="btn-small" onclick="deleteFaculty(${f.id})">Delete</button></td>
      </tr>
    `;
  });
}

function addFaculty() {
  const name = document.getElementById("newFacultyName").value;
  const email = document.getElementById("newFacultyEmail").value;
  const subject = document.getElementById("newFacultySubject").value;

  if (!name || !email || !subject) {
    alert("Fill in all the fields!");
    return;
  }

  const newId = FACULTY.length > 0 ? FACULTY[FACULTY.length - 1].id + 1 : 1;
  FACULTY.push({ id: newId, name: name, email: email, subject: subject });

  renderFaculty();
  document.getElementById("newFacultyName").value = "";
  document.getElementById("newFacultyEmail").value = "";
  document.getElementById("newFacultySubject").value = "";
}

function deleteFaculty(id) {
  const index = FACULTY.findIndex(f => f.id === id);
  FACULTY.splice(index, 1);
  renderFaculty();
}

if (facultyTable) {
  renderFaculty();
}

const coursesTable = document.getElementById("coursesTable");

function renderCourses() {
  coursesTable.innerHTML = `
    <tr>
      <th>Title</th>
      <th>Description</th>
      <th>Action</th>
    </tr>
  `;

  COURSES.forEach(c => {
    coursesTable.innerHTML += `
      <tr>
        <td>${c.title}</td>
        <td>${c.description}</td>
        <td><button class="btn-small" onclick="deleteCourse(${c.id})">Delete</button></td>
      </tr>
    `;
  });
}

function addCourse() {
  const title = document.getElementById("newCourseTitle").value;
  const desc = document.getElementById("newCourseDesc").value;

  if (!title || !desc) {
    alert("Fill in all the fields!");
    return;
  }

  const newId = COURSES.length > 0 ? COURSES[COURSES.length - 1].id + 1 : 1;
  COURSES.push({ id: newId, title: title, description: desc, lessons: [] });

  renderCourses();
  document.getElementById("newCourseTitle").value = "";
  document.getElementById("newCourseDesc").value = "";
}

function deleteCourse(id) {
  const index = COURSES.findIndex(c => c.id === id);
  COURSES.splice(index, 1);
  renderCourses();
}

if (coursesTable) {
  renderCourses();
}

const noteCourseSelect = document.getElementById("noteCourseSelect");
const notesTable = document.getElementById("notesTable");

if (noteCourseSelect) {
    COURSES.forEach(c => {
        noteCourseSelect.innerHTML += `<option value="${c.id}">${c.title}</option>`;
    });

    renderNotesTable();
}

function renderNotesTable() {
    notesTable.innerHTML = `
    <tr>
      <th>Course</th>
      <th>Note Title</th>
    </tr>
    `;

    for (const courseId in NOTES) {
        const course = getCourseById(courseId);
        NOTES[courseId].forEach(note => {
            notesTable.innerHTML += `
             <tr>
               <td>${course ? course.title : "Unknown"}</td>
               <td>${note.title}</td>
             </tr>
            `;
        });
    }
}

function uploadNote() {
    const courseId = Number(noteCourseSelect.value);
    const title = document.getElementById("noteTitle").value;

    if (!title) {
        alert("Add a title for the note!");
        return;
    }

    if (!NOTES[courseId]) {
        NOTES[courseId] = [];
    }

    NOTES[courseId].push({ title: title });
    renderNotesTable();
    document.getElementById("noteTitle").value = "";
}


const assignmentCourseSelect = document.getElementById("assignmentCourseSelect");
const assignmentsTable = document.getElementById("assignmentsTable");

if (assignmentCourseSelect) {
  fetch("http://localhost:5000/api/courses")
    .then(response => response.json())
    .then(courses => {
      courses.forEach(c => {
        assignmentCourseSelect.innerHTML += `<option value="${c._id}">${c.title}</option>`;
      });
    });

  renderAssignmentsTable();
}

function renderAssignmentsTable() {
  fetch("http://localhost:5000/api/assignments")
    .then(response => response.json())
    .then(assignments => {
      assignmentsTable.innerHTML = `
        <tr>
          <th>Course</th>
          <th>Title</th>
          <th>Due Date</th>
        </tr>
      `;

      assignments.forEach(a => {
        assignmentsTable.innerHTML += `
          <tr>
            <td>${a.courseId ? a.courseId.title : "Unknown"}</td>
            <td>${a.title}</td>
            <td>${a.dueDate}</td>
          </tr>
        `;
      });
    });
}

function createAssignment() {
  const courseId = assignmentCourseSelect.value;
  const title = document.getElementById("assignmentTitleInput").value;
  const dueDate = document.getElementById("assignmentDueDate").value;

  if (!title || !dueDate) {
    alert("Fill in both the title and the due date.!");
    return;
  }

  fetch("http://localhost:5000/api/assignments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courseId, title, dueDate })
  })
    .then(response => response.json())
    .then(data => {
      renderAssignmentsTable();
      document.getElementById("assignmentTitleInput").value = "";
      document.getElementById("assignmentDueDate").value = "";
    })
    .catch(error => {
      alert("The assignment wasn't created; check the backend");
    });
}

const markAttendanceTable = document.getElementById("markAttendanceTable");

if (markAttendanceTable) {
    STUDENTS.forEach(s => {
        markAttendanceTable.innerHTML += `
         <tr>
           <td>${s.name} </td>
           <td>${s.email} </td>
           <td>
             <select id="status-${s.id}">
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
             </select>
           </td>
         </tr>
        `;
    });
}
function saveAttendance() {
    STUDENTS.forEach(s => {
        const status = document.getElementById(`status-${s.id}`).value;
        ATTENDANCE.push({
            date: "18 July 2026",
            course: "General",
            status: status
        });
    });

    alert("Attendance saved!");
}

function markLessonDone(lessonId, btn) {
  const lesson = course.lessons.find(l => l.id === lessonId);
  lesson.done = true;
  btn.parentElement.querySelector("span").innerHTML = "✅ " + lesson.title;
  btn.parentElement.querySelector("span").classList.add("done");
  btn.textContent = "Completed";
  btn.disabled = true;

  const doneCount = course.lessons.filter(l => l.done).length;
  const totalCount = course.lessons.length;
  const percent = Math.round((doneCount / totalCount) * 100);
  document.getElementById("courseProgressFill").style.width = percent + "%";
  document.getElementById("courseProgressText").textContent = `${percent}% complete • ${doneCount}/${totalCount} lessons`;
}

const statTotalStudentsEl = document.getElementById("statTotalStudents");
if (statTotalStudentsEl) {
  statTotalStudentsEl.textContent = STUDENTS.length;
  document.getElementById("statTotalFaculty").textContent = FACULTY.length;
  document.getElementById("statTotalCoursesAdmin").textContent = COURSES.length;
}

const statMyStudentsEl = document.getElementById("statMyStudents");
if (statMyStudentsEl) {
  statMyStudentsEl.textContent = STUDENTS.length;
  document.getElementById("statMyAssignments").textContent = FACULTY_ASSIGNMENTS.length;

  let noteCount = 0;
  for (const courseId in NOTES) {
    noteCount += NOTES[courseId].length;
  }
  document.getElementById("statMyNotes").textContent = noteCount;
}