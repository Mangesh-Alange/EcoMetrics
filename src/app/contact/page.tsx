"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.ok) setSuccess(true);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const faqs = [
    {
      q: "Where is the workshop located?",
      a: "Our training center is located in Narhe, Pune, Maharashtra. We have state-of-the-art facilities for hands-on learning.",
    },
    {
      q: "Are these courses certified?",
      a: "Yes, all our professional engineering courses come with a certificate of completion recognized by our partner companies.",
    },
    {
       q: "Can I join weekend batches?",
       a: "Yes, we offer both weekday and weekend batches to accommodate students and working professionals.",
    }
  ];

  return (
    <div className="py-24 bg-muted/10 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge>Contact Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary tracking-tight">Need Help? Let&apos;s Connect</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have questions about our courses or workshops? 
            Fill out the form below or reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
          {/* Contact Details & Info */}
          <div className="space-y-10">
            <div className="space-y-6">
                <Card className="border-none shadow-md rounded-3xl bg-white p-2">
                    <CardHeader className="flex flex-row items-center gap-4 p-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <Mail className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xl font-bold text-secondary">ecometric2023@gmail.com</p>
                            <p className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">Email Us</p>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="border-none shadow-md rounded-3xl bg-white p-2">
                    <CardHeader className="flex flex-row items-center gap-4 p-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <Phone className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xl font-bold text-secondary">9689525659</p>
                            <p className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">Phone Number</p>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="border-none shadow-md rounded-3xl bg-white p-2">
                    <CardHeader className="flex flex-row items-center gap-4 p-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xl font-bold text-secondary">EES, Indrayani Nagar, Bhosari, Pune - 411039</p>
                            <p className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">Our Location</p>
                        </div>
                    </CardHeader>
                </Card>
            </div>

            <div className="space-y-4">
              <div className="bg-primary/20 p-6 rounded-3xl mb-8 w-fit">
                <MessageSquare className="h-10 w-10 text-primary" />
              </div>
              <Accordion className="w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border-none mb-4 bg-white px-6 rounded-3xl shadow-sm">
                    <AccordionTrigger className="text-secondary font-semibold hover:no-underline">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-secondary p-8 md:p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden"
          >
            <h2 className="text-3xl font-bold mb-8">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
               <div className="space-y-2">
                  <Label htmlFor="name" className="text-blue-100">Full Name</Label>
                  <Input id="name" name="name" placeholder="Your name" required className="bg-white/10 border-white/20 h-14 rounded-2xl focus:ring-primary focus:border-primary text-white placeholder:text-blue-200/50" />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-100">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="email@example.com" required className="bg-white/10 border-white/20 h-14 rounded-2xl focus:ring-primary focus:border-primary text-white placeholder:text-blue-200/50" />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="subject" className="text-blue-100">Subject</Label>
                  <Input id="subject" name="subject" placeholder="What is this about?" required className="bg-white/10 border-white/20 h-14 rounded-2xl focus:ring-primary focus:border-primary text-white placeholder:text-blue-200/50" />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="message" className="text-blue-100">Message</Label>
                  <Textarea id="message" name="message" placeholder="How can we help?" required className="bg-white/10 border-white/20 min-h-[150px] rounded-2xl focus:ring-primary focus:border-primary text-white placeholder:text-blue-200/50" />
               </div>
               <Button size="lg" disabled={loading || success} className="w-full bg-white text-secondary hover:bg-blue-50 h-14 rounded-3xl text-lg font-bold">
                 {loading ? "Sending..." : success ? "Message Sent!" : "Send Message"} <Send className="ml-2 h-5 w-5" />
               </Button>
            </form>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-24 rounded-[3.5rem] overflow-hidden border-8 border-white shadow-xl h-[500px] bg-muted relative">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15124.960431327!2d73.834015!3d18.618035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b84f3e6a88b5%3A0xe5a3c6319808605c!2sBhosari%2C%20Pimpri-Chinchwad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v17119!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
        </div>
      </div>
    </div>
  );
}
