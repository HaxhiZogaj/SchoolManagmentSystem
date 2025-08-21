using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.ViewModels;
using SchoolManagmentSystem.DTOs;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SchoolManagmentSystem.Services
{
    public class GradeService : IGradeService
    {
        private readonly SchoolMSContext _context;
        private readonly IMapper _mapper;

        public GradeService(SchoolMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<GradeViewModel>> GetAllAsync()
        {
            var grades = await _context.Grades
                .Include(g => g.Enrollment)
                .Include(g => g.ClassSubject)
                .ToListAsync();

            return _mapper.Map<List<GradeViewModel>>(grades);
        }

        public async Task<GradeViewModel> GetByIdAsync(int id)
        {
            var grade = await _context.Grades
                .Include(g => g.Enrollment)
                .Include(g => g.ClassSubject)
                .FirstOrDefaultAsync(g => g.GradeId == id);

            return grade != null ? _mapper.Map<GradeViewModel>(grade) : null;
        }

        public async Task AddAsync(GradeViewModel viewModel)
        {
            var grade = _mapper.Map<Grade>(viewModel);
            _context.Grades.Add(grade);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(GradeViewModel viewModel)
        {
            var grade = await _context.Grades.FindAsync(viewModel.GradeId);
            if (grade == null) return;

            grade.EnrollmentId = viewModel.EnrollmentId;
            grade.ClassSubjectId = viewModel.ClassSubjectId;
            grade.ExamDate = viewModel.ExamDate;
            grade.Score = viewModel.Score;
            grade.Grade1 = viewModel.Grade1;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var grade = await _context.Grades.FindAsync(id);
            if (grade == null) return;

            _context.Grades.Remove(grade);
            await _context.SaveChangesAsync();
        }

        public async Task<List<EnrollmentDto>> GetEnrollmentDropdownAsync()
        {
            var enrollments = await _context.Enrollments.ToListAsync();
            return _mapper.Map<List<EnrollmentDto>>(enrollments);
        }

        public async Task<List<ClassSubjectDto>> GetClassSubjectDropdownAsync()
        {
            var classSubjects = await _context.ClassSubjects.ToListAsync();
            return _mapper.Map<List<ClassSubjectDto>>(classSubjects);
        }
    }
}
