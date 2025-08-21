using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.DTOs;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Services.Interfaces;
using SchoolManagmentSystem.ViewModels;

namespace SchoolManagmentSystem.Services
{
    public class HomeworkSubmissionService : IHomeworkSubmissionService
    {
        private readonly SchoolMSContext _context;
        private readonly IMapper _mapper;

        public HomeworkSubmissionService(SchoolMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<HomeworkSubmissionViewModel>> GetAllAsync()
        {
            var submissions = await _context.HomeworkSubmissions
                .Include(h => h.Homework)
                .Include(s => s.Student)
                .ToListAsync();

            return _mapper.Map<List<HomeworkSubmissionViewModel>>(submissions);
        }

        public async Task<HomeworkSubmissionViewModel> GetByIdAsync(int id)
        {
            var submission = await _context.HomeworkSubmissions
                .Include(h => h.Homework)
                .Include(s => s.Student)
                .FirstOrDefaultAsync(x => x.SubmissionId == id);

            return submission != null ? _mapper.Map<HomeworkSubmissionViewModel>(submission) : null;
        }

        public async Task AddAsync(HomeworkSubmissionViewModel model)
        {
            var submission = _mapper.Map<HomeworkSubmission>(model);
            _context.HomeworkSubmissions.Add(submission);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(HomeworkSubmissionViewModel model)
        {
            var submission = await _context.HomeworkSubmissions.FindAsync(model.SubmissionId);
            if (submission == null) return;

            submission.HomeworkId = model.HomeworkId;
            submission.StudentId = model.StudentId;
            submission.FilePath = model.FilePath;
            submission.Status = model.Status;
            submission.Grade = model.Grade;
            submission.SubmittedAt = model.SubmittedAt;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var submission = await _context.HomeworkSubmissions.FindAsync(id);
            if (submission == null) return;

            _context.HomeworkSubmissions.Remove(submission);
            await _context.SaveChangesAsync();
        }

        public async Task<List<HomeworkDto>> GetHomeworkDropdownAsync()
        {
            var homeworks = await _context.Homeworks.ToListAsync();
            return _mapper.Map<List<HomeworkDto>>(homeworks);
        }

        public async Task<List<StudentDto>> GetStudentDropdownAsync()
        {
            var students = await _context.Students.ToListAsync();
            return _mapper.Map<List<StudentDto>>(students);
        }

        public async Task<HomeworkViewModel> GetHomeworkByIdAsync(int homeworkId)
        {
            var homework = await _context.Homeworks
                .FirstOrDefaultAsync(h => h.HomeworkId == homeworkId);

            if (homework == null)
                return null;

            return new HomeworkViewModel
            {
                HomeworkId = homework.HomeworkId,
                Title = homework.Title,
                Description = homework.Description,
                DueDate = homework.DueDate,
                ClassSubjectId = homework.ClassSubjectId
                
            };
        }


    }
}
