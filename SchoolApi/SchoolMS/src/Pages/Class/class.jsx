import { useEffect, useState } from 'react';
import GenericGrid from '../../Common/GenericGrid/genericGrid';
import NotificationBanner from '../../Common/NotificationBanner/notificationBanner';
import { addClass, deleteClass, getAllClasses, getHomeroomTeacherDropdown, updateClass } from '../../Services/ClassApi';
import './class.css';


function ClassGrid() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [ready, setReady] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });


  useEffect(() => {
    const fetch = async () => {
      try {
        const [classRes, teacherRes] = await Promise.all([getAllClasses(), getHomeroomTeacherDropdown()  ]);
         setClasses(classRes.data); setTeachers(teacherRes.data);  setReady(true);
      } catch (err) {
        console.error('Gabim gjatë ngarkimit të klasave:', err);
        showNotification("Gabim gjatë ngarkimit!", "error");
      }
    };
    fetch();
  }, [refresh]);


   const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const columns = [
    { field: 'classId',headerText: 'ID',isPrimaryKey: true,isIdentity: true,  visible: false, width: 100,  textAlign: 'Right'},
    { field: 'className',headerText: 'Emri i Klasës',width: 180,validationRules: { required: true } },
    { field: 'section',headerText: 'Seksioni',width: 150,validationRules: { required: true }},
    { field: 'academicYear',headerText: 'Viti Akademik',width: 150,validationRules: { required: true }},
    { field: 'homeroomTeacherId',headerText: 'Kujdestarët',foreignKeyField: 'teacherId',foreignKeyValue: 'firstName',dataSource: teachers,editType: 'dropdownedit',width: 180}
  ];

  const handleActionBegin = async (args) => {
    if (args.requestType === 'save') {
        try {
      const payload = {
        ClassId: args.data.classId || 0,
        ClassName: args.data.className,
        Section: args.data.section,
        AcademicYear: args.data.academicYear,
        homeroomTeacherId: args.data.homeroomTeacherId
          ? Number(args.data.homeroomTeacherId)
          : null
      };

  if (args.data.classId) {
            await updateClass(args.data.classId, payload);
            showNotification("Klasa u përditësua me sukses!", "success");
          } else {
            await addClass(payload);
            showNotification("Klasa u shtua me sukses!", "success");
          }
  
          setRefresh(prev => !prev);
        } catch (err) {
          console.error('Gabim gjatë ruajtjes së orarit:', err);
           showNotification("Gabim gjatë ruajtjes!", "error");
        }
      }  
  
      if (args.requestType === 'delete') {
        try {
          const id = args.data[0]?.classId;
          if (id) {
            await deleteClass(id);
            showNotification("Klasa u fshi me sukses!", "success");
            setRefresh(prev => !prev);
          }
        } catch (err) {
          console.error('Gabim gjatë fshirjes së orarit:', err);
           if (err.response?.status === 400 && err.response?.data) {
          showNotification(err.response.data, "error"); 
         } else {
         showNotification("Gabim i brendshëm në server.", "error");
         }
        }
      }
    };

  

  return (
     <>
      <NotificationBanner message={notification.message} type={notification.type} />
    <GenericGrid title="Menaxhimi i Klasave" data={classes} columns={columns} dataReady={ready} actionBegin={handleActionBegin}
     dropdownOptions={[
        { text: "Switch to Dialog", id: "Dialog" },
        { text: "Switch to Inline", id: "Inline" }
      ]}
    />
    </>
  );
}

export default ClassGrid;  
 
