using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.ViewModels;
using SchoolManagmentSystem.DTOs;

public class ClassService : IClassService
{
    private readonly SchoolMSContext _context;
    private readonly IMapper _mapper;

    public ClassService(SchoolMSContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<ClassViewModel>> GetAllAsync()
    {
        var classes = await _context.Classes
            .Include(c => c.HomeroomTeacher)
            .ToListAsync();

        return _mapper.Map<List<ClassViewModel>>(classes);
    }

    public async Task<ClassViewModel> GetByIdAsync(int id)
    {
        var @class = await _context.Classes
            .Include(c => c.HomeroomTeacher)
            .FirstOrDefaultAsync(c => c.ClassId == id);

        return _mapper.Map<ClassViewModel>(@class);
    }

    public async Task AddAsync(ClassViewModel model)
    {
        var @class = _mapper.Map<Class>(model);
        _context.Classes.Add(@class);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(ClassViewModel model)
    {
        var @class = await _context.Classes.FindAsync(model.ClassId);
        if (@class != null)
        {
            _mapper.Map(model, @class);
            await _context.SaveChangesAsync();
        }
    }

    public async Task DeleteAsync(int id)
    {
        var classEntity = await _context.Classes.FindAsync(id);
        if (classEntity == null)
            throw new Exception("Klasë nuk u gjet.");

        bool hasEnrollments = await _context.Enrollments.AnyAsync(e => e.ClassId == id);

        bool hasSubjects = await _context.ClassSubjects.AnyAsync(cs => cs.ClassId == id);
        if (hasEnrollments || hasSubjects)
            throw new InvalidOperationException("Nuk mund të fshihet kjo klasë sepse ka Studente te regjistruar ose Lende te caktuara.");

        _context.Classes.Remove(classEntity);
        await _context.SaveChangesAsync();
    }




    public async Task<List<TeacherDto>> GetTeacherDropdownAsync()
    {
        var teachers = await _context.Teachers.ToListAsync();
        return _mapper.Map<List<TeacherDto>>(teachers);
    }
}
