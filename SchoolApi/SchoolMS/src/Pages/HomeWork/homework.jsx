import { useEffect, useState } from 'react';
import GenericGrid from '../../Common/GenericGrid/genericGrid';
import NotificationBanner from '../../Common/NotificationBanner/notificationBanner';
import {
  addHomework,
  deleteHomework,
  getAllHomeworks,
  getClassSubjectDropdown,
  updateHomework
} from '../../Services/HomeworkApi';


function HomeworkGrid() {
  const [homeworks, setHomeworks] = useState([]);
  const [classSubjects, setClassSubjects] = useState([]);
  const [ready, setReady] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeworkRes, classSubjectRes] = await Promise.all([
          getAllHomeworks(),
          getClassSubjectDropdown()
        ]);
        setHomeworks(homeworkRes.data);
        setClassSubjects(classSubjectRes.data);
        setReady(true);
      } catch (err) {
        console.error('Gabim gjatë ngarkimit të detyrave:', err);
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
    {
      field: 'homeworkId',
      headerText: 'ID',
      isPrimaryKey: true,
      isIdentity: true,
      visible: false,
      width: 100,
      textAlign: 'Right'
    },
    {
      field: 'title',
      headerText: 'Titulli',
      validationRules: { required: true },
      width: 180
    },
    {
      field: 'description',
      headerText: 'Përshkrimi',
      width: 250
    },
    {
      field: 'dueDate',
      headerText: 'Afati',
      type: 'date',
      format: 'yMd',
      editType: 'datepickeredit',
      width: 150
    },
    {
      field: 'classSubjectId',
      headerText: 'Lenda e Klases',
      foreignKeyField: 'classSubjectId',
      foreignKeyValue: 'classSubjectName',
       dataSource: classSubjects, 
      validationRules: { required: true },
      editType: 'dropdownedit',
      width: 200
    }
  ];

  const handleActionBegin = async (args) => {
    if (args.requestType === 'save') {
      try {
        const payload = {
          homeworkId: args.data.homeworkId || 0,
          title: args.data.title,
          description: args.data.description,
          dueDate: args.data.dueDate,
          classSubjectId: args.data.classSubjectId
        };

        if (args.data.homeworkId) {
          await updateHomework(args.data.homeworkId, payload);
           showNotification("Detyra e Shtepise u përditësua me sukses!", "success");
        } else {
          await addHomework(payload);
           showNotification("Detyra e Shtepise u shtua me sukses!", "success");
        }

        setRefresh((prev) => !prev);
      } catch (err) {
        console.error('Gabim gjatë ruajtjes së detyrës:', err);
        showNotification("Gabim gjatë ruajtjes!", "error");
      }
    }

    if (args.requestType === 'delete') {
      try {
        const id = args.data[0]?.homeworkId;
        if (id) {
          await deleteHomework(id);
          showNotification("Detyra e Shtepise u fshi me sukses!", "success");
          setRefresh((prev) => !prev);
        }
      } catch (err) {
        console.error('Gabim gjatë fshirjes së detyrës:', err);
        showNotification("Gabim gjatë fshirjes!", "error");
      }
    }
  };

  return (
      <>
      <NotificationBanner message={notification.message} type={notification.type} />
    <GenericGrid
      title="Menaxhimi i Detyrave"
      data={homeworks}
      columns={columns}
      dataReady={ready}
      actionBegin={handleActionBegin}
      dropdownOptions={[
        { text: 'Switch to Dialog', id: 'Dialog' },
        { text: 'Switch to Inline', id: 'Inline' }
      ]}
    />
    </>
  );
}

export default HomeworkGrid;