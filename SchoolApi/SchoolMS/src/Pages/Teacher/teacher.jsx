import { useEffect, useState } from 'react';
import GenericGrid from '../../Common/GenericGrid/genericGrid';
import NotificationBanner from '../../Common/NotificationBanner/notificationBanner';
import { addTeacher, deleteTeacher, getAllTeachers, getDepartmentDropdown, getUserDropdown, updateTeacher } from '../../Services/TeacherApi';
import './teacher.css';


function TeacherGrid() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [ready, setReady] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teacherRes, userRes, deptRes] = await Promise.all([  getAllTeachers(), getUserDropdown(), getDepartmentDropdown(), ]);
        setData(teacherRes.data);setUsers(userRes.data); setDepartments(deptRes.data); setReady(true);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
        showNotification("Gabim gjatë ngarkimit!", "error");
        setReady(false);
      }
    };
    fetchData();
  }, [refresh]);


     const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const genderOptions = [ { gender: 'Mashkull', text: 'Mashkull' }, { gender: 'Femer', text: 'Femer' }, { gender: 'Tjetër', text: 'Tjetër' },];

  const columns = [
    { field: 'teacherId', isPrimaryKey: true, isIdentity: true, visible: false },
    { field: 'FirstName', headerText: 'Emri', validationRules: { required: true }, width: 150 },
    { field: 'LastName', headerText: 'Mbiemri', validationRules: { required: true }, width: 150 },
    { field: 'Email', headerText: 'Email', width: 200 },
    { field: 'PhoneNumber', headerText: 'Numri TEL', width: 150 },
    { field: 'Gender',  headerText: 'Gjinia', width: 130,  editType: 'dropdownedit',  foreignKeyField: 'gender',  foreignKeyValue: 'text', dataSource: genderOptions,  validationRules: { required: true }},
    { field: 'DateOfBirth', headerText: 'Data Lindjes', format: 'yyyy-MM-dd', editType: 'datepickeredit', width: 150},
    { field: 'HireDate',  headerText: 'Data Punesimit',  format: 'yyyy-MM-dd',  editType: 'datepickeredit',  width: 150 },
    { field: 'UserId', headerText: 'Përdoruesit', foreignKeyField: 'userId', foreignKeyValue: 'username', dataSource: users,  width: 150 },
    { field: 'DepartmentId',  headerText: 'Departamenti',  foreignKeyField: 'departmentId',  foreignKeyValue: 'departmentName',  dataSource: departments,  width: 150  },
  ];

  const handleActionBegin = async (args) => {
    if (args.requestType === 'save') {
      try {
      const payload = {
        TeacherId: args.data.teacherId,
        FirstName: args.data.FirstName,
        LastName: args.data.LastName,
        Email: args.data.Email,
        PhoneNumber: args.data.PhoneNumber,
        Gender: args.data.Gender,
        DateOfBirth: args.data.DateOfBirth
          ? new Date(args.data.DateOfBirth).toISOString().substring(0, 10)
          : new Date().toISOString().substring(0, 10),
        HireDate: args.data.HireDate
          ? new Date(args.data.HireDate).toISOString().substring(0, 10)
          : new Date().toISOString().substring(0, 10),
        DepartmentId: args.data.DepartmentId,
        UserId: args.data.UserId
      };

    if (args.data.teacherId) {
              await updateTeacher(args.data.teacherId, payload);
              showNotification("Mesuesi u përditësua me sukses!", "success");
            } else {
              await addTeacher(payload);
              showNotification("Mesuesi u shtua me sukses!", "success");
            }
    
            setRefresh(prev => !prev);
          } catch (err) {
            console.error('Gabim gjatë ruajtjes së orarit:', err);
             showNotification("Gabim gjatë ruajtjes!", "error");
          }
        }  
    
        if (args.requestType === 'delete') {
          try {
            const id = args.data[0]?.teacherId;
            if (id) {
              await deleteTeacher(id);
              showNotification("Mesuesi u fshi me sukses!", "success");
              setRefresh(prev => !prev);
            }
          } catch (err) {
            console.error('Gabim gjatë fshirjes së orarit:', err);
            showNotification("Gabim gjatë fshirjes!", "error");
          }
        }
      };

  return (
    <>
      <NotificationBanner message={notification.message} type={notification.type} />
    <GenericGrid title="Menaxhimi i Mësuesve" data={data} columns={columns} dataReady={ready} actionBegin={handleActionBegin} 
    dropdownOptions={[
        { text: "Switch to Dialog", id: "Dialog" },
        { text: "Switch to Inline", id: "Inline" }
      ]}
    />
    </>
  );
}

export default TeacherGrid;