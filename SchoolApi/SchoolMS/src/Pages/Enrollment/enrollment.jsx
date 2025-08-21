import { useEffect, useState } from 'react';
import GenericGrid from '../../Common/GenericGrid/genericGrid.jsx';
import NotificationBanner from '../../Common/NotificationBanner/notificationBanner';
import { addEnrollment, deleteEnrollment, getAllEnrollments, getClassesDropdown, getStudentsDropdown, updateEnrollment } from '../../Services/EnrollmentApi';


function EnrollmentGrid() {
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [ready, setReady] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetch = async () => {
      const [d1, d2, d3] = await Promise.all([
        getAllEnrollments(),
        getStudentsDropdown(),
        getClassesDropdown(),
      ]);
      setData(d1.data);
      setStudents(d2.data);
      setClasses(d3.data);
      setReady(true);
    };
    fetch();
  }, [refresh]);


    const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const columns = [
    { field: "enrollmentId", isPrimaryKey: true, isIdentity: true, visible: false },
    { field: "studentId", headerText: "Studenti", foreignKeyField: "studentId", foreignKeyValue: "firstName", dataSource: students, validationRules: { required: true }, width: 200 },
    { field: "classId", headerText: "Klasa", foreignKeyField: "classId", foreignKeyValue: "className", dataSource: classes, validationRules: { required: true }, width: 200 },
    { field: "enrollmentDate", headerText: "Data", format: "yMd", type: "date", editType: "datepickeredit", validationRules: { required: true }, width: 150 },
    { field: "status",headerText: "Statusi", foreignKeyField: "status", foreignKeyValue: "text",
      dataSource: [{ status: 'Active', text: 'Prezent' }, { status: 'Inactive', text: 'Mungesë' } ],
      editType: "dropdownedit", validationRules: { required: true }, width: 150
    }
  ];

  const handleActionBegin = async (args) => {
    if (args.requestType === 'save') {
      const payload = {
        EnrollmentId: args.data.enrollmentId,
        StudentId: Number(args.data.studentId),
        ClassId: Number(args.data.classId),
        EnrollmentDate: args.data.enrollmentDate
          ? new Date(args.data.enrollmentDate).toISOString().substring(0, 10)
          : new Date().toISOString().substring(0, 10),
        Status: args.data.status,
      };

  try {
          if (args.data.enrollmentId) {
            await updateEnrollment(args.data.enrollmentId, payload);
            showNotification("Regjistrimi u përditësua me sukses!", "success");
          } else {
            await addEnrollment(payload);
            showNotification("Regjistrimi u shtua me sukses!", "success");
          }
          setRefresh(prev => !prev);
        } catch (err) {
          console.error('Gabim gjatë ruajtjes së klasës:', err);
          showNotification("Gabim gjatë ruajtjes!", "error");
        }
      }
  
      if (args.requestType === 'delete') {
        const id = args.data[0]?.enrollmentId;
        if (id) {
          try {
            await deleteEnrollment(id);
            showNotification("Regjistrimi u fshi me sukses!", "success");
            setRefresh(prev => !prev);
          } catch (err) {
            console.error('Gabim gjatë fshirjes së klasës:', err);
            showNotification("Gabim gjatë fshirjes!", "error");
          }
        }
      }
    };

  return (
     <>
      <NotificationBanner message={notification.message} type={notification.type} />
    <GenericGrid
      title="Menaxhimi i Regjistrimeve"
      data={data}
      columns={columns}
      dataReady={ready}
      actionBegin={handleActionBegin}
      dropdownOptions={[
        { text: "Switch to Dialog", id: "Dialog" },
        { text: "Switch to Inline", id: "Inline" }
      ]}
    />
    </>
  );
}


export default EnrollmentGrid;
