# EmailJS Setup Guide for Contact Form

## 🚀 Quick Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Set Up Email Service
1. In your EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup wizard:
   - For Gmail: Allow EmailJS to access your Gmail account
   - Your service will get an ID like `service_xxxxxxx`

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Template Name:** `portfolio_contact`

**Subject:** `New Contact Form Submission - {{from_name}}`

**Content:**
```
Hello Sarim,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio website.
Reply directly to this email to respond to {{from_name}}.
```

4. Save the template and note the Template ID (e.g., `template_xxxxxxx`)

### 4. Get Your User ID
1. Go to "Account" → "General"
2. Copy your User ID (starts with user_)

### 5. Update Your Portfolio Code
Replace the placeholder values in `script.js`:

```javascript
// EmailJS Configuration
emailjs.init("YOUR_USER_ID_HERE"); // Replace with your actual User ID

// In the ContactForm class, update emailConfig:
this.emailConfig = {
    serviceID: 'YOUR_SERVICE_ID_HERE',     // e.g., service_xxxxxxx
    templateID: 'YOUR_TEMPLATE_ID_HERE',   // e.g., template_xxxxxxx
    userID: 'YOUR_USER_ID_HERE'            // e.g., user_xxxxxxx
};
```

### 6. Test Your Setup
1. Open your portfolio website
2. Fill out the contact form
3. Submit the form
4. Check your email (sarim.uk@outlook.com) for the message

## 📋 Example Configuration

After setup, your configuration should look like this:

```javascript
// EmailJS Configuration
emailjs.init("user_abc123xyz");

this.emailConfig = {
    serviceID: 'service_gmail123',
    templateID: 'template_contact456', 
    userID: 'user_abc123xyz'
};
```

## 🔧 Troubleshooting

### Form Not Sending Emails
- Check browser console for errors
- Verify all IDs are correctly copied from EmailJS dashboard
- Ensure EmailJS script is loaded before your script.js

### Emails Going to Spam
- Check your spam folder
- Add noreply@emailjs.com to your contacts
- Consider using your own domain email service

### Rate Limiting
- Free EmailJS accounts have limits (200 emails/month)
- For higher volumes, consider upgrading to paid plan

## 💡 Pro Tips

1. **Auto-Reply Setup:** Create a second template to send confirmation emails to form submitters
2. **Form Analytics:** EmailJS dashboard shows submission statistics
3. **Custom Styling:** Customize email templates with HTML formatting
4. **Security:** Your EmailJS keys are safe for client-side use
5. **Backup Plan:** Keep your direct email (sarim.uk@outlook.com) as fallback

## 🔒 Security Note

EmailJS is designed for client-side use, so it's safe to expose these IDs in your frontend code. However, you can set up domain restrictions in EmailJS dashboard for additional security.

---

Once configured, visitors to your portfolio can send you messages directly through the contact form, and you'll receive them at sarim.uk@outlook.com! 