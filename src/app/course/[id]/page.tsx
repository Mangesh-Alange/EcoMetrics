"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  Star,
  CheckCircle2,
  BookOpen,
  Trophy,
  ArrowLeft,
  Share2,
  Download,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  rating: number;
  students: number;
  category: string;
  image?: string;
}

export default function CourseDetail() {
  const params = useParams();
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  const courseId = params.id as string;

  useEffect(() => {
    fetchCourse();
    if (isSignedIn && user) {
      checkEnrollment(user);
    }
  }, [courseId, isSignedIn, user]);

  const fetchCourse = async () => {
    try {
      const res = await fetch("/api/courses");
      if (res.ok) {
        const data = await res.json();
        const found = data.courses.find((c: any) => c.id === courseId);
        setCourse(found);
      }
    } catch (err) {
      console.error("Failed to fetch course:", err);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async (clerkUser: any) => {
    if (!clerkUser?.id) return;
    
    try {
      const res = await fetch(`/api/user/${clerkUser.id}`);
      if (res.ok) {
        const data = await res.json();
        const enrolled = data.user.enrollments.some(
          (e: any) => e.courseId === courseId
        );
        setIsEnrolled(enrolled);
      }
    } catch (err) {
      console.error("Failed to check enrollment:", err);
    }
  };

  const handleEnroll = async () => {
    if (!isSignedIn || !user?.id) {
      router.push("/sign-in");
      return;
    }

    setEnrolling(true);
    try {
      const email = user.primaryEmailAddress?.emailAddress;
      if (!email) {
        console.error("Email not found");
        setEnrolling(false);
        return;
      }

      console.log("Enrolling with:", { userId: user.id, email, courseId });

      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          email: email,
          courseId,
        }),
      });

      if (res.ok) {
        setIsEnrolled(true);
        // Redirect to my-courses after successful enrollment
        setTimeout(() => router.push("/my-courses"), 1000);
      } else {
        try {
          const error = await res.json();
          console.error(`Enrollment failed (${res.status}):`, error);
          alert(`Enrollment failed: ${error.error || "Unknown error"}`);
        } catch (parseErr) {
          console.error(`Enrollment failed (${res.status}): ${res.statusText}`);
          alert(`Enrollment failed: ${res.statusText}`);
        }
      }
    } catch (err) {
      console.error("Failed to enroll:", err);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Course not found</p>
          <Link href="/courses">
            <Button className="rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/courses">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
            </Button>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative w-full h-96 rounded-3xl overflow-hidden mb-8">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <Badge className="mb-4 text-base">{course.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{course.title}</h1>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="border-none shadow-lg rounded-3xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-secondary mb-4">About This Course</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {course.description}
                </p>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div whileHover={{ y: -5 }} className="p-4 bg-muted/20 rounded-2xl">
                <p className="text-muted-foreground text-sm mb-2">Duration</p>
                <div className="flex items-center gap-2 text-secondary font-bold">
                  <Clock className="h-4 w-4 text-primary" />
                  {course.duration}
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="p-4 bg-muted/20 rounded-2xl">
                <p className="text-muted-foreground text-sm mb-2">Rating</p>
                <div className="flex items-center gap-2 text-secondary font-bold">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  {course.rating}
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="p-4 bg-muted/20 rounded-2xl">
                <p className="text-muted-foreground text-sm mb-2">Students</p>
                <div className="flex items-center gap-2 text-secondary font-bold">
                  <Users className="h-4 w-4 text-primary" />
                  {course.students}+
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="p-4 bg-muted/20 rounded-2xl">
                <p className="text-muted-foreground text-sm mb-2">Certificate</p>
                <div className="flex items-center gap-2 text-secondary font-bold">
                  <Trophy className="h-4 w-4 text-primary" />
                  Yes
                </div>
              </motion.div>
            </div>

            {/* Course Curriculum */}
            <Card className="border-none shadow-lg rounded-3xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-secondary mb-6">
                  What You'll Learn
                </h3>
                <ul className="space-y-4">
                  {[
                    "Master industry-standard tools and techniques",
                    "Build real-world projects from scratch",
                    "Get hands-on experience with practical assignments",
                    "Receive personalized mentorship from experts",
                    "Earn a recognized certificate upon completion",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="border-none shadow-lg rounded-3xl sticky top-24">
              <CardContent className="p-8">
                {/* Price */}
                <div className="mb-6">
                  <p className="text-muted-foreground text-sm mb-2">Price</p>
                  <div className="text-4xl font-bold text-primary">{course.price}</div>
                  <p className="text-xs text-muted-foreground mt-1">One-time payment</p>
                </div>

                {/* Enroll Button */}
                {!isSignedIn ? (
                  <Link href="/sign-in">
                    <Button
                      size="lg"
                      className="w-full rounded-full mb-4 bg-blue-600 hover:bg-blue-700"
                    >
                      <BookOpen className="mr-2 h-4 w-4" /> Sign In to Enroll
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={handleEnroll}
                    disabled={isEnrolled || enrolling}
                    size="lg"
                    className="w-full rounded-full mb-4"
                  >
                    {isEnrolled ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Enrolled
                      </>
                    ) : enrolling ? (
                      "Enrolling..."
                    ) : (
                      <>
                        <BookOpen className="mr-2 h-4 w-4" /> Enroll Now
                      </>
                    )}
                  </Button>
                )}

                {/* Share & Download */}
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full"
                  >
                    <Share2 className="mr-2 h-4 w-4" /> Share Course
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full"
                  >
                    <Download className="mr-2 h-4 w-4" /> Brochure
                  </Button>
                </div>

                {/* Info */}
                <div className="border-t mt-6 pt-6 space-y-4">
                  <div className="text-sm">
                    <p className="font-semibold text-secondary mb-1">
                      Instructor
                    </p>
                    <p className="text-muted-foreground">EcoMetric Experts</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-secondary mb-1">
                      Language
                    </p>
                    <p className="text-muted-foreground">English & Marathi</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-secondary mb-1">Level</p>
                    <p className="text-muted-foreground">Beginner to Advanced</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
