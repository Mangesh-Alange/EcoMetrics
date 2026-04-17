"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  BookOpen,
  TrendingUp,
  Clock,
  Target,
  ArrowRight,
  User,
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

interface EnrolledCourse {
  id: string;
  title: string;
  progress: number;
  completed: boolean;
  duration: string;
}

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    avgProgress: 0,
  });

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (user) {
      fetchDashboardData(user);
    }
  }, [isLoaded, isSignedIn, user]);

  const fetchDashboardData = async (clerkUser: any) => {
    if (!clerkUser?.id) return;
    
    try {
      const res = await fetch(`/api/user/${clerkUser.id}`);
      if (res.ok) {
        const data = await res.json();
        const enrollments = data.user.enrollments.map((e: any) => ({
          id: e.course.id,
          title: e.course.title,
          progress: e.progress,
          completed: e.completed,
          duration: e.course.duration,
        }));

        const avgProgress =
          enrollments.length > 0
            ? Math.round(enrollments.reduce((sum: number, c: any) => sum + c.progress, 0) / enrollments.length)
            : 0;

        setCourses(enrollments.slice(0, 3));
        setStats({
          total: enrollments.length,
          completed: enrollments.filter((c: any) => c.completed).length,
          inProgress: enrollments.filter((c: any) => !c.completed).length,
          avgProgress,
        });
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Here's your learning dashboard. Keep up the great work!
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground text-sm">Courses Enrolled</p>
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground text-sm">In Progress</p>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-4xl font-bold text-purple-600">{stats.inProgress}</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground text-sm">Completed</p>
              <Target className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-4xl font-bold text-green-600">{stats.completed}</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground text-sm">Avg Progress</p>
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-4xl font-bold text-orange-600">{stats.avgProgress}%</p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Your Learning Path */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <Card className="border-none shadow-lg rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Your Learning Path
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No courses yet. <Link href="/courses" className="text-primary hover:underline">Start learning today!</Link>
                  </p>
                ) : (
                  courses.map((course, idx) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Link href={`/course/${course.id}`} className="font-semibold text-secondary hover:text-primary transition-colors">
                          {course.title}
                        </Link>
                        <Badge variant={course.completed ? "default" : "secondary"}>
                          {course.completed ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{course.duration}</span>
                          <span className="font-semibold">{course.progress}%</span>
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
                    </motion.div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <Card className="border-none shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/my-courses" className="w-full block">
                  <Button variant="outline" size="lg" className="w-full rounded-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View All Courses
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/courses" className="w-full block">
                  <Button variant="outline" size="lg" className="w-full rounded-full justify-start">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Explore New Courses
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/profile" className="w-full block">
                  <Button variant="outline" size="lg" className="w-full rounded-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl">Account</CardTitle>
              </CardHeader>
              <CardContent>
                <SignOutButton>
                  <Button variant="destructive" size="lg" className="w-full rounded-full">
                    Sign Out
                  </Button>
                </SignOutButton>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
