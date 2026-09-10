-- ==============================================================================
-- NEXUS — AI STUDENT OPERATING SYSTEM
-- Database Migration 02: Row-Level Security (RLS) Policies
-- ==============================================================================
-- Enforces that users can ONLY SELECT, INSERT, UPDATE, DELETE rows where user_id = auth.uid()
-- ==============================================================================

-- 1. Profiles & Preferences
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own profile"
    ON public.profiles FOR ALL
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

ALTER TABLE public.preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own preferences"
    ON public.preferences FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 2. Study Module
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their subjects"
    ON public.subjects FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage topics for their subjects"
    ON public.topics FOR ALL
    USING (EXISTS (SELECT 1 FROM public.subjects s WHERE s.id = subject_id AND s.user_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM public.subjects s WHERE s.id = subject_id AND s.user_id = auth.uid()));

ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their study sessions"
    ON public.study_sessions FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.study_materials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their study materials"
    ON public.study_materials FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.study_chunks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage study chunks"
    ON public.study_chunks FOR ALL
    USING (EXISTS (SELECT 1 FROM public.study_materials m WHERE m.id = material_id AND m.user_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM public.study_materials m WHERE m.id = material_id AND m.user_id = auth.uid()));

ALTER TABLE public.study_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their study progress"
    ON public.study_progress FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their exams"
    ON public.exams FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their assignments"
    ON public.assignments FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage quiz attempts"
    ON public.quiz_attempts FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 3. Fitness Module
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage workout plans"
    ON public.workout_plans FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage workouts"
    ON public.workouts FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage workout logs"
    ON public.workout_logs FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.body_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage body metrics"
    ON public.body_metrics FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.nutrition_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage nutrition logs"
    ON public.nutrition_logs FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Exercises is public read, admin write
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can view exercises"
    ON public.exercises FOR SELECT
    USING (auth.role() = 'authenticated');

-- 4. Finance Module
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage budgets"
    ON public.budgets FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage transactions"
    ON public.transactions FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.financial_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage financial goals"
    ON public.financial_goals FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.recurring_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage recurring transactions"
    ON public.recurring_transactions FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 5. Productivity Module
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage tasks"
    ON public.tasks FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.subtasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage subtasks"
    ON public.subtasks FOR ALL
    USING (EXISTS (SELECT 1 FROM public.tasks t WHERE t.id = task_id AND t.user_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM public.tasks t WHERE t.id = task_id AND t.user_id = auth.uid()));

ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage calendar events"
    ON public.calendar_events FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage habits"
    ON public.habits FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage habit logs"
    ON public.habit_logs FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.pomodoro_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage pomodoro sessions"
    ON public.pomodoro_sessions FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 6. SkillForge Module
ALTER TABLE public.career_paths ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can view career paths"
    ON public.career_paths FOR SELECT
    USING (auth.role() = 'authenticated');

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can view skills"
    ON public.skills FOR SELECT
    USING (auth.role() = 'authenticated');

ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their skills"
    ON public.user_skills FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.learning_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can view learning resources"
    ON public.learning_resources FOR SELECT
    USING (auth.role() = 'authenticated');

ALTER TABLE public.coding_challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can view coding challenges"
    ON public.coding_challenges FOR SELECT
    USING (auth.role() = 'authenticated');

ALTER TABLE public.challenge_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their challenge attempts"
    ON public.challenge_attempts FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their projects"
    ON public.projects FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage project milestones"
    ON public.project_milestones FOR ALL
    USING (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.user_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.user_id = auth.uid()));

ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their interview sessions"
    ON public.interview_sessions FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 7. Navigation Module
ALTER TABLE public.saved_places ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage saved places"
    ON public.saved_places FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.travel_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage travel history"
    ON public.travel_history FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 8. AI Core
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their AI conversations"
    ON public.ai_conversations FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage messages in their conversations"
    ON public.ai_messages FOR ALL
    USING (EXISTS (SELECT 1 FROM public.ai_conversations c WHERE c.id = conversation_id AND c.user_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM public.ai_conversations c WHERE c.id = conversation_id AND c.user_id = auth.uid()));

ALTER TABLE public.ai_memories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their AI memories"
    ON public.ai_memories FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.ai_tool_calls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage tool calls in their conversations"
    ON public.ai_tool_calls FOR ALL
    USING (EXISTS (SELECT 1 FROM public.ai_conversations c WHERE c.id = conversation_id AND c.user_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM public.ai_conversations c WHERE c.id = conversation_id AND c.user_id = auth.uid()));

-- 9. Notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their notifications"
    ON public.notifications FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

