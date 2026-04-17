"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Star, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export default function Courses() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        if (res.ok) {
          const data = await res.json();
          setCourses(data.courses);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="py-24 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-16">
          <Badge className="mb-4">Our Curriculum</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary tracking-tight">Professional Engineering Courses</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Specially designed courses to help engineers acquire practical, 
            job-ready skills in the most in-demand fields.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <p className="text-lg text-muted-foreground">Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <p className="text-lg text-muted-foreground">No courses available yet.</p>
            </div>
          ) : (
            courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full border-none shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-shadow group flex flex-col">
                  <div className="aspect-video relative overflow-hidden group">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-secondary/20" />
                  </div>
                  <CardHeader className="p-6 pb-2">
                    <Badge variant="outline" className="w-fit mb-4">{course.category}</Badge>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2 space-y-6 flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-secondary font-medium">
                        <Clock className="h-4 w-4 text-primary" /> {course.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-secondary font-medium">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" /> {course.rating} (Rating)
                      </div>
                      <div className="flex items-center gap-2 text-sm text-secondary font-medium">
                        <Users className="h-4 w-4 text-primary" /> {course.students}+ Students
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-2xl font-bold text-primary">{course.price}</span>
                      <span className="text-xs text-muted-foreground block">One-time payment</span>
                    </div>
                    <Link href={`/course/${course.id}`}>
                      <Button className="rounded-full px-6">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
