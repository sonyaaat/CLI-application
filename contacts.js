const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((el) => Number(el.id) === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((el) => Number(el.id) === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((el) => Number(el.id) !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[idx];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: Date.now(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}
module.exports = {
  listContacts,
  removeContact,
  addContact,
  getContactById,
};
