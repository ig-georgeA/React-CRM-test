import { IgrActionStrip, IgrActionStripModule, IgrCellTemplateContext, IgrColumn, IgrGrid, IgrGridBaseDirective, IgrGridEditDoneEventArgs, IgrGridEditingActions, IgrGridModule, IgrGridPinningActions, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarAdvancedFiltering, IgrGridToolbarTitle, IgrPaginator, IgrPaginatorModule, IgrRowDataEventArgs } from '@infragistics/igniteui-react-grids';
import { IgrAvatar, IgrAvatarModule, IgrButton, IgrButtonModule, IgrDialog, IgrDialogModule, IgrInput, IgrInputModule, IgrRipple, IgrRippleModule, IgrSelect, IgrSelectItem, IgrSelectModule, IgrSnackbar, IgrSnackbarModule } from '@infragistics/igniteui-react';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { CustomerDto } from '../models/NorthwindSwagger/customer-dto';
import { deleteCustomerDto, postCustomerDto, putCustomerDto } from '../services/northwind-swagger';
import { formDataToObject } from '../utils/form-utils';
import { useGetCustomerDtoPagedResultDto } from '../hooks/northwind-swagger-hooks';
import '@infragistics/igniteui-react-grids/grids/combined.js';
import styles from './accounts.module.css';
import createClassTransformer from '../style-utils';

IgrActionStripModule.register();
IgrAvatarModule.register();
IgrButtonModule.register();
IgrDialogModule.register();
IgrGridModule.register();
IgrInputModule.register();
IgrPaginatorModule.register();
IgrRippleModule.register();
IgrSelectModule.register();
IgrSnackbarModule.register();

export default function Accounts() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>(null);
  const newAccountDialog = useRef<IgrDialog>(null);
  const snackbarsuccess = useRef<IgrSnackbar>(null);
  const snackbarerror = useRef<IgrSnackbar>(null);
  const [_selectedCustomer, setSelectedCustomer] = useState<CustomerDto | undefined>();
  const [grid_Page_Size, setGrid_Page_Size] = useState<number | undefined>(20);
  const [grid_Page_Index, setGrid_Page_Index] = useState<number | undefined>(0);
  const [value, setValue] = useState<string | undefined>('2');
  const [value1, setValue1] = useState<string | undefined>('1');
  const { northwindSwaggerCustomerDtoPagedResultDto: grid_Data_Request } = useGetCustomerDtoPagedResultDto(grid_Page_Index as any, grid_Page_Size as any, '');

  async function rowAddedGrid(_s: IgrGridBaseDirective, e: IgrRowDataEventArgs) {
    await postCustomerDto(e.detail.data);
  }
  async function rowEditDoneGrid(_s: IgrGridBaseDirective, e: IgrGridEditDoneEventArgs) {
    if (!e.detail.isAddRow) {
      await putCustomerDto(e.detail.rowData);
    }
  }
  async function rowDeletedGrid(_s: IgrGridBaseDirective, e: IgrRowDataEventArgs) {
    await deleteCustomerDto(e.detail.rowKey?.customerId);
  }
  async function submitCustomerDto(args: React.FormEvent<HTMLFormElement>) {
    args.preventDefault();
    const value = formDataToObject(args.target as HTMLFormElement);
    await postCustomerDto(value);
  }
  function onClickButton2() {
    form.current?.submit();
    newAccountDialog.current?.toggle();
    setGrid_Page_Index(parseFloat('0'));
  }

  const columnBodyTemplate = (ctx: { dataContext: IgrCellTemplateContext }) => {
    return (
      <>
        <a href="" onClick={() => navigate(`/account-detail?`)} className={classes("typography__body-2 hyperlink")}>
          <span>{ctx.dataContext.cell.value}</span>
        </a>
      </>
    )
  }

  return (
    <>
      <div className={classes("row-layout accounts-container")}>
        <div className={classes("row-layout group")}>
          <div className={classes("column-layout group_1")}>
            <div className={classes("column-layout group_2")}>
              <div className={classes("row-layout header")}>
                <div className={classes("row-layout page-title")}>
                  <IgrAvatar shape="rounded" className={classes("avatar")}>
                    <span className={classes("material-icons icon")} key={uuid()}>
                      <span key={uuid()}>apartment</span>
                    </span>
                  </IgrAvatar>
                  <h6 className={classes("h6")}>
                    <span>Accounts</span>
                  </h6>
                </div>
                <div className={classes("row-layout buttons")}>
                  <IgrButton type="button" onClick={() => newAccountDialog?.current?.toggle()} className={classes("button")}>
                    <span className={classes("material-icons")} key={uuid()}>
                      <span key={uuid()}>business</span>
                    </span>
                    <span key={uuid()}>New Account</span>
                    <IgrRipple key={uuid()}></IgrRipple>
                  </IgrButton>
                  <IgrButton variant="outlined" disabled type="button" className={classes("button")}>
                    <span className={classes("material-icons")} key={uuid()}>
                      <span key={uuid()}>search</span>
                    </span>
                    <span key={uuid()}>Discover companies</span>
                    <IgrRipple key={uuid()}></IgrRipple>
                  </IgrButton>
                  <IgrButton variant="outlined" disabled type="button" className={classes("button")}>
                    <span className={classes("material-icons")} key={uuid()}>
                      <span key={uuid()}>import_export</span>
                    </span>
                    <span key={uuid()}>Import</span>
                    <IgrRipple key={uuid()}></IgrRipple>
                  </IgrButton>
                </div>
              </div>
            </div>
            <div className={classes("row-layout filters-and-sorting")}>
              <div className={classes("row-layout group_3")}>
                <IgrSelect outlined={false} value={value} change={(_c, e) => setValue(e.detail.value)} className={classes("user-input")}>
                  <IgrSelectItem value="1" key="ec46060e-a744-4f16-83a6-addf8eb3efcd">
                    <span key={uuid()}>My Accounts</span>
                  </IgrSelectItem>
                  <IgrSelectItem value="2" key="0f8acdfb-b491-46f8-960b-dedfaff1efe4">
                    <span key={uuid()}>All Accounts</span>
                  </IgrSelectItem>
                </IgrSelect>
                <IgrInput type="Search" placeholder="Search accounts" outlined={true} className={classes("user-input")}>
                  <span slot="prefix" key={uuid()}>
                    <span className={classes("material-icons icon_1")} key={uuid()}>
                      <span key={uuid()}>search</span>
                    </span>
                  </span>
                </IgrInput>
              </div>
              <IgrSelect outlined={true} value={value1} change={(_c, e) => setValue1(e.detail.value)} className={classes("user-input")}>
                <IgrSelectItem value="1" key="38058920-2338-41f8-9a07-f5ca05bbb2d6">
                  <span key={uuid()}>Recently updated</span>
                </IgrSelectItem>
                <IgrSelectItem value="2" key="b0552bc2-6a36-4e3f-bf47-bac9d02e869d">
                  <span key={uuid()}>Name</span>
                </IgrSelectItem>
              </IgrSelect>
            </div>
            <IgrGrid data={grid_Data_Request?.items} primaryKey="customerId" rowSelection="single" rowEditable={true} pagingMode="Remote" allowFiltering={true} filterMode="excelStyleFilter" rowAdded={rowAddedGrid} rowEditDone={rowEditDoneGrid} rowDeleted={rowDeletedGrid} rowSelectionChanging={(_c, e) => setSelectedCustomer(e.detail.newSelection[0])} className={classes("ig-typography ig-scrollbar grid")} key={uuid()}>
              <IgrGridToolbar>
                <IgrGridToolbarActions>
                  <IgrGridToolbarAdvancedFiltering></IgrGridToolbarAdvancedFiltering>
                </IgrGridToolbarActions>
                <IgrGridToolbarTitle>
                  <span key={uuid()}>Grid Toolbar</span>
                </IgrGridToolbarTitle>
              </IgrGridToolbar>
              <IgrPaginator perPage={grid_Page_Size} totalRecords={grid_Data_Request?.totalRecordsCount} page={grid_Page_Index} perPageChange={(_c, e) => setGrid_Page_Size(e.detail)} pageChange={(_c, e) => setGrid_Page_Index(e.detail)}></IgrPaginator>
              <IgrColumn field="customerId" dataType="string" header="customerId" groupable={true} sortable={true} bodyTemplate={columnBodyTemplate} selectable={false}></IgrColumn>
              <IgrColumn field="companyName" dataType="string" header="companyName" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="contactName" dataType="string" header="contactName" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="contactTitle" dataType="string" header="contactTitle" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="address.street" dataType="string" header="address street" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="address.city" dataType="string" header="address city" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="address.region" dataType="string" header="address region" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="address.postalCode" dataType="string" header="address postalCode" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="address.country" dataType="string" header="address country" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="address.phone" dataType="string" header="address phone" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrActionStrip>
                <IgrGridPinningActions></IgrGridPinningActions>
                <IgrGridEditingActions addRow={true}></IgrGridEditingActions>
              </IgrActionStrip>
            </IgrGrid>
          </div>
        </div>
        <IgrDialog closeOnOutsideClick={true} ref={newAccountDialog}>
          <h5 slot="title" key={uuid()}>
            <span>New Account</span>
          </h5>
          <form onSubmit={submitCustomerDto} ref={form} className={classes("column-layout form")} key={uuid()}>
            <div className={classes("column-layout form_fields")}>
              <IgrInput label="Company name" required outlined={true} minLength={1} name="companyName">
                <p slot="value-missing" key={uuid()}>This field is required</p>
                <p slot="too-short" key={uuid()}>Entry should be at least 1 character(s) long</p>
              </IgrInput>
              <IgrInput label="Country" required outlined={true} minLength={1} name="address.country">
                <p slot="value-missing" key={uuid()}>This field is required</p>
                <p slot="too-short" key={uuid()}>Entry should be at least 1 character(s) long</p>
              </IgrInput>
              <IgrInput label="Contact name" outlined={true} name="contactName"></IgrInput>
              <IgrInput label="Contact title" outlined={true} name="contactTitle"></IgrInput>
              <IgrInput label="Street" outlined={true} name="address.street"></IgrInput>
              <IgrInput label="City" outlined={true} name="address.city"></IgrInput>
              <div className={classes("row-layout group_4")}>
                <IgrInput label="Region" outlined={true} name="address.region" className={classes("input")}></IgrInput>
                <IgrInput label="Postal code" outlined={true} name="address.postalCode" className={classes("input")}></IgrInput>
              </div>
              <IgrInput label="Phone" outlined={true} name="address.phone"></IgrInput>
            </div>
            <IgrSnackbar actionText="OK" action={() => snackbarsuccess?.current?.toggle()} ref={snackbarsuccess}>
              <span key={uuid()}>Your new submission was saved successfully!</span>
            </IgrSnackbar>
            <IgrSnackbar actionText="OK" action={() => snackbarerror?.current?.toggle()} ref={snackbarerror}>
              <span key={uuid()}>Uh-oh! Something went wrong.</span>
            </IgrSnackbar>
          </form>
          <div slot="footer" key={uuid()}>
            <IgrButton variant="outlined" type="button" onClick={() => newAccountDialog?.current?.toggle()} className={classes("button_1")} key={uuid()}>
              <span key={uuid()}>Cancel</span>
              <IgrRipple key={uuid()}></IgrRipple>
            </IgrButton>
            <IgrButton type="button" onClick={onClickButton2} className={classes("button_1")} key={uuid()}>
              <span key={uuid()}>Add</span>
              <IgrRipple key={uuid()}></IgrRipple>
            </IgrButton>
          </div>
        </IgrDialog>
      </div>
    </>
  );
}
