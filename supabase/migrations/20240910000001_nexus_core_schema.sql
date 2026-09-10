-- ==============================================================================
-- NEXUS — AI STUDENT OPERATING SYSTEM
-- Database Migration 01: Core Normalized Schema (44+ Tables)
-- ==============================================================================

-- Enable vector extension for RAG / notes embeddings
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. CORE MODULE
-- ==============================================================================

-- Profiles linked to auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    college_name TEXT,
    course_name TEXT,
    semester INTEGER DEFAULT 1,
    career_goal TEXT,
    technical_level TEXT CHECK (technical_level IN ('beginner', 'intermediate', 'advanced')),
    fitness_training_style TEXT CHECK (fitness_training_style IN ('gym', 'calisthenics', 'home')),
    fitness_goal TEXT CHECK (fitness_goal IN ('muscle_gain', 'fat_loss', 'strength', 'general_fitness')),
    monthly_budget NUMERIC(10, 2) DEFAULT 0,
    preferred_transit_mode TEXT DEFAULT 'public_transport',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User application preferences
CREATE TABLE IF NOT EXISTS public.preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
    enable_ai_suggestions BOOLEAN DEFAULT TRUE,
    daily_briefing_time TIME DEFAULT '08:00:00',
    pomodoro_work_duration INTEGER DEFAULT 25,
    pomodoro_break_duration INTEGER DEFAULT 5,
    currency TEXT DEFAULT 'INR',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 2. STUDY MODULE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT,
    color TEXT DEFAULT '#2563EB',
    icon TEXT DEFAULT 'BookOpen',
    target_attendance_percentage NUMERIC(5, 2) DEFAULT 75.00,
    total_classes INTEGER DEFAULT 0,
    attended_classes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.study_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
    topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
    duration_minutes INTEGER NOT NULL,
    notes TEXT,
    focus_rating INTEGER CHECK (focus_rating BETWEEN 1 AND 5),
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.study_materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    file_path TEXT,
    file_type TEXT CHECK (file_type IN ('pdf', 'markdown', 'text', 'doc')),
    file_size_bytes BIGINT,
    processing_status TEXT DEFAULT 'pending' CHECK (processing_status IN ('pending', 'uploading', 'extracting', 'embedding', 'completed', 'failed')),
    summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.study_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    material_id UUID NOT NULL REFERENCES public.study_materials(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    content TEXT NOT NULL,
    embedding vector(1536), -- compatible with standard OpenAI/gemini embeddings
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.study_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    completion_percentage NUMERIC(5, 2) DEFAULT 0,
    total_study_minutes INTEGER DEFAULT 0,
    last_studied_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, subject_id)
);

CREATE TABLE IF NOT EXISTS public.exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    exam_date TIMESTAMPTZ NOT NULL,
    total_marks NUMERIC(6, 2),
    obtained_marks NUMERIC(6, 2),
    weightage_percentage NUMERIC(5, 2),
    status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    deadline TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'submitted', 'graded')),
    grade TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
    material_id UUID REFERENCES public.study_materials(id) ON DELETE SET NULL,
    score NUMERIC(5, 2) NOT NULL,
    total_questions INTEGER NOT NULL,
    questions_data JSONB,
    attempted_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 3. FITNESS MODULE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.workout_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    training_style TEXT NOT NULL CHECK (training_style IN ('gym', 'calisthenics', 'home')),
    frequency_days_per_week INTEGER DEFAULT 4,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.workouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_id UUID REFERENCES public.workout_plans(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    target_muscle_groups TEXT[],
    scheduled_day_of_week INTEGER CHECK (scheduled_day_of_week BETWEEN 0 AND 6),
    estimated_duration_minutes INTEGER DEFAULT 45,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT CHECK (category IN ('gym', 'calisthenics', 'home')),
    muscle_group TEXT NOT NULL,
    equipment TEXT,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    instructions TEXT,
    alternative_exercise_id UUID REFERENCES public.exercises(id)
);

CREATE TABLE IF NOT EXISTS public.workout_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    workout_id UUID REFERENCES public.workouts(id) ON DELETE SET NULL,
    started_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    duration_minutes INTEGER,
    total_volume_kg NUMERIC(10, 2) DEFAULT 0,
    exercises_data JSONB, -- list of exercises, sets, reps, weights
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.body_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    logged_at DATE DEFAULT CURRENT_DATE,
    weight_kg NUMERIC(5, 2),
    body_fat_percentage NUMERIC(4, 2),
    sleep_hours NUMERIC(4, 2),
    water_intake_liters NUMERIC(4, 2),
    notes TEXT,
    UNIQUE(user_id, logged_at)
);

CREATE TABLE IF NOT EXISTS public.nutrition_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    logged_at DATE DEFAULT CURRENT_DATE,
    calories INTEGER,
    protein_grams NUMERIC(6, 2),
    carbs_grams NUMERIC(6, 2),
    fats_grams NUMERIC(6, 2),
    notes TEXT
);

-- ==============================================================================
-- 4. FINANCE MODULE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
    year INTEGER NOT NULL,
    total_budget_limit NUMERIC(10, 2) NOT NULL,
    category_allocations JSONB, -- { "Food": 3000, "Transport": 1000, ... }
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, month, year)
);

CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('expense', 'income')),
    category TEXT NOT NULL CHECK (category IN ('Food', 'Transport', 'Education', 'Entertainment', 'Shopping', 'Bills', 'Other')),
    transaction_date TIMESTAMPTZ DEFAULT NOW(),
    payment_method TEXT DEFAULT 'upi',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.financial_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    target_amount NUMERIC(10, 2) NOT NULL,
    current_amount NUMERIC(10, 2) DEFAULT 0,
    target_date DATE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.recurring_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    category TEXT NOT NULL,
    frequency TEXT CHECK (frequency IN ('daily', 'weekly', 'monthly', 'semester')),
    next_due_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 5. PRODUCTIVITY MODULE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    deadline TIMESTAMPTZ,
    estimated_duration_minutes INTEGER,
    category TEXT DEFAULT 'academic' CHECK (category IN ('academic', 'fitness', 'career', 'personal', 'chores')),
    is_recurring BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.subtasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.calendar_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    event_type TEXT CHECK (event_type IN ('class', 'exam', 'workout', 'study', 'meeting', 'personal')),
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    frequency TEXT DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekdays', 'weekends')),
    target_count INTEGER DEFAULT 1,
    unit TEXT DEFAULT 'times',
    color TEXT DEFAULT '#D97706',
    streak_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.habit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    habit_id UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    logged_date DATE DEFAULT CURRENT_DATE,
    completed_count INTEGER DEFAULT 1,
    UNIQUE(habit_id, logged_date)
);

CREATE TABLE IF NOT EXISTS public.pomodoro_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
    duration_minutes INTEGER NOT NULL,
    completed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 6. SKILLFORGE (TECHNICAL CAREER DEVELOPMENT)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.career_paths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    required_skills JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    career_path_id UUID REFERENCES public.career_paths(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    category TEXT,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    parent_skill_id UUID REFERENCES public.skills(id) ON DELETE SET NULL,
    order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.user_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    proficiency_level INTEGER DEFAULT 1 CHECK (proficiency_level BETWEEN 1 AND 5),
    confidence_percentage NUMERIC(5, 2) DEFAULT 0,
    last_practiced_at TIMESTAMPTZ,
    UNIQUE(user_id, skill_id)
);

CREATE TABLE IF NOT EXISTS public.learning_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT CHECK (type IN ('documentation', 'course', 'video', 'article', 'book')),
    is_free BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS public.coding_challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_id UUID REFERENCES public.skills(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
    problem_statement TEXT NOT NULL,
    starter_code TEXT,
    test_cases JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.challenge_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID NOT NULL REFERENCES public.coding_challenges(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    submitted_code TEXT NOT NULL,
    passed BOOLEAN DEFAULT FALSE,
    ai_feedback TEXT,
    attempted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    github_url TEXT,
    live_demo_url TEXT,
    technologies TEXT[],
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
    is_portfolio_ready BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.project_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    due_date DATE
);

CREATE TABLE IF NOT EXISTS public.interview_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category TEXT CHECK (category IN ('technical', 'behavioral', 'hr', 'ai_ml', 'coding')),
    questions_and_answers JSONB,
    ai_feedback TEXT,
    confidence_score INTEGER CHECK (confidence_score BETWEEN 1 AND 100),
    conducted_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 7. NAVIGATION MODULE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.saved_places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g. "Main Campus", "Library", "Hostel"
    address TEXT NOT NULL,
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    place_type TEXT DEFAULT 'campus' CHECK (place_type IN ('campus', 'home', 'library', 'gym', 'station', 'other')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.travel_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    origin_name TEXT NOT NULL,
    destination_name TEXT NOT NULL,
    travel_mode TEXT NOT NULL,
    duration_minutes INTEGER,
    fare_estimate NUMERIC(8, 2),
    traveled_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 8. AI CORE (CONVERSATIONS, MEMORY, TOOL CALLS)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT DEFAULT 'New Conversation',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    tool_calls JSONB,
    tool_results JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_memories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    memory_type TEXT NOT NULL CHECK (memory_type IN ('preference', 'habit', 'fact', 'context', 'goal')),
    content TEXT NOT NULL,
    confidence NUMERIC(3, 2) DEFAULT 1.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_tool_calls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
    tool_name TEXT NOT NULL,
    arguments JSONB,
    execution_status TEXT CHECK (execution_status IN ('pending', 'success', 'failed')),
    result JSONB,
    executed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 9. SYSTEM NOTIFICATIONS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    module TEXT CHECK (module IN ('study', 'fitness', 'finance', 'productivity', 'skills', 'navigation', 'ai', 'system')),
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_tasks_user_status ON public.tasks(user_id, status);
CREATE INDEX IF NOT EXISTS idx_tasks_deadline ON public.tasks(deadline);
CREATE INDEX IF NOT EXISTS idx_exams_user_date ON public.exams(user_id, exam_date);
CREATE INDEX IF NOT EXISTS idx_transactions_user_date ON public.transactions(user_id, transaction_date);
CREATE INDEX IF NOT EXISTS idx_workout_logs_user_date ON public.workout_logs(user_id, started_at);
CREATE INDEX IF NOT EXISTS idx_ai_messages_conv_id ON public.ai_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON public.notifications(user_id, is_read);

