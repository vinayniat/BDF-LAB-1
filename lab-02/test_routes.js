const testRoutes = async () => {
  const BASE_URL = 'http://localhost:3000';

  console.log('--- 1. Testing GET /books/ (all books) ---');
  let res = await fetch(`${BASE_URL}/books/`);
  let data = await res.json();
  console.log(`Status: ${res.status}`);
  console.log(`Total books retrieved: ${data.length}`);
  console.log('First 2 books:', data.slice(0, 2));

  console.log('\n--- 2. Testing GET /books/3/ (single book) ---');
  res = await fetch(`${BASE_URL}/books/3/`);
  data = await res.json();
  console.log(`Status: ${res.status}`);
  console.log('Book 3 details:', data);

  console.log('\n--- 3. Testing POST /books/ (add new book) ---');
  const newBook = {
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 499,
    pages: 320,
  };
  res = await fetch(`${BASE_URL}/books/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook),
  });
  data = await res.json();
  console.log(`Status: ${res.status}`);
  console.log('Response:', data);
  const newBookId = data.bookId;

  console.log(`\n--- Verify newly added book with GET /books/${newBookId}/ ---`);
  res = await fetch(`${BASE_URL}/books/${newBookId}/`);
  data = await res.json();
  console.log('Added book verified:', data);

  console.log(`\n--- 4. Testing PUT /books/${newBookId}/ (update book) ---`);
  const updatedBook = {
    title: 'Atomic Habits (Special Edition)',
    author: 'James Clear',
    price: 599,
    pages: 350,
  };
  res = await fetch(`${BASE_URL}/books/${newBookId}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedBook),
  });
  const updateText = await res.text();
  console.log(`Status: ${res.status}`);
  console.log('Response:', updateText);

  console.log(`\n--- Verify updated book with GET /books/${newBookId}/ ---`);
  res = await fetch(`${BASE_URL}/books/${newBookId}/`);
  data = await res.json();
  console.log('Updated book verified:', data);

  console.log(`\n--- 5. Testing DELETE /books/${newBookId}/ (delete book) ---`);
  res = await fetch(`${BASE_URL}/books/${newBookId}/`, {
    method: 'DELETE',
  });
  const deleteText = await res.text();
  console.log(`Status: ${res.status}`);
  console.log('Response:', deleteText);

  console.log(`\n--- Verify book deletion with GET /books/${newBookId}/ ---`);
  res = await fetch(`${BASE_URL}/books/${newBookId}/`);
  console.log(`Status (expected 404): ${res.status}`);
  data = await res.json();
  console.log('Response:', data);
};

testRoutes().catch(console.error);
