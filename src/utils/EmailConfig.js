import emailjs from '@emailjs/browser';
import { useEffect } from 'react';

const SendEmail = async (updatedEmployee, toEmail, message, title) => {
  try {
    const templateParams = {
      message: message,
      empName: updatedEmployee,
      toEmail: toEmail,
      title: title
    };

    const response = await emailjs.send('service_8qh42ww', 'template_t4ghl3i', templateParams, 'pQRJ4zETIeTQcXDrP');

    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const EmailConfig = ({ updatedEmployee, toEmail, message, title }) => {
  useEffect(() => {
    SendEmail(updatedEmployee, toEmail, message, title);
    console.log('function called');
  }, [updatedEmployee, toEmail, message, title]);

  return null;
};

export default EmailConfig;
