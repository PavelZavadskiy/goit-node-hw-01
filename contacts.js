const fs = require('fs').promises;
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8', (err, _) => {
      if (err) throw err;
    });
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const array = await listContacts();
    if (array.length === 0) return null;
    const contact = array.find(item => item.id === contactId);
    if (contact === undefined) return null;
    return contact;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const array = await listContacts();
    if (array.length === 0) return null;
    const contact = array.find(item => item.id === contactId);
    if (contact === undefined) return null;
    const newArray = array.filter(item => item.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newArray), 'utf8', err => {
      if (err) throw err;
    });
    return contact;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const array = await listContacts();
    let contact = array.find(item => item.email === email || name.email === name);
    if (contact !== undefined) throw new Error('CONTACT_EXISTS');
    contact = { id: nanoid(), name, email, phone };
    array.push(contact);
    fs.writeFile(contactsPath, JSON.stringify(array), 'utf8', err => {
      if (err) throw err;
    });
    return contact;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
