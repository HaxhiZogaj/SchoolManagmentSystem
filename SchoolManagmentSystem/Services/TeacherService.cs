using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.DTOs;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Services.Interfaces;
using SchoolManagmentSystem.ViewModels;

namespace SchoolManagmentSystem.Services
{
    public class TeacherService : ITeacherService
    {
        private readonly SchoolMSContext _context;
        private readonly IMapper _mapper;

        public TeacherService(SchoolMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<TeacherViewModel>> GetAllAsync()
        {
            var teachers = await _context.Teachers
                .Include(t => t.User)
                .Include(t => t.Department)
                .ToListAsync();

            return _mapper.Map<List<TeacherViewModel>>(teachers);
        }

        public async Task<TeacherViewModel> GetByIdAsync(int id)
        {
            var teacher = await _context.Teachers
                .Include(t => t.User)
                .Include(t => t.Department)
                .FirstOrDefaultAsync(t => t.TeacherId == id);

            return teacher != null ? _mapper.Map<TeacherViewModel>(teacher) : null;
        }

        public async Task AddAsync(TeacherViewModel vm)
        {
            var model = _mapper.Map<Teacher>(vm);
            await _context.Teachers.AddAsync(model);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(TeacherViewModel vm)
        {
            var existing = await _context.Teachers.FindAsync(vm.TeacherId);
            if (existing != null)
            {
                _mapper.Map(vm, existing);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var teacher = await _context.Teachers.FindAsync(id);
            if (teacher != null)
            {
                _context.Teachers.Remove(teacher);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<UserDto>> GetUserDropdownAsync()
        {
            var users = await _context.Users.ToListAsync();
            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<List<DepartmentDto>> GetDepartmentDropdownAsync()
        {
            var departments = await _context.Departments.ToListAsync();
            return _mapper.Map<List<DepartmentDto>>(departments);
        }
    }
}
