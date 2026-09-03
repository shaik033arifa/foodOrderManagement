import { useState } from "react";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };


  // =====================================================
  // HANDLE FORM SUBMIT
  // =====================================================

  const handleSubmit = (event) => {

    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });

  };


  return (

    <div className="contact-page">

      {/* =================================================
          HEADER
          ================================================= */}

      <div className="contact-header">

        <p className="contact-label">
          GET IN TOUCH
        </p>

        <h1>
          Contact Us 📞
        </h1>

        <p>
          Have a question or feedback? We'd love to hear from you.
        </p>

      </div>


      {/* =================================================
          CONTACT CONTENT
          ================================================= */}

      <div className="contact-container">


        {/* =================================================
            CONTACT INFORMATION
            ================================================= */}

        <div className="contact-info">

          <h2>
            We'd Love To Hear From You
          </h2>

          <p>
            Contact the TastyBite team for any questions,
            suggestions, or feedback.
          </p>


          <div className="contact-item">

            <span className="contact-icon">
              📧
            </span>

            <div>

              <h3>
                Email
              </h3>

              <p>
                support@tastybite.com
              </p>

            </div>

          </div>


          <div className="contact-item">

            <span className="contact-icon">
              📞
            </span>

            <div>

              <h3>
                Phone
              </h3>

              <p>
                +91 98765 43210
              </p>

            </div>

          </div>


          <div className="contact-item">

            <span className="contact-icon">
              📍
            </span>

            <div>

              <h3>
                Location
              </h3>

              <p>
                Hyderabad, India
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            CONTACT FORM
            ================================================= */}

        <div className="contact-form-container">

          <h2>
            Send Us a Message
          </h2>


          {submitted && (

            <div className="contact-success">

              Message sent successfully! 🎉

            </div>

          )}


          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >


            {/* NAME */}

            <div className="form-group">

              <label>
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            {/* MESSAGE */}

            <div className="form-group">

              <label>
                Message
              </label>

              <textarea
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              />

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="contact-submit-btn"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}


export default Contact;