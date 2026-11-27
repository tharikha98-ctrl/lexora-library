
// PAGE NAVIGATION

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    if (pageId === "catalogue") {
        displayBooks(books);
    }

    window.scrollTo(0, 0);
}


// DEMO BOOK DATA

const books = [

{subject:"Science", topic:"Physics", title:"Concepts of Physics", author:"H.C. Verma"},
{subject:"Science", topic:"Chemistry", title:"Organic Chemistry", author:"Morrison"},
{subject:"Science", topic:"Biology", title:"Biology", author:"Campbell"},
{subject:"Science", topic:"Astronomy", title:"The Universe", author:"Stephen Hawking"},

{subject:"Mathematics", topic:"Algebra", title:"Higher Algebra", author:"Hall and Knight"},
{subject:"Mathematics", topic:"Geometry", title:"Geometry", author:"Euclid"},
{subject:"Mathematics", topic:"Calculus", title:"Calculus", author:"James Stewart"},

{subject:"Computer Science", topic:"Programming", title:"Python Programming", author:"John Zelle"},
{subject:"Computer Science", topic:"Web Development", title:"HTML and CSS", author:"Jon Duckett"},
{subject:"Computer Science", topic:"Database", title:"Database Systems", author:"Elmasri"},

{subject:"English", topic:"Grammar", title:"English Grammar", author:"Wren and Martin"},
{subject:"English", topic:"Literature", title:"Selected Stories", author:"Various Authors"},

{subject:"History", topic:"World History", title:"World History", author:"William McNeill"},
{subject:"History", topic:"Indian History", title:"India's Ancient Past", author:"R.S. Sharma"},

{subject:"Geography", topic:"Physical Geography", title:"Physical Geography", author:"Savindra Singh"},
{subject:"Geography", topic:"World Geography", title:"World Geography", author:"Majid Husain"},

{subject:"Commerce", topic:"Accounting", title:"Financial Accounting", author:"T.S. Grewal"},
{subject:"Commerce", topic:"Economics", title:"Principles of Economics", author:"Mankiw"},

{subject:"Literature", topic:"Poetry", title:"Selected Poems", author:"Various Authors"},
{subject:"Literature", topic:"Novels", title:"Classic Novels", author:"Various Authors"},

{subject:"General Knowledge", topic:"Current Affairs", title:"General Knowledge", author:"Manohar Pandey"},
{subject:"Technology", topic:"Artificial Intelligence", title:"Artificial Intelligence", author:"Stuart Russell"}

];


// DISPLAY SUBJECTS

function displaySubjects() {

    let subjectList = [...new Set(books.map(book => book.subject))];

    let container = document.getElementById("subjects");

    container.innerHTML = "";

    subjectList.forEach(subject => {

        let count = books.filter(book =>
            book.subject === subject
        ).length;

        container.innerHTML += `
            <div class="card subject"
                 onclick="selectSubject('${subject}')">

                <h3>${subject}</h3>
                <p>${count} Books</p>
                <p>Click to Explore</p>

            </div>
        `;
    });

    let filter = document.getElementById("subjectFilter");

    subjectList.forEach(subject => {
        filter.innerHTML += `
            <option value="${subject}">${subject}</option>
        `;
    });
}


// DISPLAY BOOKS

function displayBooks(list) {

    let container = document.getElementById("results");

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML =
            "<div class='card'>No books found.</div>";
    }

    list.forEach(book => {

        container.innerHTML += `
            <div class="card book">

                <h3>${book.title}</h3>

                <p><b>Author:</b> ${book.author}</p>

                <p><b>Subject:</b> ${book.subject}</p>

                <p><b>Topic:</b> ${book.topic}</p>

            </div>
        `;
    });

    document.getElementById("bookCount").innerText =
        "Total Books Available: " + list.length;
}


// SELECT SUBJECT

function selectSubject(subject) {

    document.getElementById("subjectFilter").value = subject;

    let filtered = books.filter(book =>
        book.subject === subject
    );

    displayBooks(filtered);

    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });
}


// SEARCH BOOKS

function searchBooks() {

    let search = document.getElementById("searchInput")
        .value.toLowerCase();

    let filtered = books.filter(book =>

        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search) ||
        book.subject.toLowerCase().includes(search) ||
        book.topic.toLowerCase().includes(search)

    );

    displayBooks(filtered);
}


// FILTER BOOKS

function filterBooks() {

    let subject = document.getElementById("subjectFilter").value;

    let filtered;

    if (subject === "all") {
        filtered = books;
    } else {
        filtered = books.filter(book =>
            book.subject === subject
        );
    }

    displayBooks(filtered);
}


// REGISTER FUNCTION

function registerUser(event) {

    event.preventDefault();

    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;
    let confirm = document.getElementById("confirmPassword").value;

    if (password !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("lexoraUsers")) || [];

    let exists = users.find(user => user.email === email);

    if (exists) {
        alert("This email is already registered!");
        return;
    }

    users.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem("lexoraUsers", JSON.stringify(users));

    alert("Registration Successful!");

    document.querySelector("#register form").reset();

    showPage("login");
}


// LOGIN FUNCTION

function loginUser(event) {

    event.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if (email === "demo@lexora.com" && password === "12345") {

        alert("Welcome to Lexora Library!");

        document.getElementById("welcomeText").innerText =
            "Welcome, Demo Member!";

        showPage("catalogue");
        return;
    }

    let users = JSON.parse(localStorage.getItem("lexoraUsers")) || [];

    let user = users.find(u =>
        u.email === email && u.password === password
    );

    if (user) {

        alert("Login Successful!");

        document.getElementById("welcomeText").innerText =
            "Welcome, " + user.name + "!";

        showPage("catalogue");

    } else {

        alert("Invalid Email or Password!");

    }
}


// INITIALIZE WEBSITE

displaySubjects();
displayBooks(books);
