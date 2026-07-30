const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});

app.use(express.static(path.join(__dirname), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
      return;
    }

    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
  }
}));
app.use(express.json({ limit: '40kb' }));

const dataFile = path.join(__dirname, 'data', 'contacts.json');

function loadContacts() {
  try {
    return JSON.parse(fs.readFileSync(dataFile, 'utf8')) || [];
  } catch (error) {
    return [];
  }
}

function saveContacts(contacts) {
  fs.writeFileSync(dataFile, JSON.stringify(contacts, null, 2), 'utf8');
}

function cleanValue(value) {
  return String(value || '').trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function hasValidLength(value, max = 1000) {
  return value.length > 0 && value.length <= max;
}

app.post('/api/contact', (req, res) => {
  const name = cleanValue(req.body.name);
  const phone = cleanValue(req.body.phone);
  const email = cleanValue(req.body.email).toLowerCase();
  const company = cleanValue(req.body.company);
  const subject = cleanValue(req.body.subject);
  const message = cleanValue(req.body.message);

  if (!name || !phone || !email || !subject || !message) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar completos.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'El correo electrÃ³nico no tiene un formato vÃ¡lido.' });
  }

  if (
    !hasValidLength(name, 120) ||
    !hasValidLength(phone, 40) ||
    !hasValidLength(subject, 180) ||
    !hasValidLength(message, 2000) ||
    (company && !hasValidLength(company, 120))
  ) {
    return res.status(400).json({ error: 'Uno o mÃ¡s campos exceden el tamaÃ±o permitido.' });
  }

  const contacts = loadContacts();
  const newContact = {
    id: Date.now(),
    name,
    phone,
    email,
    company: company || '',
    subject,
    message,
    receivedAt: new Date().toISOString()
  };

  contacts.push(newContact);
  saveContacts(contacts);

  return res.status(201).json({ success: true, data: newContact });
});

app.get('/api/contacts', (req, res) => {
  const contacts = loadContacts();
  return res.json(contacts);
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
