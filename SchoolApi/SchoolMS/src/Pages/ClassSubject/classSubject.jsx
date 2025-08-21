import { DataManager } from '@syncfusion/ej2-data';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { useEffect, useState } from 'react';
import GenericGrid from '../../Common/GenericGrid/genericGrid';
import NotificationBanner from '../../Common/NotificationBanner/notificationBanner';
import { addClassSubject, deleteClassSubject, getAllClassSubjects, getClassDropdown, getSubjectDropdown, getTeacherDropdown, updateClassSubject } from '../../Services/ClassSubjectApi';
import './classSubject.css';

function ClassSubjectGrid() {
  const [data, setData] = useState([]);
  const [ready, setReady] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [csData, classList, subjectList, teacherList] = await Promise.all([ getAllClassSubjects(),  getClassDropdown(),  getSubjectDropdown(),  getTeacherDropdown() ]);
        setData(csData.data); setClasses(classList.data); setSubjects(subjectList.data); setTeachers(teacherList.data); setReady(true);
      } catch (err) {
        console.error('Gabim gjatë ngarkimit të të dhënave:', err);
        showNotification("Gabim gjatë ngarkimit!", "error");
      }
    };
    fetchData();
  }, [refresh]);

    const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const createDropdownEditor = (dropdownData, textField, valueField) => {
    let elem, dropObj;
    return {
      create: () => {
        elem = document.createElement('input');
        return elem;
      },
      destroy: () => {
        dropObj?.destroy();
      },
      read: () => dropObj?.value,
      write: (args) => {
        dropObj = new DropDownList({
          dataSource: new DataManager(dropdownData),
          fields: { text: textField, value: valueField },
          value: args.rowData[args.column.field],
          allowFiltering: true,
          popupHeight: '300px'
        });
        dropObj.appendTo(elem);
      }
    };
  };

  const columns = [
    { field: 'classSubjectId', isPrimaryKey: true, isIdentity: true, visible: false, width: 100 },
    { field: 'classSubjectName', headerText: 'Lenda e Klases', validationRules: { required: true }, width: 100 },
    { field: 'classId', headerText: 'Klasat',  foreignKeyField: 'classId',foreignKeyValue: 'className',dataSource: classes,editType: 'dropdownedit', width: 100},
      { field: 'subjectId',headerText: 'Lëndët',foreignKeyField: 'subjectId',foreignKeyValue: 'subjectName',dataSource: subjects,editType: 'dropdownedit',width: 100},
      { field: 'teacherId',headerText: 'Mësuesit',foreignKeyField: 'teacherId',foreignKeyValue: 'firstName',dataSource: teachers,editType: 'dropdownedit',width: 100}
  ];

    


  const handleActionBegin = async (args) => {
    if (args.requestType === 'save') {
      try {
        const payload = {
          ClassSubjectId: args.data.classSubjectId || 0,
          ClassSubjectName: args.data.classSubjectName,
          ClassId: Number(args.data.classId),
          SubjectId: Number(args.data.subjectId),
          TeacherId: Number(args.data.teacherId)
        };

        if (args.data.classSubjectId) {
          await updateClassSubject(args.data.classSubjectId, payload);
           showNotification("Lenda e Klases u përditësua me sukses!", "success");
        } else {
          await addClassSubject(payload);
           showNotification("Lenda e Klases u shtua me sukses!", "success");
        }

        setRefresh(prev => !prev);
      } catch (err) {
        console.error('Gabim gjatë ruajtjes:', err);
       showNotification("Gabim gjatë ruajtjes!", "error");

      }
    }

    if (args.requestType === 'delete') {
      try {
        const id = args.data[0]?.classSubjectId;
        if (id) {
          await deleteClassSubject(id);
         showNotification("Lenda e Klases u fshi me sukses!", "success");
          setRefresh(prev => !prev);
        }
      } catch (err) {
        console.error('Gabim gjatë fshirjes:', err);
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
    <GenericGrid title="Menaxhimi Lëndëve të Klasës" data={data} columns={columns} dataReady={ready} actionBegin={handleActionBegin} 
    dropdownOptions={[
        { text: 'Switch to Dialog', id: 'Dialog' },
        { text: 'Switch to Inline', id: 'Inline' }
      ]}
    />
    </>
  );
}

export default ClassSubjectGrid;