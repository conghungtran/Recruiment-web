"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Brain, 
  Loader2,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ProcessingStatus {
  cv_status: string;
  quiz_session: any | null;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export default function CVProcessingPage() {
  const params = useParams();
  const cvId = params.cvId as string;
  
  const [status, setStatus] = useState<ProcessingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch processing status
  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cv/${cvId}/processing-status`);
      const data = await response.json();
      
      if (data.success) {
        setStatus(data);
        
        // Update current step based on status
        const s = data.cv_status;
        if (s === 'checking') {
          setCurrentStep(2);
        } else if (s === 'approved' || s === 'quiz_ready') {
          setCurrentStep(3);
        } else if (s === 'rejected') {
          setCurrentStep(2);
        } else if (s === 'quiz_completed' || s === 'quiz_passed' || s === 'quiz_failed') {
          setCurrentStep(3);
        }

        // Stop polling on terminal statuses
        const terminal = ['rejected', 'quiz_completed', 'quiz_passed', 'quiz_failed'];
        if (terminal.includes(s) && pollingRef.current) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Error fetching status:", err);
      setError("Failed to fetch processing status");
    } finally {
      setLoading(false);
    }
  }, [cvId]);

  // Polling for status updates
  useEffect(() => {
    fetchStatus();
    
    // Poll every 3 seconds until terminal status reached
    if (!pollingRef.current) {
      pollingRef.current = setInterval(fetchStatus, 3000);
    }
    
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [fetchStatus]);

  const steps = [
    {
      id: 1,
      title: "Apply CV",
      icon: FileCheck,
      status: "done",
      description: "CV submitted successfully"
    },
    {
      id: 2,
      title: "Check CV",
      icon: Clock,
      status: status?.cv_status === 'checking' ? 'pending' : 
              ['approved','quiz_ready','quiz_completed','quiz_passed','quiz_failed'].includes(status?.cv_status || '') ? 'done' :
              status?.cv_status === 'rejected' ? 'rejected' : 'waiting',
      description: status?.cv_status === 'checking' ? "Analyzing your CV..." :
                   status?.cv_status === 'approved' ? "CV approved!" :
                   status?.cv_status === 'rejected' ? "CV did not meet requirements" :
                   ['quiz_ready','quiz_completed','quiz_passed','quiz_failed'].includes(status?.cv_status || '') ? "CV check completed" :
                   "Waiting to check..."
    },
    {
      id: 3,
      title: "Quiz",
      icon: Brain,
      status: status?.cv_status === 'quiz_ready' && status?.quiz_session ? 'ready' :
              status?.quiz_session?.status === 'in_progress' ? 'pending' :
              (status?.quiz_session?.status === 'completed' || ['quiz_completed','quiz_passed','quiz_failed'].includes(status?.cv_status || '')) ? 'done' : 'waiting',
      description: status?.cv_status === 'quiz_ready' && status?.quiz_session ? "Quiz is ready!" :
                   status?.quiz_session?.status === 'in_progress' ? "Taking quiz..." :
                   status?.cv_status === 'quiz_passed' ? "Quiz passed!" :
                   status?.cv_status === 'quiz_failed' ? "Quiz failed." :
                   (status?.quiz_session?.status === 'completed' || status?.cv_status === 'quiz_completed') ? "Quiz completed!" :
                   "Waiting for quiz..."
    }
  ];

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

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Application Processing</CardTitle>
              <p className="text-muted-foreground">
                Track the status of your job application
              </p>
            </CardHeader>
            <CardContent>
              {/* Timeline */}
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
                      {/* Step */}
                      <div className="flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.2 }}
                          className={`
                            w-16 h-16 rounded-full flex items-center justify-center mb-3
                            ${step.status === 'done' ? 'bg-green-100 text-green-600' :
                              step.status === 'pending' || step.status === 'ready' ? 'bg-blue-100 text-blue-600' :
                              step.status === 'rejected' ? 'bg-red-100 text-red-600' :
                              'bg-gray-100 text-gray-400'}
                          `}
                        >
                          {step.status === 'done' || step.status === 'ready' ? (
                            <CheckCircle2 className="w-8 h-8" />
                          ) : step.status === 'pending' ? (
                            <Loader2 className="w-8 h-8 animate-spin" />
                          ) : step.status === 'rejected' ? (
                            <AlertCircle className="w-8 h-8" />
                          ) : (
                            <step.icon className="w-8 h-8" />
                          )}
                        </motion.div>
                        <div className="text-center">
                          <p className="font-semibold text-sm">{step.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Arrow */}
                      {index < steps.length - 1 && (
                        <ChevronRight className="w-6 h-6 mx-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <Progress value={currentStep * 33.33} className="mb-6" />
              </div>

              {/* Quiz Section */}
              {status?.cv_status === 'quiz_ready' && status?.quiz_session && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <Card className="border-2 border-primary">
                    <CardContent className="pt-6">
                      <div className="text-center mb-6">
                        <Brain className="w-12 h-12 text-primary mx-auto mb-3" />
                        <h3 className="text-xl font-bold mb-2">Quiz is Ready!</h3>
                        <p className="text-muted-foreground">
                          You have {status.quiz_session.total_questions} questions to answer
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Time limit: {status.quiz_session.time_per_question} seconds per question
                        </p>
                      </div>
                      <Button
                        size="lg"
                        className="w-full"
                        onClick={() => {
                          window.location.href = `/quiz/${status.quiz_session.id}`;
                        }}
                      >
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Rejected Message */}
              {status?.cv_status === 'rejected' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <Card className="border-2 border-destructive">
                    <CardContent className="pt-6 text-center">
                      <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-3" />
                      <h3 className="text-xl font-bold mb-2">Application Not Approved</h3>
                      <p className="text-muted-foreground">
                        Unfortunately, your CV did not meet the requirements for this position.
                        Thank you for your interest.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Quiz Passed */}
              {status?.cv_status === 'quiz_passed' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <Card className="border-2 border-green-500">
                    <CardContent className="pt-6 text-center">
                      <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <h3 className="text-xl font-bold mb-2">Congratulations! You passed the quiz</h3>
                      <p className="text-muted-foreground">
                        Our team will contact you soon with the next steps.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Quiz Failed */}
              {status?.cv_status === 'quiz_failed' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <Card className="border-2 border-amber-500">
                    <CardContent className="pt-6 text-center">
                      <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                      <h3 className="text-xl font-bold mb-2">Quiz Result</h3>
                      <p className="text-muted-foreground">
                        Thank you for your time. Unfortunately, you did not pass the quiz. We encourage you to apply again in the future.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
