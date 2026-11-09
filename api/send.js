const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { to_email, subject, body, sender_user, sender_pass } = req.body;

    if (!to_email || !subject || !body || !sender_user || !sender_pass) {
      return res.status(400).json({ error: 'Field tidak lengkap' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: sender_user,
        pass: sender_pass
      }
    });

    await transporter.sendMail({
      from: `"Report Bot" <${sender_user}>`,
      to: to_email,
      subject: subject,
      text: body
    });

    return res.status(200).json({ success: true, message: 'Sent!' });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
           }
