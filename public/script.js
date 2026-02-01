const API_URL = 'http://localhost:5000/api';

// Elements
const authSection = document.getElementById('authSection');
const userSection = document.getElementById('userSection');
const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
const usernameDisplay = document.getElementById('usernameDisplay');
const roleDisplay = document.getElementById('roleDisplay');

// State
let token = localStorage.getItem('token');
let user = JSON.parse(localStorage.getItem('user'));

// Init
const updateUI = () => {
  if (token && user) {
    authSection.classList.add('hidden');
    userSection.classList.remove('hidden');
    usernameDisplay.textContent = user.username;
    roleDisplay.textContent = user.role;

    // Show add book form only if admin
    if (user.role === 'admin') {
      bookForm.classList.remove('hidden');
    } else {
      bookForm.classList.add('hidden');
    }
  } else {
    authSection.classList.remove('hidden');
    userSection.classList.add('hidden');
    bookForm.classList.add('hidden');
  }
};

// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (data.success) {
      token = data.token;
      user = data.user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      updateUI();
      alert('Logged in successfully');
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert('Login failed');
  }
});

// Register
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const role = document.getElementById('regRole').value;

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, role })
    });
    const data = await res.json();

    if (data.success) {
      token = data.token;
      user = data.user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      updateUI();
      alert('Registered successfully');
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert('Registration failed');
  }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  token = null;
  user = null;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  updateUI();
});

// Load Books
const loadBooks = async () => {
  try {
    const res = await fetch(`${API_URL}/books`);
    const data = await res.json();
    // Data structure might be { success: true, count: N, data: [...] } or just [...]
    // Based on controller it returns { success, count, data }

    const books = data.data || [];

    bookList.innerHTML = '';

    books.forEach(book => {
      const li = document.createElement('li');
      li.style.marginBottom = '10px';

      const info = document.createElement('span');
      info.textContent = `${book.title} by ${book.author} (${book.year || 'N/A'}) `;

      li.appendChild(info);

      // Add simple delete button if admin
      if (user && user.role === 'admin') {
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.style.marginLeft = '10px';
        delBtn.style.padding = '2px 5px';
        delBtn.style.backgroundColor = '#dc3545';

        delBtn.onclick = async () => {
          if (!confirm('Are you sure?')) return;
          try {
            const res = await fetch(`${API_URL}/books/${book._id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            const data = await res.json();
            if (data.success) {
              loadBooks();
            } else {
              alert(data.error);
            }
          } catch (e) {
            console.error(e);
          }
        };
        li.appendChild(delBtn);
      }

      // Reviews Link (Simple text for now)
      const reviewLink = document.createElement('a');
      reviewLink.href = '#';
      reviewLink.textContent = ' (View Reviews)';
      reviewLink.onclick = (e) => {
        e.preventDefault();
        fetchReviews(book._id);
      };
      li.appendChild(reviewLink);

      bookList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
};

const fetchReviews = async (bookId) => {
  try {
    const res = await fetch(`${API_URL}/books/${bookId}/reviews`);
    const data = await res.json();
    const reviews = data.data || [];

    let msg = `Reviews for this book:\n`;
    if (reviews.length === 0) msg += "No reviews yet.";
    reviews.forEach(r => {
      msg += `- Rating: ${r.rating}/5, "${r.text}"\n`;
    });

    // Simple prompt to add review
    if (user) {
      if (confirm(msg + "\n\nDo you want to add a review?")) {
        const text = prompt("Enter review text:");
        const rating = prompt("Enter rating (1-5):");
        if (text && rating) {
          await addReview(bookId, text, rating);
        }
      }
    } else {
      alert(msg);
    }
  } catch (e) {
    console.error(e);
  }
};

const addReview = async (bookId, text, rating) => {
  try {
    const res = await fetch(`${API_URL}/books/${bookId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ text, rating })
    });
    const data = await res.json();
    if (data.success) {
      alert('Review added!');
    } else {
      alert(data.error);
    }
  } catch (e) {
    console.error(e);
    alert('Failed to add review');
  }
}


// Add Book
bookForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const description = document.getElementById('description').value;

  try {
    const res = await fetch(`${API_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, author, year, description })
    });

    const data = await res.json();

    if (data.success) {
      bookForm.reset();
      loadBooks();
      alert('Book added!');
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert('Failed to add book');
  }
});

// Initial load
updateUI();
loadBooks();
