import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Clock,
  BookOpen,
  Award,
  ArrowLeft,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/cursos/$courseId")({
  head: () => ({
    meta: [
      { title: "Curso — FORBIN MultiEmpresas" },
    ],
  }),
  component: CourseDetailPage,
});

type Course = {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  instructor: string;
  duration_hours: number | null;
  category: string;
  price: number | null;
  level: string;
  total_lessons: number;
};

type Lesson = {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  duration_minutes: number | null;
  sort_order: number;
};

function CourseDetailPage() {
  const { courseId } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [enrolled, setEnrolled] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [showAllLessons, setShowAllLessons] = useState(false);
  const [certificate, setCertificate] = useState<{ id: string; certificate_code: string; issued_at: string } | null>(null);

  useEffect(() => {
    loadCourse();
  }, [courseId, user]);

  async function loadCourse() {
    setLoading(true);
    const [{ data: courseData }, { data: lessonData }] = await Promise.all([
      supabase.from("courses").select("*").eq("id", courseId).single(),
      supabase.from("lessons").select("*").eq("course_id", courseId).order("sort_order"),
    ]);

    if (courseData) setCourse(courseData as unknown as Course);
    const ls = (lessonData as unknown as Lesson[]) || [];
    setLessons(ls);
    if (ls.length > 0) setCurrentLesson(ls[0]);

    if (user) {
      const [{ data: enrollData }, { data: progressData }, { data: certData }] = await Promise.all([
        supabase.from("enrollments").select("id").eq("user_id", user.id).eq("course_id", courseId).maybeSingle(),
        supabase.from("lesson_progress").select("lesson_id").eq("user_id", user.id).eq("completed", true),
        supabase.from("certificates").select("*").eq("user_id", user.id).eq("course_id", courseId).maybeSingle(),
      ]);
      setEnrolled(!!enrollData);
      if (progressData) {
        setCompletedLessons(new Set(progressData.map((p: { lesson_id: string }) => p.lesson_id)));
      }
      if (certData) setCertificate(certData as unknown as { id: string; certificate_code: string; issued_at: string });
    }
    setLoading(false);
  }

  async function handleEnroll() {
    if (!user) {
      toast.error("Faça login para se matricular");
      navigate({ to: "/login" });
      return;
    }
    setEnrolling(true);
    const { error } = await supabase.from("enrollments").insert({ user_id: user.id, course_id: courseId });
    if (error) {
      toast.error("Erro ao se matricular");
    } else {
      setEnrolled(true);
      toast.success("Matrícula realizada com sucesso!");
    }
    setEnrolling(false);
  }

  async function toggleLessonComplete(lessonId: string) {
    if (!user || !enrolled) return;
    const isCompleted = completedLessons.has(lessonId);

    if (isCompleted) {
      await supabase.from("lesson_progress").delete().eq("user_id", user.id).eq("lesson_id", lessonId);
      setCompletedLessons((prev) => {
        const next = new Set(prev);
        next.delete(lessonId);
        return next;
      });
    } else {
      await supabase.from("lesson_progress").upsert({
        user_id: user.id,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
      });
      setCompletedLessons((prev) => new Set(prev).add(lessonId));

      // Check if all lessons completed
      const courseLessonIds = lessons.map((l) => l.id);
      const newCompleted = new Set(completedLessons).add(lessonId);
      const allDone = courseLessonIds.every((id) => newCompleted.has(id));
      if (allDone && !certificate) {
        await issueCertificate();
      }
    }
  }

  async function issueCertificate() {
    if (!user) return;
    const { data, error } = await supabase
      .from("certificates")
      .insert({ user_id: user.id, course_id: courseId })
      .select()
      .single();
    if (!error && data) {
      setCertificate(data as unknown as { id: string; certificate_code: string; issued_at: string });
      toast.success("🎓 Parabéns! Certificado FORBIN emitido!");
      // Mark enrollment as completed
      await supabase.from("enrollments").update({ completed_at: new Date().toISOString() }).eq("user_id", user.id).eq("course_id", courseId);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Curso não encontrado</p>
        <Button asChild variant="outline"><Link to="/cursos">Voltar aos cursos</Link></Button>
      </div>
    );
  }

  const isFree = course.price === null;
  const progressPercent = lessons.length > 0 ? Math.round((completedLessons.size / lessons.length) * 100) : 0;
  const displayedLessons = showAllLessons ? lessons : lessons.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border/40 bg-surface">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/cursos" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Voltar aos cursos
          </Link>
        </div>
      </div>

      {/* Course Hero */}
      <section className="relative border-b border-border/40">
        <div className="absolute inset-0 overflow-hidden">
          <img src={course.thumbnail_url || ""} alt="" className="h-full w-full object-cover opacity-15 blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-primary/20 text-primary border-primary/30">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
                {isFree ? (
                  <Badge className="bg-success/20 text-success border-success/30">Incluso na mensalidade</Badge>
                ) : (
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    R$ {course.price?.toFixed(2).replace(".", ",")}
                  </Badge>
                )}
              </div>
              <h1 className="font-display text-2xl font-bold sm:text-4xl">{course.title}</h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">{course.description}</p>
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {course.duration_hours}h de conteúdo</span>
                <span className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> {course.total_lessons} aulas</span>
                <span className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> Certificado FORBIN</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Instrutor: <span className="text-foreground font-medium">{course.instructor}</span></p>
            </div>

            {/* CTA Card */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-border/60 bg-card p-6 shadow-elevated">
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <img src={course.thumbnail_url || ""} alt={course.title} className="h-full w-full object-cover" />
                </div>

                {enrolled ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-semibold text-primary">{progressPercent}%</span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>
                    {currentLesson && (
                      <Button className="w-full rounded-full bg-primary text-primary-foreground shadow-gold" onClick={() => {}}>
                        <Play className="mr-2 h-4 w-4" fill="currentColor" />
                        Continuar assistindo
                      </Button>
                    )}
                    {certificate && (
                      <Button variant="outline" className="w-full rounded-full border-primary/40 text-primary">
                        <Download className="mr-2 h-4 w-4" />
                        Baixar Certificado
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {!isFree && (
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gradient-gold">R$ {course.price?.toFixed(2).replace(".", ",")}</p>
                        <p className="text-xs text-muted-foreground mt-1">pagamento único</p>
                      </div>
                    )}
                    <Button
                      className="w-full rounded-full bg-primary text-primary-foreground shadow-gold hover:bg-primary/90"
                      onClick={handleEnroll}
                      disabled={enrolling}
                    >
                      {enrolling ? "Matriculando..." : isFree ? "Começar agora — Grátis" : "Comprar e Começar"}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      <Award className="inline h-3 w-3 mr-1" />
                      Certificado FORBIN incluso
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons List */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="font-display text-xl font-bold mb-6">
          Conteúdo do curso <span className="text-muted-foreground font-normal text-base">({lessons.length} aulas)</span>
        </h2>

        <div className="space-y-2">
          {displayedLessons.map((lesson, i) => {
            const isCompleted = completedLessons.has(lesson.id);
            const isCurrent = currentLesson?.id === lesson.id;

            return (
              <button
                key={lesson.id}
                onClick={() => {
                  setCurrentLesson(lesson);
                  if (enrolled) toggleLessonComplete(lesson.id);
                }}
                className={`w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all hover:bg-accent/50 ${
                  isCurrent ? "border-primary/40 bg-accent/30" : "border-border/40"
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  isCompleted
                    ? "bg-success/20 text-success"
                    : isCurrent
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isCompleted ? "text-muted-foreground line-through" : ""}`}>
                    {lesson.title}
                  </p>
                  {lesson.description && (
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{lesson.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0 text-xs text-muted-foreground">
                  {lesson.duration_minutes && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {lesson.duration_minutes}min
                    </span>
                  )}
                  {!enrolled && <Lock className="h-3.5 w-3.5 text-muted-foreground/50" />}
                </div>
              </button>
            );
          })}
        </div>

        {lessons.length > 8 && (
          <Button
            variant="ghost"
            className="mt-4 w-full text-muted-foreground"
            onClick={() => setShowAllLessons(!showAllLessons)}
          >
            {showAllLessons ? (
              <><ChevronUp className="mr-2 h-4 w-4" /> Mostrar menos</>
            ) : (
              <><ChevronDown className="mr-2 h-4 w-4" /> Ver todas as {lessons.length} aulas</>
            )}
          </Button>
        )}

        {/* Certificate Section */}
        {certificate && (
          <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
            <Award className="mx-auto h-16 w-16 text-primary mb-4" />
            <h3 className="font-display text-2xl font-bold">Certificado FORBIN</h3>
            <p className="mt-2 text-muted-foreground">Parabéns pela conclusão do curso <strong>{course.title}</strong></p>
            <p className="mt-1 text-xs text-muted-foreground">Código: {certificate.certificate_code}</p>
            <p className="text-xs text-muted-foreground">Emitido em: {new Date(certificate.issued_at).toLocaleDateString("pt-BR")}</p>
            <Button className="mt-6 rounded-full bg-primary text-primary-foreground shadow-gold">
              <Download className="mr-2 h-4 w-4" /> Baixar Certificado PDF
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
