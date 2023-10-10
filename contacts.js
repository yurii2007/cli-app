const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((el) => el.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexOfContact = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (indexOfContact === -1) return null;
  const [result] = contacts.splice(indexOfContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (contact) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...contact
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
