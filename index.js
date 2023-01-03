const {
  listContacts,
  removeContact,
  addContact,
  getContactById,
} = require("./contacts");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.table(contact);
      break;

    case "add":
      const addedContact = await addContact(name, email, phone);
      console.table(addedContact);
      break;

    case "remove":
      const deletedContact = await removeContact(id);
      if (!deletedContact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.table(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
const argv = yargs(hideBin(process.argv)).argv;
invokeAction(argv);
