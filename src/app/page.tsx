"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Clock, Star, Users, Brain, Target, ShieldCheck, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Course {
  id: string;
  title: string;
  price: string;
  duration: string;
  rating: number;
  students: number;
  image?: string;
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        if (res.ok) {
          const data = await res.json();
          // Get first 4 courses for featured section
          setCourses(data.courses.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/coming-soon", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      if (res.ok) setSuccess(true);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const features = [
    {
      title: "Expert-Led Workshops",
      description: "Learn from industry specialists with 10+ years of experience in CAD/CAM and Robotics.",
      icon: Users,
    },
    {
      title: "Hands-On Practical Learning",
      description: "Get real-world experience with our state-of-the-art laboratory and equipment.",
      icon: Target,
    },
    {
      title: "Industry-Standard Curriculum",
      description: "Courses designed to meet the current demands of the engineering sectors.",
      icon: Target,
    },
  ];

  const testimonials = [
    {
      name: "Amit Deshmukh",
      role: "Mechanical Engineer",
      text: "The CAD/CAM workshop was incredibly helpful. I landed a job within a month of completing the course!",
      stars: 5,
    },
    {
      name: "Sneha Patil",
      role: "Student, COEP",
      text: "The Hands-On Robotics session was a game-changer. The instructors really know their stuff.",
      stars: 5,
    },
  ];

  return (
    <div className="flex flex-col gap-0 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-primary/10 via-background to-transparent pt-20">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-8"
          >
            <Badge className="mb-4 text-sm px-4 py-1" variant="outline">#1 Engineering Training Pune</Badge>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-secondary leading-[1.1]">
              Master Engineering <br />
              Through <span className="text-primary italic">Hands-On Experience</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
              Empowering the next generation of engineers with practical skills, 
              industry-standard tools, and expert mentorship since 2018.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/courses">
                <Button size="lg" className="rounded-full px-8 h-14 text-lg font-semibold shadow-lg">
                  Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg font-semibold">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[3.5rem] overflow-hidden border-8 border-white shadow-2xl skew-y-1 transform group">
                <img 
                  src="/images/hero.png" 
                  alt="Engineering Training" 
                  className="w-full h-[550px] object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
            </div>
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <Badge variant="outline">Our Curriculum</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-secondary tracking-tight">Popular Courses</h2>
            </div>
            <Link href="/courses">
              <Button variant="link" className="text-primary font-bold text-lg group">
                View All Courses <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coursesLoading ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                Loading courses...
              </div>
            ) : courses.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No courses available yet.
              </div>
            ) : (
              courses.map((course, idx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-muted hover:shadow-2xl transition-all h-full flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img src={course.image || "/images/default-course.png"} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm">{course.price}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-secondary mb-2">{course.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                      <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</div>
                      <div className="flex items-center gap-1"><Users className="h-3 w-3" /> {course.students}+ Students</div>
                    </div>
                    <Link href="/courses" className="mt-auto">
                      <Button className="w-full rounded-2xl h-12">Enroll Now</Button>
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Why Choose Us?</h2>
            <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground max-w-xl mx-auto text-lg mt-4">
              We focus on practical education that bridges the gap between academics and industry requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-3xl border bg-card hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary to-[#1e40af] rounded-[3rem] p-12 md:p-24 text-white overflow-hidden relative shadow-2xl">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Badge className="bg-white/10 text-white border-white/20 px-4 py-1">COMING SOON!</Badge>
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                  Access Our Recorded Course Library
                </h2>
                <p className="text-lg text-blue-100 max-w-md">
                  Get early access to our extensive library of recorded lectures and digital resources. Sign up for the waitlist!
                </p>
                <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-100/50 rounded-full h-14 px-6 focus:ring-primary shadow-inner"
                  />
                  <Button disabled={loading} type="submit" className="bg-white text-secondary hover:bg-blue-50 rounded-full h-14 px-10 text-lg font-bold">
                    {loading ? "Joining..." : "Join Waitlist"}
                  </Button>
                </form>
                {success && <p className="text-green-300 font-medium">✨ You&apos;ve been added to the waitlist!</p>}
              </div>
               <div className="hidden md:flex justify-center relative">
                  <div className="w-full h-[400px] rounded-[3rem] overflow-hidden border-4 border-white/20 shadow-2xl relative">
                     <img 
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60" 
                      alt="Digital Library" 
                      className="w-full h-full object-cover blur-[1px] brightness-75" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <BookOpen className="h-32 w-32 text-white/40 animate-pulse" />
                    </div>
                  </div>
               </div>
            </div>
            {/* Background design */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {testimonials.map((t, idx) => (
                    <Card key={idx} className="bg-muted/30 border-none rounded-3xl p-8 hover:shadow-lg transition-all text-left">
                        <div className="flex gap-1 mb-4 text-yellow-500">
                             {[...Array(t.stars)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                        </div>
                        <p className="text-lg italic text-muted-foreground mb-6">&quot;{t.text}&quot;</p>
                        <div className="flex items-center gap-4">
                            <img 
                                src={idx === 0 ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"} 
                                alt={t.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" 
                            />
                            <div>
                                <h4 className="font-bold text-secondary">{t.name}</h4>
                                <p className="text-sm text-muted-foreground">{t.role}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
