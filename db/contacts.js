const fs = require('fs/promises')
const path = require('path')
const { stringify } = require('querystring')

const contactsPath = path.join(__dirname, "contacts.json")

async function  listContacts() {
    // ...твой 
    try {
        const data = await fs.readFile(contactsPath)
        const contacts = JSON.parse(data)
        return contacts  
    } 
    catch (error) {
        throw error    
    }
  }
  
async function getContactById(contactId) {
    // ...твой код
    const allContacts = await listContacts()
    const contact = allContacts.find(item => item.id === contactId)
    if(!contact){
        throw new Error('Id incorrect')
    }
    return contact
  }
  
async function removeContact(contactId) {
    // ...твой код
    const allContacts = await listContacts()
    const index = allContacts.findIndex( item => item.id === contactId)
    if(index === -1){
        throw new Error('Id incorrect')
    }
    const newContactsList = allContacts.filter(item => item.id !== contactId )
    fs.writeFile(contactsPath, JSON.stringify(newContactsList))
    return allContacts[index]
  }
  
  async  function addContact(name, email, phone) {
    // ...твой код
    const allContacts = await listContacts()
    const id = allContacts[allContacts.length-1].id + 1
    const newContact = {
        id, name, email, phone 
    }
    const newContactsList = [...allContacts, newContact ]
    fs.writeFile(contactsPath, JSON.stringify(newContactsList))
    return newContact
  }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
