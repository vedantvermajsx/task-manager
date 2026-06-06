import emailjs from "@emailjs/nodejs";
import dotenv from "dotenv";
dotenv.config();

class EmailJs {
  constructor() {
    this.serviceId = process.env.EMAILJS_SERVICE_ID;
    this.templateId = process.env.EMAILJS_TEMPLATE_ID;
    this.publicKey = process.env.EMAILJS_PUBLIC_KEY;
    this.privateKey = process.env.EMAILJS_PRIVATE_KEY;
    this.welcomeTemplateId = process.env.EMAILJS_WELCOME_TEMPLATE_ID;

    emailjs.init({
    publicKey: this.publicKey,
    privateKey: this.privateKey,
  });
}

async sendWelcomeMail(email,name){
  try {
    const templateParams = { email,name};

    const response = await emailjs.send(
      this.serviceId,
      this.welcomeTemplateId,
      templateParams
    );

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
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