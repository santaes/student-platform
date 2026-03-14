-- Seed data for Student Learning Platform
-- Spanish and Ukrainian languages focus

-- Insert sample users with hashed passwords (password123)
INSERT INTO users (id, email, password_hash, role, is_active, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655780000', 'maria.garcia@example.com', '$2b$12$LQv3c7y9Kqf6Vf8Wm8ZzJqQv9c7y9Kqf6Vf8Wm8ZzJqQv9c7y9Kqf6Vf8Wm8ZzJqQv', 'student', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780001', 'oleks.petrov@example.com', '$2b$12$LQv3c7y9Kqf6Vf8Wm8ZzJqQv9c7y9Kqf6Vf8Wm8ZzJqQv9c7y9Kqf6Vf8Wm8ZzJqQv', 'student', true, NOW(), NOW());

-- Insert student profiles
INSERT INTO student_profiles (id, user_id, full_name, enrolled_program, current_level, progress_percentage, upcoming_tasks, bio, avatar_url, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655780010', '550e8400-e29b-41d4-a716-446655780000', 'María García', 'Español para principiantes', 2, 65, ARRAY['Completar lección de vocabulario', 'Practicar conjugación presente', 'Empezar módulo de gramática'], 'Estudiante apasionada por aprender español', NULL, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780011', '550e8400-e29b-41d4-a716-446655780001', 'Олександр Петренко', 'Українська мова для початківців', 3, 75, ARRAY['Завершити урок "Привітання та знайомство"', 'Виконати вправу з алфавіту', 'Почати вивчення дієслів'], 'Студент, який вивчає українську мову', NULL, NOW(), NOW());

-- Insert roadmaps
INSERT INTO roadmaps (id, title, description, is_active, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655780100', 'Español para Principiantes', 'Curso completo de español para estudiantes principiantes con enfoque en comunicación básica, gramática y cultura hispana.', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780101', 'Українська мова для початківців', 'Повний курс української мови для початківців з акцентом на розмовні, читання та писання.', true, NOW(), NOW());

-- Insert modules for Spanish roadmap
INSERT INTO modules (id, roadmap_id, title, description, "order", is_active, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655780200', '550e8400-e29b-41d4-a716-446655780100', 'Módulo 1: Fundamentos', 'Introducción al español, alfabeto, pronunciación y saludos básicos', 1, true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780201', '550e8400-e29b-41d4-a716-446655780100', 'Módulo 2: Vocabulario Básico', 'Palabras comunes, números, colores, días de la semana', 2, true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780202', '550e8400-e29b-41d4-a716-446655780100', 'Módulo 3: Gramática Básica', 'Ser/Estar, conjugaciones presentes, artículos', 3, true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780203', '550e8400-e29b-41d4-a716-446655780100', 'Módulo 4: Conversación', 'Diálogos cotidianos, expresiones útiles', 4, true, NOW(), NOW());

-- Insert modules for Ukrainian roadmap
INSERT INTO modules (id, roadmap_id, title, description, "order", is_active, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655780210', '550e8400-e29b-41d4-a716-446655780101', 'Модуль 1: Основи', 'Вступ до української мови, алфавіт, вимова та привітання', 1, true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780211', '550e8400-e29b-41d4-a716-446655780101', 'Модуль 2: Лексика', 'Базова лексика, числа, дні тижня, кольори', 2, true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780212', '550e8400-e29b-41d4-a716-446655780101', 'Модуль 3: Граматика', 'Іменники, дієслова, прийменники, артиклі', 3, true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780213', '550e8400-e29b-41d4-a716-446655780101', 'Модуль 4: Розмова', 'Базові діалоги, корисні вирази', 4, true, NOW(), NOW());

-- Insert lessons for Spanish Module 1
INSERT INTO lessons (id, module_id, title, description, "order", estimated_hours, status, is_active, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655780300', '550e8400-e29b-41d4-a716-446655780200', 'El Alfabeto y Pronunciación', 'Aprender el alfabeto español y la pronunciación correcta de cada letra', 1, 2, 'available', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780301', '550e8400-e29b-41d4-a716-446655780200', 'Saludos y Presentaciones', 'Cómo saludar y presentarse en español', 2, 1, 'available', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780302', '550e8400-e29b-41d4-a716-446655780200', 'Números y Conteo', 'Números del 1 al 100 en español', 3, 2, 'available', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780303', '550e8400-e29b-41d4-a716-446655780200', 'Días de la Semana y Meses', 'Los días de la semana y meses del año', 4, 1, 'available', true, NOW(), NOW());

-- Insert lessons for Ukrainian Module 1
INSERT INTO lessons (id, module_id, title, description, "order", estimated_hours, status, is_active, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655780310', '550e8400-e29b-41d4-a716-446655780210', 'Алфавіт та вимова', 'Вивчення українського алфавіту та правильна вимова', 1, 3, 'available', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780311', '550e8400-e29b-41d4-a716-446655780210', 'Привітання та знайомство', 'Як привітатися та представитися українською', 2, 2, 'available', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780312', '550e8400-e29b-41d4-a716-446655780210', 'Числа та лічба', 'Числа від 1 до 100 українською', 3, 2, 'available', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780313', '550e8400-e29b-41d4-a716-446655780210', 'Дні тижня та місяці', 'Дні тижня та місяці року українською', 4, 1, 'available', true, NOW(), NOW());

-- Insert homework assignments
INSERT INTO homework (id, lesson_id, title, description, due_date, max_score, status, instructor_notes, estimated_hours, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655780400', '550e8400-e29b-41d4-a716-446655780300', 'Práctica del Alfabeto', 'Escribe todas las letras del alfabeto español y practica su pronunciación', DATE('2024-03-20'), 100, 'pending', 'Presta atención a las letras G, J, Ñ, LL', 2, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780401', '550e8400-e29b-41d4-a716-446655780301', 'Diálogo de Presentación', 'Prepara un corto diálogo presentándote en español', DATE('2024-03-22'), 100, 'pending', 'Incluye saludos, nombre, origen', 1, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780410', '550e8400-e29b-41d4-a716-446655780310', 'Практика алфавіту', 'Напишіть усі літери українського алфавіту', DATE('2024-03-20'), 100, 'pending', 'Зверніть увагу на правильну вимову літер Г, Ґ, Ї', 2, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780411', '550e8400-e29b-41d4-a716-446655780311', 'Діалог знайомства', 'Підготуйте діалог знайомства українською', DATE('2024-03-22'), 100, 'pending', 'Включає привітання, ім''я, походження', 1, NOW(), NOW());

-- Insert resources
INSERT INTO resources (id, title, description, category, file_name, original_name, mime_type, file_size, file_url, file_path, is_active, download_count, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655780500', 'Guía Completa del Alfabeto Español', 'PDF completo con guía visual del alfabeto español', 'Español', 'guia-alfabeto.pdf', 'guia-alfabeto.pdf', 'application/pdf', 2048000, '/resources/guides/guia-alfabeto.pdf', '/uploads/guides/guia-alfabeto.pdf', true, 0, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780501', 'Audio: Pronunciación Española', 'Archivo de audio con pronunciación correcta del español', 'Español', 'pronunciacion-es.mp3', 'pronunciacion-es.mp3', 'audio/mpeg', 5242880, '/resources/audio/pronunciacion-es.mp3', '/uploads/audio/pronunciacion-es.mp3', true, 0, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780510', 'Повний посібник українського алфавіту', 'PDF з детальною інформацією про український алфавіт', 'Українська', 'ukrainian-alphabet.pdf', 'ukrainian-alphabet.pdf', 'application/pdf', 3072000, '/resources/guides/ukrainian-alphabet.pdf', '/uploads/guides/ukrainian-alphabet.pdf', true, 0, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780511', 'Аудіо курс української вимови', 'Архів з аудіо файлами для правильної вимови', 'Українська', 'ukrainian-pronunciation.mp3', 'ukrainian-pronunciation.mp3', 'audio/mpeg', 83886080, '/resources/audio/ukrainian-pronunciation.mp3', '/uploads/audio/ukrainian-pronunciation.mp3', true, 0, NOW(), NOW());

-- Insert lesson progress for demo users
INSERT INTO lesson_progress (id, student_id, lesson_id, status, progress_percentage, time_spent_minutes, started_at, completed_at, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655780600', '550e8400-e29b-41d4-a716-446655780000', '550e8400-e29b-41d4-a716-446655780300', 'completed', 100, 120, DATE('2024-03-10'), DATE('2024-03-12'), NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780601', '550e8400-e29b-41d4-a716-446655780000', '550e8400-e29b-41d4-a716-446655780301', 'in_progress', 60, 60, DATE('2024-03-13'), NULL, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780610', '550e8400-e29b-41d4-a716-446655780001', '550e8400-e29b-41d4-a716-446655780310', 'completed', 100, 180, DATE('2024-03-08'), DATE('2024-03-11'), NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780611', '550e8400-e29b-41d4-a716-446655780001', '550e8400-e29b-41d4-a716-446655780311', 'in_progress', 75, 90, DATE('2024-03-12'), NULL, NOW(), NOW());

-- Insert sample submissions
INSERT INTO submissions (id, homework_id, student_id, text_response, score, status, instructor_feedback, submitted_at, graded_at, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655780700', '550e8400-e29b-41d4-a716-446655780400', '550e8400-e29b-41d4-a716-446655780000', 'He completado el ejercicio del alfabeto. Las letras más difíciles fueron la ñ y la ll.', 95, 'graded', 'Excelente trabajo! Presta especial atención a la pronunciación de la rr.', DATE('2024-03-12'), DATE('2024-03-13'), NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655780710', '550e8400-e29b-41d4-a716-446655780410', '550e8400-e29b-41d4-a716-446655780001', 'Я виконав вправу з алфавіту. Найскладнішими були літери ґ та ї.', 92, 'graded', 'Чудова робота! Зверни увагу на правильну вимову літери ї.', DATE('2024-03-11'), DATE('2024-03-12'), NOW(), NOW());
