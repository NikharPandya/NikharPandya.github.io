const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();

  let mail = new FormData(form);
  sendMail(mail);
});

const senMail = (mail) => {
  fetch("http://nikharpandya.com/send", {
    method: "post",
    body: mail,
  }).then((Response) => {
    return Response.json;
  });
};
