import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function Curriculum() {
  const semesters = [
    {
      semester: 1,
      courses: [
        { code: "CSE1001", name: "Programming in C", credits: 4 },
        { code: "MAT1001", name: "Calculus", credits: 4 },
        { code: "PHY1001", name: "Physics", credits: 3 },
      ]
    },
    {
      semester: 2,
      courses: [
        { code: "CSE1002", name: "Object Oriented Programming", credits: 4 },
        { code: "MAT1002", name: "Linear Algebra", credits: 4 },
        { code: "CHE1001", name: "Chemistry", credits: 3 },
      ]
    }
  ];

  return (
    <Layout>
      <div className="animate-fade-in" data-testid="curriculum-container">
        <h1 className="text-4xl font-bold mb-8 gradient-text" data-testid="curriculum-title">My Curriculum</h1>

        <div className="space-y-6">
          {semesters.map((sem, index) => (
            <Card key={index} className="glass-effect p-6 border-white/10" data-testid={`semester-card-${index}`}>
              <h2 className="text-2xl font-semibold text-white mb-4" data-testid={`semester-title-${index}`}>Semester {sem.semester}</h2>
              <div className="grid grid-cols-1 gap-4">
                {sem.courses.map((course, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-lg flex items-center space-x-4" data-testid={`course-${index}-${idx}`}>
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white" data-testid={`course-name-${index}-${idx}`}>{course.name}</h3>
                      <p className="text-gray-400" data-testid={`course-code-${index}-${idx}`}>{course.code}</p>
                    </div>
                    <span className="text-cyan-400 font-semibold" data-testid={`course-credits-${index}-${idx}`}>{course.credits} Credits</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}