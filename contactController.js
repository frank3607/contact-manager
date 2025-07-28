 const { Parser } = require('json2csv');
const fs = require('fs');

let contacts = []; // In-memory store

// 🔍 GET /api/contacts?search=keyword
exports.getContacts = (req, res) => {
  const search = req.query.search?.toLowerCase();
  const result = search
    ? contacts.filter(
        c =>
          c.name.toLowerCase().includes(search) ||
          c.email.toLowerCase().includes(search)
      )
    : contacts;
  res.json(result);
};

// ➕ POST /api/contacts
exports.addContact = (req, res) => {
  const { name, email, phone, address } = req.body;
  const profilePic = req.file ? req.file.path : null;

  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    address,
    profilePic,
  };

  contacts.push(newContact);
  res.status(201).json(newContact);
};

// ✏️ PUT /api/contacts/:id
exports.editContact = (req, res) => {
  const { id } = req.params;
  const index = contacts.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  const { name, email, phone, address } = req.body;

  contacts[index] = {
    ...contacts[index],
    name,
    email,
    phone,
    address,
  };

  res.json(contacts[index]);
};

// ❌ DELETE /api/contacts/:id
exports.deleteContact = (req, res) => {
  const { id } = req.params;
  const initialLength = contacts.length;

  contacts = contacts.filter(c => c.id !== id);

  if (contacts.length === initialLength) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  res.json({ message: 'Contact deleted successfully' });
};

// 📤 GET /api/contacts/export/csv
exports.exportContacts = (req, res) => {
  const parser = new Parser();
  const csv = parser.parse(contacts);

  fs.writeFileSync('contacts.csv', csv);
  res.download('contacts.csv');
};
