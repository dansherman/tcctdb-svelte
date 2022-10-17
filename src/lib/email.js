const SMTP2GO = "api-F5A99FFED2D811ECB33DF23C91C88F4E"

export async function email (to, subject, text_body) {
  let data = {
    api_key: SMTP2GO,
    to: [to],
    sender: "4 Community Theatre <info@4communitytheatre.org>",
    subject: subject,
    text_body: text_body,
  }
  let smtpResponse = await fetch("https://api.smtp2go.com/v3/email/send", {
    method: 'POST',
    headers: 
      {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  return smtpResponse
}