using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.ViewModels;

public class DepartmentService : IDepartmentService
{
    private readonly SchoolMSContext _context;
    private readonly IMapper _mapper;

    public DepartmentService(SchoolMSContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<DepartmentViewModel>> GetAllAsync()
    {
        var list = await _context.Departments.ToListAsync();
        return _mapper.Map<List<DepartmentViewModel>>(list);
    }

    public async Task<DepartmentViewModel> GetByIdAsync(int id)
    {
        var entity = await _context.Departments.FindAsync(id);
        return _mapper.Map<DepartmentViewModel>(entity);
    }

    public async Task AddAsync(DepartmentViewModel model)
    {
        var entity = _mapper.Map<Department>(model);
        _context.Departments.Add(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(DepartmentViewModel model)
    {
        var entity = await _context.Departments.FindAsync(model.DepartmentId);
        if (entity != null)
        {
            _mapper.Map(model, entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _context.Departments.FindAsync(id);
        if (entity != null)
        {
            _context.Departments.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
