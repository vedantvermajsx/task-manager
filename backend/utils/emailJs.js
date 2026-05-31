import emailjs from "@emailjs/nodejs";

class EmailJs {
  constructor() {
    this.serviceId = process.env.EMAILJS_SERVICE_ID;
    this.templateId = process.env.EMAILJS_TEMPLATE_ID;
    this.publicKey = process.env.EMAILJS_PUBLIC_KEY;
    this.privateKey = process.env.EMAILJS_PRIVATE_KEY;

    emailjs.init({
    publicKey: this.publicKey,
    privateKey: this.privateKey,
  });
}

  async sendOtp(email, otp) {
    try {
      const templateParams = { email, otp };

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new EmailJs();