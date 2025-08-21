using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.DTOs;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Services.Interfaces;
using SchoolManagmentSystem.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SchoolManagmentSystem.Services
{
    public class TimetableService : ITimetableService
    {
        private readonly SchoolMSContext _context;
        private readonly IMapper _mapper;

        public TimetableService(SchoolMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<TimetableViewModel>> GetAllAsync()
        {
            var timetables = await _context.Timetables
                .Include(t => t.ClassSubject)
                .ToListAsync();

            return _mapper.Map<List<TimetableViewModel>>(timetables);
        }

        public async Task<TimetableViewModel> GetByIdAsync(int id)
        {
            var timetable = await _context.Timetables
                .Include(t => t.ClassSubject)
                .FirstOrDefaultAsync(t => t.TimetableId == id);

            return timetable != null ? _mapper.Map<TimetableViewModel>(timetable) : null;
        }

        public async Task AddAsync(TimetableViewModel vm)
        {
            var model = _mapper.Map<Timetable>(vm);
            await _context.Timetables.AddAsync(model);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(TimetableViewModel vm)
        {
            var existing = await _context.Timetables.FindAsync(vm.TimetableId);
            if (existing != null)
            {
                _mapper.Map(vm, existing);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var timetable = await _context.Timetables.FindAsync(id);
            if (timetable != null)
            {
                _context.Timetables.Remove(timetable);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<ClassSubjectDto>> GetClassSubjectDropdownAsync()
        {
            var classSubjects = await _context.ClassSubjects.ToListAsync();
            return _mapper.Map<List<ClassSubjectDto>>(classSubjects);
        }

    }
}
