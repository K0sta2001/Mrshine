import axios from "axios";

const sendEmail = (apiKey, to, subject, from, bodyHtml) => {
  const apiUrl = "https://api.elasticemail.com/v2/email/send";

  const emailData = {
    apikey: apiKey,
    to: to,
    from: from,
    subject: subject,
    body_html: bodyHtml,
  };

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  return new Promise((resolve, reject) => {
    axios
      .post(apiUrl, emailData, { headers: headers })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { sendEmail };
