/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

// AI agents: See /AI-PROJECT-MANIFEST.md for complete project context
import React, { useState, Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/shared/components/ui/toaster";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/features/auth/components/AuthContext";
import { ThemeProvider } from '@/shared/components/ThemeContext';
import { UserProvider } from '@/features/user-management/components/UserContext';
import { AppLayout } from "@/shared/components/layout/AppLayout";
import "@/styles/modern-css-features.css";
import { RouteErrorBoundary } from "@/shared/components/error/RouteErrorBoundary";
import { RouteLoader } from "@/shared/components/loading/SuspenseFallback";
import { SentryErrorBoundary } from "@/lib/sentry";

// Lazy load all page components for code splitting using feature-based imports
const Dashboard = lazy(() => import("@/features/dashboard").then(m => ({ default: m.Dashboard })));
const Settings = lazy(() => import("@/features/settings").then(m => ({ default: m.Settings })));
const AIChatBotLocal = lazy(() => import("@/features/chatbot").then(m => ({ default: m.AIChatBotLocal })));
const AIChatBotExternal = lazy(() => import("@/features/chatbot").then(m => ({ default: m.AIChatBotExternal })));
const LocalModelManagement = lazy(() => import("@/features/model-management").then(m => ({ default: m.LocalModelManagement })));
const TranslateLocal = lazy(() => import("@/features/translate-local").then(m => ({ default: m.default })));
const PromptLocal = lazy(() => import("@/features/prompt-local").then(m => ({ default: m.default })));
const SummaryLocalNew = lazy(() => import("@/features/summary-local-new").then(m => ({ default: m.default })));
const UserManagement = lazy(() => import("@/features/user-management").then(m => ({ default: m.UserManagement })));
const Login = lazy(() => import("@/features/auth").then(m => ({ default: m.Login })));
const Landing = lazy(() => import("@/features/dashboard").then(m => ({ default: m.Landing })));
const NotFound = lazy(() => import("./pages/not-found"));
const ChatDemo = lazy(() => import("@/features/dashboard/components/demo/ChatDemo"));
const UIPatternsDemo = lazy(() => import("@/features/dashboard/components/demo/ui-patterns-demo"));
const ExternalModelManagement = lazy(() => import("@/features/model-management").then(m => ({ default: m.ExternalModelManagement })));
const TermsOfService = lazy(() => import("@/features/dashboard/components/TermsOfService"));
const TextManipulation = lazy(() => import("@/features/text-manipulation").then(m => ({ default: m.TextManipulation })));

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-background dark:via-purple-950/10 dark:to-background">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-800 mx-auto"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground">Loading SaaS ChatBot AI</p>
            <p className="text-sm text-muted-foreground">Preparing your AI-powered chatbot platform...</p>
          </div>
        </div>
      </div>
    );
  }

  // Public routes that don't require authentication
  return (
    <RouteErrorBoundary>
      <Switch>
        <Route path="/ui-patterns">
          <Suspense fallback={<RouteLoader />}>
            <UIPatternsDemo />
          </Suspense>
        </Route>
        
        {/* Protected routes that require authentication */}
        {isAuthenticated ? (
          <AppLayout>
            <Switch>
              <Route path="/">
                <Suspense fallback={<RouteLoader />}>
                  <Dashboard />
                </Suspense>
              </Route>
              <Route path="/ai-chatbot-local">
                <Suspense fallback={<RouteLoader />}>
                  <AIChatBotLocal />
                </Suspense>
              </Route>
              <Route path="/ai-chatbot-external">
                <Suspense fallback={<RouteLoader />}>
                  <AIChatBotExternal />
                </Suspense>
              </Route>
              <Route path="/prompt-local">
                <Suspense fallback={<RouteLoader />}>
                  <PromptLocal />
                </Suspense>
              </Route>
              <Route path="/local-model-mgmt">
                <Suspense fallback={<RouteLoader />}>
                  <LocalModelManagement />
                </Suspense>
              </Route>
              <Route path="/translate-local">
                <Suspense fallback={<RouteLoader />}>
                  <TranslateLocal />
                </Suspense>
              </Route>
              <Route path="/summary-local">
                <Suspense fallback={<RouteLoader />}>
                  <SummaryLocalNew />
                </Suspense>
              </Route>
              <Route path="/summary-local-new">
                <Suspense fallback={<RouteLoader />}>
                  <SummaryLocalNew />
                </Suspense>
              </Route>
              <Route path="/settings">
                <Suspense fallback={<RouteLoader />}>
                  <Settings />
                </Suspense>
              </Route>
              <Route path="/user-management">
                <Suspense fallback={<RouteLoader />}>
                  <UserManagement />
                </Suspense>
              </Route>
              <Route path="/settings/user-management">
                <Suspense fallback={<RouteLoader />}>
                  <UserManagement />
                </Suspense>
              </Route>
              <Route path="/external-model-mgmt">
                <Suspense fallback={<RouteLoader />}>
                  <ExternalModelManagement />
                </Suspense>
              </Route>
              <Route path="/chat-demo">
                <Suspense fallback={<RouteLoader />}>
                  <ChatDemo />
                </Suspense>
              </Route>
              <Route path="/text-manipulation">
                <Suspense fallback={<RouteLoader />}>
                  <TextManipulation />
                </Suspense>
              </Route>
              <Route>
                <Suspense fallback={<RouteLoader />}>
                  <NotFound />
                </Suspense>
              </Route>
            </Switch>
          </AppLayout>
        ) : (
          /* Non-authenticated routes */
          <Switch>
            {showLogin ? (
              <Route>
                <Suspense fallback={<RouteLoader />}>
                  <Login 
                    onBack={() => setShowLogin(false)} 
                    isSignup={isSignup}
                  />
                </Suspense>
              </Route>
            ) : (
              <>
                <Route path="/terms-of-service">
                  <Suspense fallback={<RouteLoader />}>
                    <TermsOfService />
                  </Suspense>
                </Route>
                <Route path="/">
                  <Suspense fallback={<RouteLoader />}>
                    <Landing 
                      onShowLogin={() => {
                        setIsSignup(false);
                        setShowLogin(true);
                      }}
                      onShowSignup={() => {
                        setIsSignup(true);
                        setShowLogin(true);
                      }}
                    />
                  </Suspense>
                </Route>
              </>
            )}
            <Route>
              <Suspense fallback={<RouteLoader />}>
                <NotFound />
              </Suspense>
            </Route>
          </Switch>
        )}
      </Switch>
    </RouteErrorBoundary>
  );
}

function App() {
  return (
    <SentryErrorBoundary fallback={({ error, resetError }) => (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
        <div className="max-w-md mx-auto text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We've been notified about this error and will fix it soon.
          </p>
          <button
            onClick={resetError}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    )}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <UserProvider>
              <AuthProvider>
                  <Router />
              </AuthProvider>
            </UserProvider>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SentryErrorBoundary>
  );
}

export default App;
