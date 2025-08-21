import { ColumnDirective, ColumnsDirective, Edit, Filter, ForeignKey, GridComponent, Inject, Page, Sort, Toolbar, } from '@syncfusion/ej2-react-grids';
import { DropDownButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import { useRef, useState } from 'react';

function GenericGrid({ title, data, columns, toolbarExtra = [], actionBegin, dataReady = true, dropdownOptions = null, dropdownLabel = "Edit Mode", pageSize = 14, gridHeight = 590}) {
  const [editMode, setEditMode] = useState("Dialog");
  const dropdownRef = useRef(null);

  const toolbarOptions = [
    "Add", "Edit", "Delete", "Update", "Cancel",
    ...(dropdownOptions ? [{
      template: () => (
        <DropDownButtonComponent ref={dropdownRef}  iconCss="e-icons e-edit"  items={dropdownOptions} select={(args) => setEditMode(args.item.id)} > {dropdownLabel}: {editMode}  </DropDownButtonComponent>
      ),
      align: "Right"
    }] : []),
    ...toolbarExtra,
    "Search"
  ];

  const editSettings = { allowAdding: true, allowEditing: true, allowDeleting: true, mode: editMode};
  const filterSettings = { type: 'Excel' };
  const pageSettings = { pageSize };

  return (
    <div>
      <h2 className="babloki">{title}</h2>
      {dataReady && (
        <GridComponent  dataSource={data}  toolbar={toolbarOptions}  allowPaging={true}  pageSettings={pageSettings} allowSorting={true} allowFiltering={true} filterSettings={filterSettings} editSettings={editSettings} actionBegin={actionBegin}  height={gridHeight}>
          <ColumnsDirective>
            {columns.map((col, idx) => (
              <ColumnDirective key={idx} {...col} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, Sort, Filter, ForeignKey]} />
        </GridComponent>
      )}
    </div>
  );
}

export default GenericGrid;