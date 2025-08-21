using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Services.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolManagmentSystem.Services
{
    public class StudentProfileService : IStudentProfileService
    {
        private readonly SchoolMSContext _context;

        public StudentProfileService(SchoolMSContext context)
        {
            _context = context;
        }

        public async Task<object?> GetStudentProfileAsync(int userId)
        {
            // Load student with related data
            var student = await _context.Students
                .Include(s => s.Parent)
                .Include(s => s.Enrollments)
                    .ThenInclude(e => e.Class)
                .Include(s => s.Enrollments)
                    .ThenInclude(e => e.Grades)
                        .ThenInclude(g => g.ClassSubject)
                            .ThenInclude(cs => cs.Subject)
                .Include(s => s.HomeworkSubmissions)
                    .ThenInclude(hs => hs.Homework)
                .FirstOrDefaultAsync(s => s.UserId == userId);

            if (student == null)
                return null;

            // Get user email separately from User entity
            var userEmail = await _context.Users
                .Where(u => u.UserId == userId)
                .Select(u => u.Email)
                .FirstOrDefaultAsync();

            var firstEnrollment = student.Enrollments.FirstOrDefault();
            var profile = new
            {
                fullName = $"{student.FirstName} {student.LastName}",
                gender = student.Gender,
                email = userEmail,
                phone = student.PhoneNumber,
                address = student.Address,
                @class = firstEnrollment != null ? $"{firstEnrollment.Class.ClassName} - {firstEnrollment.Class.Section}" : null,
                academicYear = firstEnrollment?.Class.AcademicYear,
                parent = student.Parent != null ? new
                {
                    name = $"{student.Parent.FirstName} {student.Parent.LastName}",
                    phone = student.Parent.PhoneNumber,
                    email = student.Parent.Email
                } : null,
                subjects = student.Enrollments
                    .SelectMany(e => e.Class.ClassSubjects.Select(cs => cs.Subject.SubjectName))
                    .Distinct()
                    .ToList(),
                grades = student.Enrollments
                    .SelectMany(e => e.Grades.Select(g => new
                    {
                        subject = g.ClassSubject.Subject.SubjectName,
                        score = g.Score,
                        grade = g.Grade1
                    })).ToList(),
                homeworkSubmissions = student.HomeworkSubmissions.Select(h => new
                {
                    title = h.Homework.Title,
                    status = h.Status,
                    grade = h.Grade,
                    submittedAt = h.SubmittedAt?.ToString("yyyy-MM-dd"),
                    filePath = h.FilePath
                }).ToList(),
                documents = new[]
                {
                    new { name = "Birth Certificate", uploadedAt = "2024-01-01" },
                    new { name = "Vaccination Record", uploadedAt = "2024-02-10" }
                }
            };

            return profile;
        }
    }
}
