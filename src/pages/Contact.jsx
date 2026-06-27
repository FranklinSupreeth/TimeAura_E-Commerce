import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Replace these with your actual EmailJS IDs
    emailjs.sendForm(
      'YOUR_SERVICE_ID', 
      'YOUR_TEMPLATE_ID', 
      form.current, 
      'YOUR_PUBLIC_KEY'
    )
    .then((result) => {
        setIsSent(true);
        setIsSending(false);
        form.current.reset();
        setTimeout(() => setIsSent(false), 5000);
    }, (error) => {
        console.log(error.text);
        setIsSending(false);
        alert("Gold standard service requires a stable connection. Please try again.");
    });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="py-20 bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-400 mb-4 font-bold">Concierge Service</p>
          <h1 className="text-5xl font-serif text-zinc-900 mb-6">Contact Our Atelier</h1>
          <p className="text-zinc-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Whether you are seeking a rare vintage piece or require maintenance on your current collection, 
            our horology experts are at your disposal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left: Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Visit Us</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="text-zinc-400" size={20} />
                  <p className="text-sm text-zinc-600 leading-relaxed uppercase tracking-wider">
                    Heritage House, 4th Floor, Lavelle Road<br />
                    Bengaluru, Karnataka 560001
                  </p>
                </div>
                <div className="flex gap-4 italic text-zinc-400 text-xs">
                  * Visits are by appointment only to ensure personalized attention.
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Direct Lines</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-zinc-600">
                  <Phone size={18} className="text-zinc-400" />
                  <span className="tracking-widest">+91 80 4567 8900</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-zinc-600">
                  <Mail size={18} className="text-zinc-400" />
                  <span className="tracking-widest">concierge@timeaura.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: EmailJS Form */}
          <div className="bg-white p-8 md:p-12 border border-zinc-100 shadow-sm relative">
            {isSent && (
              <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center animate-in fade-in duration-500">
                <CheckCircle2 size={48} className="text-zinc-900 mb-4" />
                <h3 className="text-xl font-serif">Message Received</h3>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mt-2">We will respond within 24 hours.</p>
              </div>
            )}

            <form ref={form} onSubmit={sendEmail} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-400 block mb-3">Full Name</label>
                  <input 
                    type="text" name="user_name" required
                    className="w-full border-b border-zinc-200 py-2 outline-none focus:border-black transition-colors bg-transparent"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-400 block mb-3">Email Address</label>
                  <input 
                    type="email" name="user_email" required
                    className="w-full border-b border-zinc-200 py-2 outline-none focus:border-black transition-colors bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-400 block mb-3">Subject</label>
                <select name="subject" className="w-full border-b border-zinc-200 py-2 outline-none focus:border-black transition-colors bg-transparent text-sm">
                  <option>General Inquiry</option>
                  <option>Watch Servicing</option>
                  <option>Sourcing Request</option>
                  <option>Appointment Booking</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-400 block mb-3">Message</label>
                <textarea 
                  name="message" rows="4" required
                  className="w-full border-b border-zinc-200 py-2 outline-none focus:border-black transition-colors bg-transparent resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSending}
                className="w-full bg-zinc-900 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all flex items-center justify-center gap-3 disabled:bg-zinc-300"
              >
                {isSending ? 'Sending...' : <><Send size={14} /> Send Inquiry</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;