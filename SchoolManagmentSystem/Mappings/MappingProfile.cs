using AutoMapper;
using SchoolManagmentSystem.DTOs;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.ViewModels;

namespace SchoolManagmentSystem.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<Student, StudentDto>().ReverseMap();
            CreateMap<Teacher, TeacherDto>().ReverseMap();
            CreateMap<Parent, ParentDto>().ReverseMap();
            CreateMap<Class, ClassDto>().ReverseMap();
            CreateMap<Subject, SubjectDto>().ReverseMap();
            CreateMap<Grade, GradeDto>().ReverseMap();
            CreateMap<Department, DepartmentDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Timetable, TimetableDto>().ReverseMap();
            CreateMap<Enrollment, EnrollmentDto>().ReverseMap();
            CreateMap<ClassSubject, ClassSubjectDto>().ReverseMap();

            CreateMap<Homework, HomeworkDto>();
      /*      CreateMap<Class, ClassDto>().ReverseMap()*/;
            //CreateMap<Parent, ParentDto>().ReverseMap();
            //CreateMap<ClassSubject, ClassSubjectDto>().ReverseMap();


            CreateMap<StudentViewModel, Student>().ReverseMap()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.Username))
                .ForMember(dest => dest.ParentFirstName, opt => opt.MapFrom(src => src.Parent.FirstName));

            CreateMap<TeacherViewModel, Teacher>().ReverseMap()
                .ForMember(dest => dest.DepartmentName, opt => opt.MapFrom(src => src.Department.DepartmentName))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.Username));

            CreateMap<ParentViewModel, Parent>().ReverseMap()
                  .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.Username));


            CreateMap<UserViewModel, User>()
        .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Username));

            CreateMap<ClassViewModel, Class>().ReverseMap()
                .ForMember(dest => dest.TeacherFirstName, opt => opt.MapFrom(src => src.HomeroomTeacher.FirstName));

            CreateMap<ClassSubjectViewModel, ClassSubject>().ReverseMap()
                .ForMember(dest => dest.ClassName, opt => opt.MapFrom(src => src.Class.ClassName))
                .ForMember(dest => dest.SubjectName, opt => opt.MapFrom(src => src.Subject.SubjectName))
                .ForMember(dest => dest.TeacherFirstName, opt => opt.MapFrom(src => src.Teacher.FirstName));

            CreateMap<DepartmentViewModel, Department>().ReverseMap();

            CreateMap<EnrollmentViewModel, Enrollment>().ReverseMap()
                .ForMember(dest => dest.StudentFirstName, opt => opt.MapFrom(src => src.Student.FirstName))
                .ForMember(dest => dest.ClassName, opt => opt.MapFrom(src => src.Class.ClassName));

            CreateMap<GradeViewModel, Grade>().ReverseMap()
                .ForMember(dest => dest.EnrollmentStatus, opt => opt.MapFrom(src => src.Enrollment.Status))
                .ForMember(dest => dest.ClassSubjectName, opt => opt.MapFrom(src => src.ClassSubject.ClassSubjectName));

            CreateMap<SubjectViewModel, Subject>().ReverseMap()
                .ForMember(dest => dest.DepartmentName, opt => opt.MapFrom(src => src.Department.DepartmentName));

            CreateMap<HomeworkViewModel, Homework>().ReverseMap()
                .ForMember(dest => dest.ClassSubjectName, opt => opt.MapFrom(src => src.ClassSubject.Subject.SubjectName));

            CreateMap<HomeworkSubmissionViewModel, HomeworkSubmission>().ReverseMap()
                 .ForMember(dest => dest.TitleName, opt => opt.MapFrom(src => src.Homework.Title))
                .ForMember(dest => dest.StudentFirstName, opt => opt.MapFrom(src => src.Student.FirstName));

            CreateMap<UserViewModel, User>().ReverseMap();


            CreateMap<TimetableViewModel, Timetable>().ReverseMap()
               .ForMember(dest => dest.ClassSubjectName, opt => opt.MapFrom(src => src.ClassSubject != null ? src.ClassSubject.Subject.SubjectName : null));


            CreateMap<ClassSubject, ClassSubjectDto>()
    .ForMember(dest => dest.ClassSubjectName, opt => opt.MapFrom(src => src.ClassSubjectName));
        }
    }
}
