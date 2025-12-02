

export default auth({
  providers: [
    resend({
      from: "Seu Nome <no-reply@seu-email.com>",
    }),
  ],
});
