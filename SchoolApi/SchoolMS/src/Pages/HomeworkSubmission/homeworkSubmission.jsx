import { ColumnDirective, ColumnsDirective, Edit, Filter, ForeignKey, GridComponent, Inject, Page, Sort, Toolbar, } from '@syncfusion/ej2-react-grids';
import { DropDownButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationBanner from '../../Common/NotificationBanner/notificationBanner';
import { addHomeworkSubmission, deleteHomeworkSubmission, getAllHomeworkSubmissions, getHomeworkDropdown, getStudentDropdown, updateHomeworkSubmission } from '../../Services/HomeworkSubmissionApi';
import './homeworkSubmission.css';



function HomeworkSubmissionGrid() {
  const [submissions, setSubmissions] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
  const [students, setStudents] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
    const [editMode, setEditMode] = useState("Dialog");
  const dropdownRef = useRef(null);
    const [notification, setNotification] = useState({ message: "", type: "" });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hwRes, studentRes, subRes] = await Promise.all([
          getHomeworkDropdown(),
          getStudentDropdown(),
          getAllHomeworkSubmissions()
        ]);
        setHomeworks(hwRes.data);
        setStudents(studentRes.data);
        setSubmissions(subRes.data);
        setIsReady(true);
      } catch (err) {
        console.error("Gabim gjatë ngarkimit të submissions:", err);
        showNotification("Gabim gjatë ngarkimit!", "error");
      }
    };
    fetchData();
  }, [refresh]);


   const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const actionBegin = async (args) => {
    if (args.requestType === "save") {
      try {
        const submission = {
          submissionId: args.data.submissionId || 0,
          homeworkId: args.data.homeworkId,
          studentId: args.data.studentId,
          filePath: args.data.filePath,
          status: args.data.status || 'Submitted',
          submittedAt: args.data.submittedAt
            ? new Date(args.data.submittedAt).toISOString()
            : new Date().toISOString(),
          grade: args.data.grade || null,
        };

        if (args.data.submissionId) {
          await updateHomeworkSubmission(args.data.submissionId, submission);
          showNotification("Dorzimi i detyres u përditësua me sukses!", "success");
        } else {
          await addHomeworkSubmission(submission);
          showNotification("Dorzimi i detyres u shtua me sukses!", "success");
        }
        setRefresh(prev => !prev);
      } catch (err) {
        console.error("Gabim gjatë ruajtjes së submission:", err);
         showNotification("Gabim gjatë ruajtjes!", "error");
      }
    }

    if (args.requestType === "delete") {
      try {
        const id = args.data[0]?.submissionId;
        if (id) {
          await deleteHomeworkSubmission(id);
          showNotification("Dorzimi detyres u fshi me sukses!", "success");
          setRefresh(prev => !prev);
        }
      } catch (err) {
        console.error("Gabim gjatë fshirjes së submission:", err);
        showNotification("Gabim gjatë fshirjes!", "error");
      }
    }
  };



  const toolbarOptions = [ "Add", "Edit", "Delete", "Update","Cancel",
  {
    template: () => (
      <DropDownButtonComponent
        ref={dropdownRef}
        iconCss="e-icons e-edit"
        items={[
          { text: "Switch to Dialog", id: "Dialog" },
          { text: "Switch to Inline", id: "Inline" },
          { separator: true },
          { text: "Open Document Editor", id: "openDocEditor" },
        ]}
        select={(args) => {
          if (args.item.id === "Dialog" || args.item.id === "Inline") {
            setEditMode(args.item.id);
          }
          if (args.item.id === "openDocEditor") {
            navigate("/DocumentEditor");
          }
        }}
      >
        Opsionet
      </DropDownButtonComponent>
    ),
    align: "Right",
  },
  "Search",
];

  const editSettings = {allowEditing: true,  allowAdding: true,  allowDeleting: true,  mode: editMode };
  const filterSettings = { type: 'Excel' };
  const pageSettings = { pageSize: 14 };

const statusOptions = [
  { value: 'Submitted', text: 'Dorëzuar' },
  { value: 'Graded', text: 'Vlerësuar' },
  { value: 'Late', text: 'Me vonesë' },
];


  return (
    <>
      <NotificationBanner message={notification.message} type={notification.type} />
    <div>
      <h2 className="babloki">Menaxhimi i Detyrave të Dorëzuara</h2>
      {isReady && (
        <GridComponent  dataSource={submissions}  toolbar={toolbarOptions} allowPaging={true}  pageSettings={pageSettings} allowSorting={true}  allowFiltering={true}  filterSettings={filterSettings}  editSettings={editSettings} actionBegin={actionBegin}  height={590} >
          <ColumnsDirective>
            <ColumnDirective field="submissionId" headerText="ID" isPrimaryKey={true} isIdentity={true} visible={false} width="90" />
            <ColumnDirective  field="homeworkId"  headerText="Detyra"  width="180"  foreignKeyField="homeworkId"  foreignKeyValue="title"   dataSource={homeworks}  editType="dropdownedit"  validationRules={{ required: true }}  />
            <ColumnDirective  field="studentId"  headerText="Nxënësi"   width="160"   foreignKeyField="studentId"  foreignKeyValue="firstName"  dataSource={students}   editType="dropdownedit"   validationRules={{ required: true }} />
            <ColumnDirective field="filePath" headerText="File Path" width="200" />
            <ColumnDirective field="submittedAt" headerText="Data e Dorëzimit" format="yyyy-MM-dd" width="150" editType="datepickeredit" />
            <ColumnDirective  field="status"   headerText="Statusi"    width="120"   editType="dropdownedit" foreignKeyField="value"  foreignKeyValue="text"  dataSource={statusOptions} validationRules={{ required: true }}   />
            <ColumnDirective field="grade" headerText="Nota" width="120" textAlign="Right" format="N2" />
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, Sort, Filter, ForeignKey]} />
        </GridComponent>
      )}
    </div>
    </>
  );
}

export default HomeworkSubmissionGrid;
