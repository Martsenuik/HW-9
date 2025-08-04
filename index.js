const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');
const addBtn = document.querySelector('#addBtn');
const contactsList = document.querySelector('#contactsList');


function getContacts() {
    return JSON.parse(localStorage.getItem('contacts')) || [];
}


function saveContacts(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}


function renderContacts() {
    const contacts = getContacts();
    contactsList.innerHTML = '';

    contacts.forEach((contact, index) => {
        const li = document.createElement('li');
        li.innerHTML = 
            `${contact.firstName} ${contact.lastName} — ${contact.phone}, ${contact.email}
            <button onclick="editContact(${index})">Редагувати</button>
            <button onclick="deleteContact(${index})">Видалити</button>`
        ;
        contactsList.appendChild(li);
    });
}


addBtn.addEventListener('click', () => {
    const contacts = getContacts();
    contacts.push({
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        phone: phoneInput.value,
        email: emailInput.value
    });
    saveContacts(contacts);
    renderContacts();
    firstNameInput.value = lastNameInput.value = phoneInput.value = emailInput.value = '';
});


function deleteContact(index) {
    const contacts = getContacts();
    contacts.splice(index, 1);
    saveContacts(contacts);
    renderContacts();
}


function editContact(index) {
    const contacts = getContacts();
    const contact = contacts[index];

    firstNameInput.value = contact.firstName;
    lastNameInput.value = contact.lastName;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;

    deleteContact(index);
}


renderContacts();