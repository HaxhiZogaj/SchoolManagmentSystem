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
    public class SubjectService : ISubjectService
    {
        private readonly SchoolMSContext _context;
        private readonly IMapper _mapper;

        public SubjectService(SchoolMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<SubjectViewModel>> GetAllAsync()
        {
            var subjects = await _context.Subjects
                .Include(s => s.Department)
                .ToListAsync();
            return _mapper.Map<List<SubjectViewModel>>(subjects);
        }

        public async Task<SubjectViewModel> GetByIdAsync(int id)
        {
            var subject = await _context.Subjects
                .Include(s => s.Department)
                .FirstOrDefaultAsync(s => s.SubjectId == id);
            return subject != null ? _mapper.Map<SubjectViewModel>(subject) : null;
        }

        public async Task AddAsync(SubjectViewModel viewModel)
        {
            var subject = _mapper.Map<Subject>(viewModel);
            _context.Subjects.Add(subject);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(SubjectViewModel viewModel)
        {
            var subject = await _context.Subjects.FindAsync(viewModel.SubjectId);
            if (subject == null) return;

            subject.SubjectName = viewModel.SubjectName;
            subject.SubjectCode = viewModel.SubjectCode;
            subject.DepartmentId = viewModel.DepartmentId;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var subject = await _context.Subjects.FindAsync(id);
            if (subject == null) return;

            _context.Subjects.Remove(subject);
            await _context.SaveChangesAsync();
        }

        public async Task<List<DepartmentDto>> GetDepartmentDropdownAsync()
        {
            var departments = await _context.Departments.ToListAsync();
            return _mapper.Map<List<DepartmentDto>>(departments);
        }
    }
}
