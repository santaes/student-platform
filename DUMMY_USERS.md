# Dummy Users List

## Database Seeded Users

The Student Learning Platform includes 2 dummy users created in the database seeding process:

### User 1: María García
- **Email**: `maria.garcia@example.com`
- **Password**: `password123`
- **Role**: Student
- **Status**: Active
- **Full Name**: María García
- **Program**: Español para principiantes (Spanish for Beginners)
- **Current Level**: 2
- **Progress**: 65%
- **Upcoming Tasks**: 
  - Completar lección de vocabulario
  - Practicar conjugación presente
- **Bio**: Estudiante apasionada por aprender español

### User 2: Олександр Петренко (Oleksandr Petrenko)
- **Email**: `oleks.petrov@example.com`
- **Password**: `password123`
- **Role**: Student
- **Status**: Active
- **Full Name**: Олександр Петренко
- **Program**: Українська мова для початківців (Ukrainian for Beginners)
- **Current Level**: 3
- **Progress**: 75%
- **Upcoming Tasks**: 
  - Завершити урок "Привітання та знайомство" (Complete lesson "Greetings and Introduction")
  - Виконати вправу з алфавіту (Complete alphabet exercise)
- **Bio**: Студент, який вивчає українську мову (Student learning Ukrainian language)

## Security Notes

⚠️ **Important**: All dummy users use the same password: `password123`
- This is a hardcoded password for development/testing purposes
- In production, this should be changed to secure, unique passwords

## Usage

### For Testing and Development
Use these accounts to test the application:

1. **Spanish Learning Path**: María García account
2. **Ukrainian Learning Path**: Oleksandr Petrenko account

### Login Credentials
```
Email: maria.garcia@example.com
Password: password123

Email: oleks.petrov@example.com
Password: password123
```

## Location in Code

The dummy users are created in:
- **File**: `backend/src/database/seed.service.ts`
- **Method**: `createUsers()`
- **Database**: Automatically seeded when application starts
- **Password Hashing**: Uses bcrypt with salt rounds = 10

## Student Profiles

Each user has an associated student profile with:
- Personalized learning program
- Progress tracking
- Upcoming tasks
- Biographical information
- Language-specific content
