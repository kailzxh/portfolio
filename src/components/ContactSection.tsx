import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // or from 'gatsby' if using Gatsby

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formDataWithFormName = new URLSearchParams({
      'form-name': 'contact',
      ...formData
    }).toString();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formDataWithFormName
    })
      .then(() => navigate("/thank-you/"))
      .catch((error) => alert(error));
  };

  return (
    <section className="contact">
      <div className="container">
        <h2 className="h2" id="contact">Send Message</h2>
        <div className="contact-content">
          <div className="contact-textbox">
            <strong className="hire-alert">
              <span className="indicator"></span>
              Available for hire
            </strong>
            <p className="contact-text">
              As a software engineer, I construct web interfaces and design systems with a special love for accessibility and performance. I tend to code things from scratch and enjoy bringing ideas to life.
            </p>
          </div>

          <form
            name="contact"
            method="post"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="contact-form"
          >
            <input type="hidden" name="form-name" value="contact" />
            
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                inputMode="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="message">How can I help you?</label>
              <textarea 
                name="message" 
                id="message" 
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-cta">Send</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;