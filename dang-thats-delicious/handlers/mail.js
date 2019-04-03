const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const promisify = require("es6-promisify");
const postmark = require("postmark");

const client = new postmark.ServerClient(process.env.MAIL_POSTMARK);

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/email/${filename}.pug`,
    options
  );
  const inlined = juice(html);
  return inlined;
};

exports.send = async options => {
  const HtmlBody = generateHTML(options.filename, options);
  const TextBody = htmlToText.fromString(HtmlBody);

  const mailOptions = {
    From: `Jake Fanelli <jxf6552@rit.edu>`,
    To: options.user.email,
    Subject: options.subject,
    HtmlBody,
    TextBody
  };
  const sendEmail = promisify(client.sendEmail, client);
  return sendEmail(mailOptions);
};
