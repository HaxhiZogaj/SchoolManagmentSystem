 import { extend } from '@syncfusion/ej2-base';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Agenda, Day, DragAndDrop, Inject, Month, Resize, ScheduleComponent, ViewDirective, ViewsDirective, Week, WorkWeek, } from '@syncfusion/ej2-react-schedule';
import { useEffect, useRef, useState } from 'react';
import NotificationBanner from '../../Common/NotificationBanner/notificationBanner';
import { addAppointment, deleteAppointment, getAllAppointments, updateAppointment, } from '../../Services/SchedulerApi';
import { PropertyPane } from './property-pane.jsx';
import './scheduler.css';


const Scheduler = () => {
  const scheduleObj = useRef(null);
  const [appointments, setAppointments] = useState([]);
   const [scheduleData, setScheduleData] = useState(new Date());
     const [notification, setNotification] = useState({ message: "", type: "" });

 
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAllAppointments();
        setAppointments(extend([], response.data, null, true));
      } catch (error) {
        console.error('Failed to load appointments', error);
      }
    };
    fetchAppointments();
  }, []); 

     const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };


  const onActionComplete = async (args) => {
    try {
      if (args.requestType === 'eventCreated') {
        const newEvent = args.data[0];
        await addAppointment(newEvent);
        showNotification("Data u shtua me sukses!", "success");
      }
      if (args.requestType === 'eventChanged') {
         const updatedEvent = Array.isArray(args.data) ? args.data[0] : args.data; // kjo osht pasi qe nuk mundet me prani id veq a veq pasi qe update eshte arrays
         await updateAppointment(updatedEvent.id, updatedEvent);
         showNotification("Data u përditësua me sukses!", "success");
      }
      if (args.requestType === 'eventRemoved') {
        const deletedEvent = args.data[0];
        await deleteAppointment(deletedEvent.id);
        showNotification("Klasa u fshi me sukses!", "success");
      }

      const response = await getAllAppointments();
      setAppointments(extend([], response.data, null, true));
    } catch (error) {
      console.error('Error performing action', error);
      showNotification("Gabim gjatë fshirjes!", "error");
    }
  };

  const change = (args) => {
    setScheduleData(args.value);
    scheduleObj.current.dataBind();
  };

  const onDragStart = (args) => {
    args.navigation.enable = true;
  };

return (
  <>
      <NotificationBanner message={notification.message} type={notification.type} />
  <div className='sdiasvet'>
    <h2 className='babloki'>Menaxhimi Takimeve</h2>
    <div className="scheduler-layout">
      <div className="col-lg-9 scheduler-control">
        <div className="control-wrapper">
          <ScheduleComponent
            height="650px"
            ref={scheduleObj}
            selectedDate={scheduleData}
            dragStart={onDragStart}
            actionComplete={onActionComplete}
            eventSettings={{
              dataSource: appointments,
              fields: {
                id: 'id',
                subject: { name: 'subject' },
                startTime: { name: 'startTime' },
                endTime: { name: 'endTime' },
                location: { name: 'location' },
                description: { name: 'description' },
                isAllDay: { name: 'isAllDay' },
                recurrenceRule: { name: 'recurrenceRule' },
                recurrenceException: { name: 'recurrenceException' },
                recurrenceID: { name: 'recurrenceId' }
              }
            }}
          >
            <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective option="Week" />
              <ViewDirective option="WorkWeek" />
              <ViewDirective option="Month" />
              <ViewDirective option="Agenda" />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
      <div className='col-lg-3 scheduler-property'>
        <PropertyPane title='Properties'>
          <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
            <tbody>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div className='datepicker-control-section'>
                    <DatePickerComponent
                      value={scheduleData}
                      showClearButton={false}
                      change={change}
                      placeholder='Current Date'
                      floatLabelType='Always'
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
    </div>
  </div>
  </>
);

};

export default Scheduler;


