import { useEffect, useState } from 'react';
import GenericGrid from '../../Common/GenericGrid/genericGrid';
import NotificationBanner from '../../Common/NotificationBanner/notificationBanner';
import { addGrade, deleteGrade, getAllGrades, getClassSubjectDropdown, getEnrollmentDropdown, updateGrade } from '../../Services/GradeApi';
import './grade.css';


function GradeGrid() {
  const [grades, setGrades] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [classSubjects, setClassSubjects] = useState([]);
  const [ready, setReady] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gradeRes, enrollRes, subjRes] = await Promise.all([getAllGrades(),  getEnrollmentDropdown(), getClassSubjectDropdown()   ]);
            setGrades(gradeRes.data); setEnrollments(enrollRes.data);   setClassSubjects(subjRes.data);  setReady(true);
      } catch (error) {
        console.error('Gabim gjatë ngarkimit të notave:', error);
        showNotification("Gabim gjatë ngarkimit!", "error");
      }
    };
    fetchData();
  }, [refresh]);


  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const columns = [
    {field: 'gradeId',headerText: 'ID',isPrimaryKey: true,isIdentity: true,visible: false,    width: 100  },
    {field: 'enrollmentId',headerText: 'Regjistrimi',  foreignKeyField: 'enrollmentId',foreignKeyValue: 'status', dataSource: enrollments,validationRules: { required: true },width: 100},
      {
      field: 'classSubjectId',
      headerText: 'Lenda e Klases',
      foreignKeyField: 'classSubjectId',
      foreignKeyValue: 'classSubjectName',
       dataSource: classSubjects, 
      validationRules: { required: true },
      editType: 'dropdownedit',
      width: 150
    },
    {field: 'examDate',headerText: 'Data Provimit',format: 'yMd',type: 'date',editType: 'datepickeredit',validationRules: { required: true },width: 100},
    {  field: 'score',  headerText: 'Nota',  width: 100,  textAlign: 'Right',  editType: 'numericedit' },
    { field: 'grade1', headerText: 'Rezultatet', validationRules: { required: true }, width: 100  }
  ];

  const handleActionBegin = async (args) => {
    if (args.requestType === 'save') {
      try {
        const grade = {
          GradeId: args.data.gradeId,
          EnrollmentId: Number(args.data.enrollmentId),
          ClassSubjectId: Number(args.data.classSubjectId),
          ExamDate: args.data.examDate
            ? new Date(args.data.examDate).toISOString().substring(0, 10)
            : null,
          Score: args.data.score ? Number(args.data.score) : null,
          Grade1: args.data.grade1
        };

        if (args.data.gradeId) {
          await updateGrade(args.data.gradeId, grade);
          showNotification("Nota u përditësua me sukses!", "success");
        } else {
          await addGrade(grade);
          showNotification("Nota u shtua me sukses!", "success");
        }
        setRefresh(prev => !prev);
      } catch (err) {
        console.error('Gabim gjatë ruajtjes së notës:', err);
        showNotification("Gabim gjatë ruajtjes!", "error");
      }
    }

    if (args.requestType === 'delete') {
      try {
        const id = args.data[0]?.gradeId;
        if (id) {
          await deleteGrade(id);
          showNotification("Nota u fshi me sukses!", "success");
          setRefresh(prev => !prev);
        }
      } catch (err) {
        console.error('Gabim gjatë fshirjes së notës:', err);
        showNotification("Gabim gjatë fshirjes!", "error");
      }
    }
  };

  return (
    <>
      <NotificationBanner message={notification.message} type={notification.type} />
    <GenericGrid  title="Menaxhimi i Notave" data={grades} columns={columns}  dataReady={ready} actionBegin={handleActionBegin}
      dropdownOptions={[
        { text: 'Switch to Dialog', id: 'Dialog' },
        { text: 'Switch to Inline', id: 'Inline' }
      ]}
    />
    </>
  );
}

export default GradeGrid;