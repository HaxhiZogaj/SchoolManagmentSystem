using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.ViewModels;
using SchoolManagmentSystem.DTOs;

public class ClassSubjectService : IClassSubjectService
{
    private readonly SchoolMSContext _context;
    private readonly IMapper _mapper;

    public ClassSubjectService(SchoolMSContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<ClassSubjectViewModel>> GetAllAsync()
    {
        var list = await _context.ClassSubjects
            .Include(cs => cs.Class)
            .Include(cs => cs.Subject)
            .Include(cs => cs.Teacher)
            .ToListAsync();

        return _mapper.Map<List<ClassSubjectViewModel>>(list);
    }

    public async Task<ClassSubjectViewModel> GetByIdAsync(int id)
    {
        var entity = await _context.ClassSubjects
            .Include(cs => cs.Class)
            .Include(cs => cs.Subject)
            .Include(cs => cs.Teacher)
            .FirstOrDefaultAsync(cs => cs.ClassSubjectId == id);

        return _mapper.Map<ClassSubjectViewModel>(entity);
    }

    public async Task AddAsync(ClassSubjectViewModel model)
    {
        var entity = _mapper.Map<ClassSubject>(model);
        _context.ClassSubjects.Add(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(ClassSubjectViewModel model)
    {
        var entity = await _context.ClassSubjects.FindAsync(model.ClassSubjectId);
        if (entity != null)
        {
            _mapper.Map(model, entity);
            await _context.SaveChangesAsync();
        }
    }

    //public async Task DeleteAsync(int id)
    //{
    //    var entity = await _context.ClassSubjects.FindAsync(id);
    //    if (entity != null)
    //    {
    //        _context.ClassSubjects.Remove(entity);
    //        await _context.SaveChangesAsync();
    //    }
    //}


    public async Task DeleteAsync(int id)
    {
        var entity = await _context.ClassSubjects.FindAsync(id);
        if (entity == null)
            throw new KeyNotFoundException("ClassSubject nuk u gjet.");

        bool hasHomeWorks = await _context.Homeworks.AnyAsync(e => e.ClassSubjectId == id);

        bool hasGrades = await _context.Grades.AnyAsync(g => g.ClassSubjectId == id);

        bool hasTimeTables = await _context.Timetables.AnyAsync(t => t.ClassSubjectId == id);

        if (hasHomeWorks || hasGrades || hasTimeTables)
            throw new InvalidOperationException("Nuk mund të fshihet kjo lëndë sepse ka Detyrë Shtëpie, Notë ose Orar të regjistruar.");

        _context.ClassSubjects.Remove(entity);
        await _context.SaveChangesAsync();
    }


    public async Task<List<ClassDto>> GetClassesDropdownAsync()
    {
        var classes = await _context.Classes.ToListAsync();
        return _mapper.Map<List<ClassDto>>(classes);
    }

    public async Task<List<SubjectDto>> GetSubjectsDropdownAsync()
    {
        var subjects = await _context.Subjects.ToListAsync();
        return _mapper.Map<List<SubjectDto>>(subjects);
    }

    public async Task<List<TeacherDto>> GetTeachersDropdownAsync()
    {
        var teachers = await _context.Teachers.ToListAsync();
        return _mapper.Map<List<TeacherDto>>(teachers);
    }
}
