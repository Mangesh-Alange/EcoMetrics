import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.enrollment.deleteMany();
  await prisma.user.deleteMany();
  await prisma.course.deleteMany();

  // Create courses
  const courses = await prisma.course.createMany({
    data: [
      {
        id: "course-1",
        title: "Professional CAD/CAM Training",
        description: "Master AutoCAD & SolidWorks with industry-standard methodology and practical assignments.",
        price: "₹8,000",
        duration: "45 Days",
        rating: 4.8,
        students: 450,
        category: "Software",
        image: "/images/cad.png",
      },
      {
        id: "course-2",
        title: "Hands-On Robotics & IoT",
        description: "Learn to design, build, and program robots and IoT systems with hands-on lab sessions.",
        price: "₹12,000",
        duration: "60 Days",
        rating: 4.9,
        students: 310,
        category: "Hardware",
        image: "/images/robotics.png",
      },
      {
        id: "course-3",
        title: "Circuit Design & PCB Layout",
        description: "Design robust electronic circuits and create professional-grade PCB layouts.",
        price: "₹5,000",
        duration: "30 Days",
        rating: 4.7,
        students: 220,
        category: "Hardware",
        image: "/images/pcb.png",
      },
      {
        id: "course-4",
        title: "Artificial Intelligence & Machine Learning",
        description: "Dive into AI/ML concepts with Python and real-world project implementations.",
        price: "₹18,000",
        duration: "90 Days",
        rating: 4.9,
        students: 180,
        category: "Software",
        image: "/images/ai.png",
      },
      {
        id: "course-5",
        title: "Advanced PLC & Industrial Automation",
        description: "Master Siemens S7-1200 PLC programming for industrial automation systems.",
        price: "₹10,000",
        duration: "40 Days",
        rating: 4.6,
        students: 150,
        category: "Hardware",
        image: "/images/plc.png",
      },
      {
        id: "course-6",
        title: "3D Printing & Prototyping",
        description: "Design and 3D print functional prototypes using industry-standard software.",
        price: "₹7,500",
        duration: "35 Days",
        rating: 4.8,
        students: 280,
        category: "Software",
        image: "/images/3dprint.png",
      },
    ],
  });

  console.log(`✅ Created ${courses.count} courses`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✅ Seed completed successfully");
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
