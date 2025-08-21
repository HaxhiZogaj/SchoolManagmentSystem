import { useEffect, useState } from 'react';
import GenericGrid from '../../Common/GenericGrid/genericGrid';
import NotificationBanner from '../../Common/NotificationBanner/notificationBanner';
import { addStudent, deleteStudent, getAllStudents, getParentDropdown, getUserDropdown, updateStudent } from '../../Services/StudentApi';
import './student.css';


function StudentGrid() {
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [users, setUsers] = useState([]);
  const [ready, setReady] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });


  useEffect(() => {
    async function fetchData() {
      try {
        const [studentsRes, parentsRes, usersRes] = await Promise.all([  getAllStudents(),  getParentDropdown(),   getUserDropdown()  ]);
        setStudents(studentsRes.data); setParents(parentsRes.data);  setUsers(usersRes.data);  setReady(true);
      } catch (error) {
        console.error('Gabim gjatë ngarkimit të studentëve:', error);
        showNotification("Gabim gjatë ngarkimit!", "error");
      }
    }
    fetchData();
  }, [refresh]);

   const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const genderOptions = [
    { gender: 'Mashkull', text: 'Mashkull' },
    { gender: 'Femer', text: 'Femer' },
    { gender: 'Tjetër', text: 'Tjetër' }
  ];

  const columns = [
    { field: 'studentId', headerText: 'ID', isPrimaryKey: true, isIdentity: true, visible: false, width: 100 },
    { field: 'userId',  headerText: 'Përdoruesit', foreignKeyField: 'userId',  foreignKeyValue: 'username',  dataSource: users,  validationRules: { required: true },  width: 180 },
    { field: 'firstName', headerText: 'Emri', validationRules: { required: true }, width: 150 },
    { field: 'lastName', headerText: 'Mbiemri', validationRules: { required: true }, width: 150 },
    { field: 'dateOfBirth',  headerText: 'Data Lindjes', type: 'date',  format: 'yMd', editType: 'datepickeredit', validationRules: { required: true },  width: 150  },
    { field: 'gender',headerText: 'Gjinia',  foreignKeyField: 'gender',   foreignKeyValue: 'text',   dataSource: genderOptions,   editType: 'dropdownedit',  width: 120 },
    { field: 'address', headerText: 'Adresa', width: 200 },
    { field: 'phoneNumber', headerText: 'Numri TEL', width: 150 },
    {  field: 'enrollmentDate',  headerText: 'Data Regjistrimit', type: 'date', format: 'yMd', editType: 'datepickeredit',  width: 150 },
    {  field: 'parentId',  headerText: 'Prindërit',  foreignKeyField: 'parentId', foreignKeyValue: 'firstName',  dataSource: parents,  width: 180 }
  ];

  const handleActionBegin = async (args) => {
    if (args.requestType === 'save') {
      try {
        const studentData = {
          StudentId: args.data.studentId,
          UserId: Number(args.data.userId),
          FirstName: args.data.firstName,
          LastName: args.data.lastName,
          DateOfBirth: args.data.dateOfBirth
            ? args.data.dateOfBirth.toISOString().split('T')[0]
            : null,
          Gender: args.data.gender,
          Address: args.data.address,
          PhoneNumber: args.data.phoneNumber,
          EnrollmentDate: args.data.enrollmentDate
            ? args.data.enrollmentDate.toISOString().split('T')[0]
            : null,
          ParentId: args.data.parentId ? Number(args.data.parentId) : null
        };

        if (args.data.studentId) {
          await updateStudent(args.data.studentId, studentData);
          showNotification("Studenti u përditësua me sukses!", "success");
        } else {
          await addStudent(studentData);
          showNotification("Studenti u shtua me sukses!", "success");
        }
        setRefresh((prev) => !prev);
      } catch (error) {
        console.error('Gabim gjatë ruajtjes së studentit:', error);
        showNotification("Gabim gjatë ruajtjes!", "error");
      }
    }

    if (args.requestType === 'delete') {
      try {
        const id = args.data[0]?.studentId;
        if (id) {
          await deleteStudent(id);
          showNotification("Studenti u fshi me sukses!", "success");
          setRefresh((prev) => !prev);
        }
      } catch (error) {
        console.error('Gabim gjatë fshirjes së studentit:', error);
        showNotification("Gabim gjatë fshirjes!", "error");
      }
    }
  };

  return (
    <>
          <NotificationBanner message={notification.message} type={notification.type} />
    <GenericGrid title="Menaxhimi i Studentëve"  data={students} columns={columns}   dataReady={ready} actionBegin={handleActionBegin}
      dropdownOptions={[
        { text: 'Switch to Dialog', id: 'Dialog' },
        { text: 'Switch to Inline', id: 'Inline' }
      ]}
    />
    </>
  );
}

export default StudentGrid;