using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.DTOs;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Services.Interfaces;
using SchoolManagmentSystem.ViewModels;

namespace SchoolManagmentSystem.Services
{
    public class StudentService : IStudentService
    {
        private readonly SchoolMSContext _context;
        private readonly IMapper _mapper;

        public StudentService(SchoolMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<StudentViewModel>> GetAllAsync()
        {
            var students = await _context.Students
                .Include(s => s.User)
                .Include(s => s.Parent)
                .Include(s => s.Enrollments)
                    .ThenInclude(e => e.Class)
                .ToListAsync();

            return _mapper.Map<List<StudentViewModel>>(students);
        }


        public async Task<StudentViewModel> GetByIdAsync(int id)
        {
            var student = await _context.Students
                .Include(s => s.User)
                .Include(s => s.Parent)
                .Include(s => s.Enrollments)
                    .ThenInclude(e => e.Class)
                .FirstOrDefaultAsync(s => s.StudentId == id);

            return student != null ? _mapper.Map<StudentViewModel>(student) : null;
        }


        public async Task AddAsync(StudentViewModel vm)
        {
            var model = _mapper.Map<Student>(vm);
            await _context.Students.AddAsync(model);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(StudentViewModel vm)
        {
            var existing = await _context.Students.FindAsync(vm.StudentId);
            if (existing != null)
            {
                _mapper.Map(vm, existing);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student != null)
            {
                _context.Students.Remove(student);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<ParentDto>> GetParentDropdownAsync()
        {
            var parents = await _context.Parents.ToListAsync();
            return _mapper.Map<List<ParentDto>>(parents);
        }
        public async Task<List<UserDto>> GetUserDropdownAsync()
        {
            var users = await _context.Users.ToListAsync();
            return _mapper.Map<List<UserDto>>(users);
        }

    }
}
