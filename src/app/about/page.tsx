import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, BookOpen, Clock, Target, ShieldCheck, HeartPulse, Trophy } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function About() {
  const stats = [
    { label: "Students Trained", value: "5,000+", icon: Users },
    { label: "Courses Offered", value: "50+", icon: BookOpen },
    { label: "Hours of Practical", value: "10,000+", icon: Clock },
    { label: "Years Experience", value: "6+", icon: GraduationCap },
  ];

  const values = [
    { title: "Practical Excellence", description: "Beyond theory. We focus on what actually works in the industrial environment.", icon: Target },
    { title: "Expert Instruction", description: "Our trainers are seasoned professionals with over a decade of industry expertise.", icon: Trophy },
    { title: "Student Success", description: "Your career growth is our metric of success. We provide real mentor support.", icon: HeartPulse },
  ];



  return (
    <div className="py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <Badge>Our Story</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-secondary tracking-tight">EcoMetric Engineering <span className="text-primary italic">Solutions</span></h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Founded in 2018 in the heart of Pune&apos;s engineering hub, 
              EcoMetric EES began with a single mission: to provide 
              practical, hands-on training to engineering students 
              and professionals who want to master real-world tools.
            </p>
            <div className="flex items-center gap-6 p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shrink-0">
                    <GraduationCap className="h-8 w-8" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-secondary">A Heritage of Excellence</h3>
                    <p className="text-muted-foreground">Pune&apos;s leading technical training destination.</p>
                </div>
            </div>
          </div>
          <div className="relative group">
                <div className="aspect-video relative rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl skew-y-1 transform group-hover:skew-y-0 transition-transform duration-700">
                     <img 
                      src="/images/hero.png" 
                      alt="EcoMetric Training Lab" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
                </div>
               <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
               <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
            {stats.map((stat, idx) => (
                <div key={idx} className="text-center p-8 bg-muted/20 rounded-3xl border border-muted hover:border-primary/20 transition-colors">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-secondary">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
            ))}
        </div>

        {/* Values Section */}
        <div className="text-center mb-16 space-y-4">
             <Badge variant="outline">Our Values</Badge>
             <h2 className="text-3xl md:text-4xl font-bold text-secondary">What We Stand For</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {values.map((v, idx) => (
                <Card key={idx} className="border-none shadow-lg rounded-[2.5rem] bg-white p-8 hover:shadow-xl transition-all">
                    <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                        <v.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl font-bold text-secondary mb-4">{v.title}</CardTitle>
                    <p className="text-muted-foreground leading-relaxed">{v.description}</p>
                </Card>
            ))}
        </div>


      </div>
    </div>
  );
}
