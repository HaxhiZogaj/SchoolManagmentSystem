using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.DTOs;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Services.Interfaces;
using SchoolManagmentSystem.ViewModels;

namespace SchoolManagmentSystem.Services
{
    public class HomeworkService : IHomeworkService
    {
        private readonly SchoolMSContext _context;
        private readonly IMapper _mapper;

        public HomeworkService(SchoolMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<HomeworkViewModel>> GetAllAsync()
        {
            var homeworks = await _context.Homeworks.Include(p => p.ClassSubject).ToListAsync();
            return _mapper.Map<List<HomeworkViewModel>>(homeworks);
        }

        public async Task<HomeworkViewModel> GetByIdAsync(int id)
        {
            var homework = await _context.Homeworks
                .Include(p => p.ClassSubject)
                .FirstOrDefaultAsync(p => p.HomeworkId == id);

            return homework != null ? _mapper.Map<HomeworkViewModel>(homework) : null;
        }

        public async Task AddAsync(HomeworkViewModel model)
        {
            var homework = _mapper.Map<Homework>(model);
            _context.Homeworks.Add(homework);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(HomeworkViewModel model)
        {
            var homework = await _context.Homeworks.FindAsync(model.HomeworkId);
            if (homework == null) return;

            homework.ClassSubjectId = model.ClassSubjectId;
            homework.Title = model.Title;
            homework.Description = model.Description;
            homework.DueDate = model.DueDate;
            homework.CreatedAt = model.CreatedAt;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var homework = await _context.Homeworks.FindAsync(id);
            if (homework == null) return;

            _context.Homeworks.Remove(homework);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ClassSubjectDto>> GetClassSubjectDropdownAsync()
        {
            var classes = await _context.ClassSubjects.ToListAsync();
            return _mapper.Map<List<ClassSubjectDto>>(classes);
        }


    }
}

