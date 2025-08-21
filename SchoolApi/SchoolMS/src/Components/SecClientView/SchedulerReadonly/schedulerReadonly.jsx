import { extend } from '@syncfusion/ej2-base';
import { Agenda, Day, DragAndDrop, Inject, Month, Resize, ScheduleComponent, ViewDirective, ViewsDirective, Week, WorkWeek, } from '@syncfusion/ej2-react-schedule';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAppointments } from '../../../Services/SchedulerApi';
 

const SchedulerReadonly = () => {
  const scheduleObj = useRef(null);
  const [appointments, setAppointments] = useState([]);
  const [scheduleData, setScheduleData] = useState(new Date());
  const navigate = useNavigate();

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

  return (
    <div className='sdiasvet'>
        <h2 className='babloki'>Menaxhimi Takimeve</h2>
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
        <ScheduleComponent height="730px"  ref={scheduleObj}  selectedDate={scheduleData} readonly={true} popupOpen={(args) => {
            if (args.type === 'Editor' || args.type === 'QuickInfo') {  args.cancel = true;  }
          }}
          eventSettings={{  dataSource: appointments,  allowAdding: false,  allowEditing: false, allowDeleting: false,  allowDragAndDrop: false, allowResizing: false,
            fields: {  id: 'id', subject: { name: 'subject' }, startTime: { name: 'startTime' }, endTime: { name: 'endTime' }, location: { name: 'location' }, description: { name: 'description' },  isAllDay: { name: 'isAllDay' }, recurrenceRule: { name: 'recurrenceRule' }, recurrenceException: { name: 'recurrenceException' }, recurrenceID: { name: 'recurrenceId' }, }, }} >
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
    </div>
  );
};

export default SchedulerReadonly;
