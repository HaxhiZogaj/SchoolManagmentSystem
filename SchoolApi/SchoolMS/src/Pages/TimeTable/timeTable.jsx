import { useEffect, useState } from 'react';
import GenericGrid from '../../Common/GenericGrid/genericGrid';
import NotificationBanner from '../../Common/NotificationBanner/notificationBanner';
import { addTimetable, deleteTimetable, getAllTimetables, getClassSubjectDropdown, updateTimetable } from '../../Services/TimetableApi';
import './timeTable.css';


function TimetableGrid() {
  const [timetables, setTimetables] = useState([]);
  const [classSubjects, setClassSubjects] = useState([]);
  const [ready, setReady] = useState(false);
  const [refresh, setRefresh] = useState(false);
    const [notification, setNotification] = useState({ message: "", type: "" });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [timetableRes, csRes] = await Promise.all([
          getAllTimetables(),
          getClassSubjectDropdown()
        ]);
        setTimetables(timetableRes.data);
        setClassSubjects(csRes.data);
        setReady(true);
      } catch (error) {
        console.error('Gabim gjatë ngarkimit të të dhënave të orarit:', error);
        showNotification("Gabim gjatë ngarkimit!", "error");
      }
    };
    fetchData();
  }, [refresh]);

    const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const dayOptions = [
    { day: 'Monday', text: 'E Hënë' },
    { day: 'Tuesday', text: 'E Martë' },
    { day: 'Wednesday', text: 'E Mërkurë' },
    { day: 'Friday', text: 'E Premte' },
    { day: 'Thursday', text: 'E Enjte' },
  ];

  const columns = [
    {  field: 'timetableId', headerText: 'ID',  isPrimaryKey: true,  isIdentity: true,  visible: false }, 
    { field: 'classSubjectId', headerText: 'Lenda e Klases', foreignKeyField: 'classSubjectId', foreignKeyValue: 'classSubjectName',  dataSource: classSubjects,  validationRules: { required: true }, editType: 'dropdownedit',  width: 200 },
    {  field: 'dayOfWeek', headerText: 'Dita', foreignKeyField: 'day', foreignKeyValue: 'text', dataSource: dayOptions,  editType: 'dropdownedit', validationRules: { required: true }, width: 130 },
    { field: 'startTime', headerText: 'Ora Fillimit',format: 'HH:mm', editType: 'datetimepickeredit', width: 160 },
    { field: 'endTime', headerText: 'Ora Mbarimit', format: 'HH:mm',  editType: 'datetimepickeredit',  width: 160 },
    {  field: 'roomNumber',  headerText: 'Klasa',  width: 100 }
  ];



  const handleActionBegin = async (args) => {
    if (args.requestType === 'save') {
      try {
        const payload = {
          TimetableId: args.data.timetableId,
          ClassSubjectId: args.data.classSubjectId,
          DayOfWeek: args.data.dayOfWeek,
          StartTime: args.data.startTime
            ? new Date(args.data.startTime).toISOString().substring(11, 16)
            : '',
          EndTime: args.data.endTime
            ? new Date(args.data.endTime).toISOString().substring(11, 16)
            : '',
          RoomNumber: args.data.roomNumber
        };
        console.log("Payload being sent:", payload);

        if (args.data.timetableId) {
          await updateTimetable(args.data.timetableId, payload);
          showNotification("Orari u përditësua me sukses!", "success");
        } else {
          await addTimetable(payload);
          showNotification("Orari u shtua me sukses!", "success");
        }

        setRefresh(prev => !prev);
      } catch (err) {
        console.error('Gabim gjatë ruajtjes së orarit:', err);
         showNotification("Gabim gjatë ruajtjes!", "error");
      }
    }  

    if (args.requestType === 'delete') {
      try {
        const id = args.data[0]?.timetableId;
        if (id) {
          await deleteTimetable(id);
          showNotification("Orari u fshi me sukses!", "success");
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
    <GenericGrid  title="Menaxhimi i Orarit" data={timetables}  columns={columns} dataReady={ready} actionBegin={handleActionBegin}
      dropdownOptions={[
        { text: 'Switch to Dialog', id: 'Dialog' },
        { text: 'Switch to Inline', id: 'Inline' }
      ]}
    />
    </>
  );
}

export default TimetableGrid; 