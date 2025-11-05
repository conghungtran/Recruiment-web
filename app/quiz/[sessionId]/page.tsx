"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import ProctoringGuard from "@/components/proctoring-guard";

interface Question {
  id: number;
  question: string;
  order: number;
  answer: string | null;
}

interface QuizSession {
  id: number;
  cv_id: number;
  status: string;
  total_questions: number;
  time_per_question: number;
  started_at: string | null;
}

interface QuizData {
  session: QuizSession;
  questions: Question[];
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;
  
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoSubmitRef = useRef<boolean>(false);

  // Fetch quiz data
  const fetchQuizData = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/quiz/session/${sessionId}`);
      const data = await response.json();
      
      if (data.success) {
        setQuizData(data);
        setTimeLeft(data.session.time_per_question);
        
        // Pre-fill answers if they exist
        const existingAnswers: Record<number, string> = {};
        data.questions.forEach((q: Question) => {
          if (q.answer) {
            existingAnswers[q.id] = q.answer;
          }
        });
        setAnswers(existingAnswers);
        
        // Check if quiz is already in progress
        if (data.session.status === 'in_progress') {
          setQuizStarted(true);
        } else if (data.session.status === 'completed') {
          setCompleted(true);
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Error fetching quiz:", err);
      setError("Failed to load quiz");
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  // Start quiz
  const startQuiz = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/quiz/session/${sessionId}/start`, {
        method: "POST",
      });
      const data = await response.json();
      
      if (data.success) {
        setQuizStarted(true);
        setQuestionStartTime(Date.now());
      }
    } catch (err) {
      console.error("Error starting quiz:", err);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (!quizStarted || completed || !quizData) return;

    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      // Auto-submit when time runs out
      autoSubmitRef.current = true;
      handleNextQuestion();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, quizStarted, completed, quizData]);

  // Submit answer for current question
  const submitAnswer = async (questionId: number, answer: string, timeTaken: number) => {
    try {
      await fetch(`${BACKEND_URL}/api/quiz/question/${questionId}/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer: answer || "",
          time_taken: timeTaken,
        }),
      });
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  // Handle next question
  const handleNextQuestion = async () => {
    if (!quizData) return;

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const currentAnswer = answers[currentQuestion.id] || "";
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);

    // Submit current answer
    await submitAnswer(currentQuestion.id, currentAnswer, timeTaken);

    // Check if this is the last question
    if (currentQuestionIndex === quizData.questions.length - 1) {
      // Complete quiz
      await completeQuiz();
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(quizData.session.time_per_question);
      setQuestionStartTime(Date.now());
      autoSubmitRef.current = false;
    }
  };

  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeLeft(quizData!.session.time_per_question);
      setQuestionStartTime(Date.now());
    }
  };

  // Complete quiz
  const completeQuiz = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/quiz/session/${sessionId}/complete`, {
        method: "POST",
      });
      const data = await response.json();
      
      if (data.success) {
        setCompleted(true);
        // Redirect to a thank you page or back to processing page after a delay
        setTimeout(() => {
          router.push(`/cv-processing/${quizData?.session.cv_id}`);
        }, 3000);
      }
    } catch (err) {
      console.error("Error completing quiz:", err);
      setError("Failed to complete quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle answer change
  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="max-w-md">
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for completing the quiz. We will review your answers and get back to you soon.
              </p>
              <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
              <p className="text-sm text-muted-foreground mt-2">Redirecting...</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

if (!quizStarted && quizData) {
    return (
      <ProctoringGuard cvId={quizData.session.cv_id} enabled={false} minConfidence={0.5} fps={12}>
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader className="text-center">
                  <Brain className="w-16 h-16 text-primary mx-auto mb-4" />
                  <CardTitle className="text-3xl mb-2">Ready to Start?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <span className="text-muted-foreground">Total Questions</span>
                      <span className="font-bold text-lg">{quizData.session.total_questions}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <span className="text-muted-foreground">Time per Question</span>
                      <span className="font-bold text-lg">{quizData.session.time_per_question} seconds</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Instructions:</h3>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                      <li>Each question has a time limit of {quizData.session.time_per_question} seconds</li>
                      <li>Your answer will be auto-submitted when time runs out</li>
                      <li>You can navigate between questions using Previous/Next buttons</li>
                      <li>Make sure to answer all questions before completing the quiz</li>
                    </ul>
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={startQuiz}
                  >
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </ProctoringGuard>
    );
  }

  if (!quizData) return null;

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;
  const timePercentage = (timeLeft / quizData.session.time_per_question) * 100;

return (
    <ProctoringGuard cvId={quizData.session.cv_id} enabled={true} minConfidence={0.5} fps={12}>
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Question {currentQuestionIndex + 1} of {quizData.questions.length}
                    </h2>
                    <p className="text-sm text-muted-foreground">Session #{sessionId}</p>
                  </div>
                  <div className="text-center">
                    <div className={`flex items-center gap-2 text-2xl font-bold ${
                      timeLeft <= 10 ? 'text-destructive' : 'text-foreground'
                    }`}>
                      <Clock className="w-6 h-6" />
                      {timeLeft}s
                    </div>
                    <Progress 
                      value={timePercentage} 
                      className={`w-24 h-2 mt-2 ${timeLeft <= 10 ? '[&>div]:bg-destructive' : ''}`}
                    />
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Textarea
                      value={answers[currentQuestion.id] || ""}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      placeholder="Type your answer here..."
                      rows={8}
                      className="resize-none"
                    />

                    {autoSubmitRef.current && (
                      <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          Time's up! Your answer was automatically submitted.
                        </p>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0 || isSubmitting}
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>

                      <div className="text-sm text-muted-foreground">
                        {Object.keys(answers).length} / {quizData.questions.length} answered
                      </div>

                      <Button
                        onClick={handleNextQuestion}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : currentQuestionIndex === quizData.questions.length - 1 ? (
                          "Complete Quiz"
                        ) : (
                          <>
                            Next
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </ProctoringGuard>
  );
}
