"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Clock, Users, Star, CheckCircle2, ArrowRight, BookOpen, Trash2 } from "lucide-react";

interface EnrolledCourse {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  rating: number;
  students: number;
  category: string;
  image?: string;
  progress: number;
  completed: boolean;
}

export default function MyCoursesPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [unenrolling, setUnenrolling] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
  });

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (user) {
      fetchEnrollments(user);
    }
  }, [isLoaded, isSignedIn, user]);

  const fetchEnrollments = async (clerkUser: any) => {
    if (!clerkUser?.id) return;
    
    try {
      const res = await fetch(`/api/user/${clerkUser.id}`);
      if (res.ok) {
        const data = await res.json();
        const courses = data.user.enrollments.map((enrollment: any) => ({
          ...enrollment.course,
          progress: enrollment.progress,
          completed: enrollment.completed,
        }));

        setEnrollments(courses);
        setStats({
          total: courses.length,
          completed: courses.filter((c: any) => c.completed).length,
          inProgress: courses.filter((c: any) => !c.completed).length,
        });
      }
    } catch (err) {
      console.error("Failed to fetch enrollments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnenroll = async (courseId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user?.id) return;
    
    setUnenrolling(courseId);
    try {
      const res = await fetch("/api/enroll", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, courseId }),
      });

      if (res.ok) {
        setEnrollments(enrollments.filter((c) => c.id !== courseId));
        setStats({
          total: stats.total - 1,
          completed: enrollments.find((c) => c.id === courseId)?.completed ? stats.completed - 1 : stats.completed,
          inProgress: enrollments.find((c) => c.id === courseId)?.completed ? stats.inProgress : stats.inProgress - 1,
        });
      } else {
        const error = await res.json();
        alert(`Failed to unenroll: ${error.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Failed to unenroll:", err);
      alert("Failed to unenroll. Please try again.");
    } finally {
      setUnenrolling(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading your courses...</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary tracking-tight">My Courses</h1>
          <p className="mt-4 text-lg text-muted-foreground">Track your learning progress</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
            <p className="text-muted-foreground text-sm mb-2">Total Courses</p>
            <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
            <p className="text-muted-foreground text-sm mb-2">Completed</p>
            <p className="text-4xl font-bold text-green-600">{stats.completed}</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
            <p className="text-muted-foreground text-sm mb-2">In Progress</p>
            <p className="text-4xl font-bold text-purple-600">{stats.inProgress}</p>
          </motion.div>
        </div>

        {enrollments.length === 0 ? (
          <Card className="border-none shadow-lg rounded-3xl">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-bold text-secondary mb-2">No courses yet</h3>
              <p className="text-muted-foreground mb-6">Explore our courses and start learning today!</p>
              <Link href="/courses">
                <Button className="rounded-full">
                  Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrollments.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={`/course/${course.id}`}>
                  <Card className="h-full border-none shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <Badge className="mb-2">{course.category}</Badge>
                        <h3 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {/* Progress Bar */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-semibold text-secondary">{course.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${course.progress}%` }}
                              transition={{ delay: 0.2, duration: 0.8 }}
                              className="h-full bg-primary"
                            />
                          </div>
                        </div>

                        {/* Course Info */}
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                          <div className="flex items-center gap-2 text-sm text-secondary">
                            <Clock className="h-4 w-4 text-primary" />
                            {course.duration}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-secondary">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            {course.rating}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-secondary">
                            <Users className="h-4 w-4 text-primary" />
                            {course.students}+
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            {course.completed ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <span className="text-green-600 font-semibold">Completed</span>
                              </>
                            ) : (
                              <span className="text-muted-foreground">In Progress</span>
                            )}
                          </div>
                        </div>

                        {/* Unenroll Button */}
                        <div className="pt-4 border-t">
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-full rounded-full"
                            disabled={unenrolling === course.id}
                            onClick={(e) => handleUnenroll(course.id, e)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {unenrolling === course.id ? "Unenrolling..." : "Unenroll"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
