import { useEffect, useState } from 'react';
import GenericGrid from '../../Common/GenericGrid/genericGrid';
import NotificationBanner from '../../Common/NotificationBanner/notificationBanner';
import { addSubject, deleteSubject, getAllSubjects, getDepartmentDropdown, updateSubject } from '../../Services/SubjectApi';
import './subject.css';



function SubjectGrid() {
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [ready, setReady] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectRes, departmentRes] = await Promise.all([
          getAllSubjects(),
          getDepartmentDropdown()
        ]);
        setSubjects(subjectRes.data);
        setDepartments(departmentRes.data);
        setReady(true);
      } catch (err) {
        console.error('Gabim gjatë ngarkimit të lëndëve ose departamenteve:', err);
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
    { field: 'subjectId',  headerText: 'ID', isPrimaryKey: true,  isIdentity: true,  visible: false },
    {  field: 'subjectName', headerText: 'Emri i Lëndës',  validationRules: { required: true }, width: 200 },
    { field: 'subjectCode', headerText: 'Kodi', validationRules: { required: true },  width: 150 },
    {  field: 'departmentId', headerText: 'Departamenti', foreignKeyField: 'departmentId', foreignKeyValue: 'departmentName', dataSource: departments,  width: 200  }
  ];

  const handleActionBegin = async (args) => {
    if (args.requestType === 'save') {
      const payload = {
        SubjectId: args.data.subjectId,
        SubjectName: args.data.subjectName,
        SubjectCode: args.data.subjectCode,
        DepartmentId: args.data.departmentId ? Number(args.data.departmentId) : null
      };
      try {
        if (args.data.subjectId) {
          await updateSubject(args.data.subjectId, payload);
          showNotification("Lenda u përditësua me sukses!", "success");
        } else {
          await addSubject(payload);
          showNotification("Lenda u shtua me sukses!", "success");
        }
        setRefresh((prev) => !prev);
      } catch (err) {
        console.error('Gabim gjatë ruajtjes së lëndës:', err);
        showNotification("Gabim gjatë ruajtjes!", "error");
      }
    }

    if (args.requestType === 'delete') {
      try {
        const id = args.data[0]?.subjectId;
        if (id) {
          await deleteSubject(id);
          showNotification("Lenda u fshi me sukses!", "success");
          setRefresh((prev) => !prev);
        }
      } catch (err) {
        console.error('Gabim gjatë fshirjes së lëndës:', err);
        showNotification("Gabim gjatë fshirjes!", "error");
      }
    }
  };

  return (
    <>
          <NotificationBanner message={notification.message} type={notification.type} />
    <GenericGrid  title="Menaxhimi i Lëndëve" data={subjects}  columns={columns}  dataReady={ready}  actionBegin={handleActionBegin}
      dropdownOptions={[
        { text: 'Switch to Dialog', id: 'Dialog' },
        { text: 'Switch to Inline', id: 'Inline' }
      ]}
    />
    </>
  );
}

export default SubjectGrid;