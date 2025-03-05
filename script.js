import { Trie } from './Trie.js';

const trie = new Trie();

// Element references.
const myInput = document.getElementById('myInput');
const infoSpan = document.getElementById('info');
const contactInput = document.getElementById('contact_input');
const addButton = document.getElementById('add');
const deleteInput = document.getElementById('delete_input');
const delButton = document.getElementById('del');

// When the user types in the search input, update the contact list.
myInput.addEventListener('keyup', () => {
  const query = myInput.value.trim();
  let results = [];
  if (query === "") {
    // If empty, show all contacts.
    results = trie.getAllContacts();
  } else if (/^\d+$/.test(query)) {
    // If query is only digits, search by phone number prefix.
    results = trie.searchPrefix(query);
  } else {
    // Otherwise, search by name (case-insensitive).
    const allContacts = trie.getAllContacts();
    results = allContacts.filter(contact => 
      contact.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  renderResults(results);
});

// Add a new contact when the Add Contact button is clicked.
addButton.addEventListener('click', () => {
  const value = contactInput.value.trim();
  if (!value) return;
  // Expecting format: "Name,Number"
  const parts = value.split(',');
  if (parts.length < 2) {
    alert('Please enter the contact as "Name,Number".');
    return;
  }
  const name = parts[0].trim();
  const number = parts[1].trim();
  if (!/^\d+$/.test(number)) {
    alert('Phone number must contain only digits.');
    return;
  }
  trie.add(number, name);
  alert(`Added contact: ${name} (${number})`);
  contactInput.value = '';
  // Refresh search results based on the current query.
  const query = myInput.value.trim();
  let results = [];
  if (query === "") {
    results = trie.getAllContacts();
  } else if (/^\d+$/.test(query)) {
    results = trie.searchPrefix(query);
  } else {
    const allContacts = trie.getAllContacts();
    results = allContacts.filter(contact => 
      contact.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  renderResults(results);
});

// Delete a contact when the Delete Contact button is clicked.
delButton.addEventListener('click', () => {
  const number = deleteInput.value.trim();
  if (!number) return;
  if (!/^\d+$/.test(number)) {
    alert('Phone number must contain only digits.');
    return;
  }
  trie.del(number);
  alert(`Deleted contact with number: ${number}`);
  deleteInput.value = '';
  // Refresh search results.
  const query = myInput.value.trim();
  let results = [];
  if (query === "") {
    results = trie.getAllContacts();
  } else if (/^\d+$/.test(query)) {
    results = trie.searchPrefix(query);
  } else {
    const allContacts = trie.getAllContacts();
    results = allContacts.filter(contact => 
      contact.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  renderResults(results);
});

// Renders the search results inside the "info" span.
// Each contact is rendered as a clickable element that triggers an alert when clicked.
function renderResults(results) {
  if (results.length === 0) {
    infoSpan.innerHTML = '<div>No contacts found.</div>';
  } else {
    let html = '';
    results.forEach(contact => {
      html += `
        <div class="list-group-item list-group-item-action contact-item" 
             style="display: inline-flex; margin: 5px;" 
             data-name="${contact.name}" data-number="${contact.number}">
          <span class="ks-avatar" style="align-content: center">
            <img src="./person.png" style="margin: 10px; height: 40px; width: 40px">
          </span>
          <div>
            <span>${contact.name}</span><br>
            <span>${contact.number}</span>
          </div>
        </div>`;
    });
    infoSpan.innerHTML = html;
    
    // Add click event listener to each rendered contact.
    document.querySelectorAll('.contact-item').forEach(item => {
      item.addEventListener('click', () => {
        const name = item.getAttribute('data-name');
        const number = item.getAttribute('data-number');
        alert(`Calling ${name} (${number})`);
      });
    });
  }
}
