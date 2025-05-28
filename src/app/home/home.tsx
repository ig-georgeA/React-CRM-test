import { IgrAvatar, IgrAvatarModule, IgrChip, IgrChipModule, IgrList, IgrListItem, IgrListModule } from '@infragistics/igniteui-react';
import { IgrCategoryChart, IgrCategoryChartModule } from '@infragistics/igniteui-react-charts';
import { IgrColumn, IgrGrid, IgrGridModule } from '@infragistics/igniteui-react-grids';
import { useNavigate } from 'react-router-dom';
import { useGetCustomerDtoList } from '../hooks/northwind-swagger-hooks';
import { useGetMeetingsTasksList } from '../hooks/crmapp-hooks';
import { useGetSales } from '../hooks/financial-hooks';
import '@infragistics/igniteui-react-grids/grids/combined.js';
import styles from './home.module.css';
import createClassTransformer from '../style-utils';

IgrAvatarModule.register();
IgrCategoryChartModule.register();
IgrChipModule.register();
IgrGridModule.register();
IgrListModule.register();

export default function Home() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const navigate = useNavigate();
  const { financialSales } = useGetSales();
  const { northwindSwaggerCustomerDto } = useGetCustomerDtoList();
  const { cRMAppMeetingsTasks } = useGetMeetingsTasksList();

  return (
    <>
      <div className={classes("row-layout home-container")}>
        <div className={classes("row-layout group")}>
          <div className={classes("column-layout group_1")}>
            <div className={classes("column-layout group_2")}>
              <p className={classes("typography__body-1 text")}>
                <span>Quarterly Performance</span>
              </p>
              <div className={classes("group_3")}>
                <IgrCategoryChart dataSource={financialSales} chartType="Column" initialGroups="Country" initialSummaries="SUM(Sales)" groupSorts="Country asc" computedPlotAreaMarginMode="Series"></IgrCategoryChart>
              </div>
              <a href="" onClick={() => navigate(`/reports`)} className={classes("typography__body-2 hyperlink")}>
                <span>View All Reports</span>
              </a>
            </div>
            <div className={classes("column-layout group_4")}>
              <p className={classes("typography__body-1 text")}>
                <span>New Contracts</span>
              </p>
              <IgrGrid data={northwindSwaggerCustomerDto} primaryKey="customerId" allowFiltering={true} filterMode="excelStyleFilter" className={classes("ig-typography ig-scrollbar grid")}>
                <IgrColumn field="customerId" dataType="string" header="customerId" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="companyName" dataType="string" header="companyName" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="contactName" dataType="string" header="contactName" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="contactTitle" dataType="string" header="contactTitle" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="address.street" dataType="string" header="address street" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="address.city" dataType="string" header="address city" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="address.region" dataType="string" header="address region" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="address.postalCode" dataType="string" header="address postalCode" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="address.country" dataType="string" header="address country" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="address.phone" dataType="string" header="address phone" sortable={true} selectable={false}></IgrColumn>
              </IgrGrid>
              <a href="" onClick={() => navigate(`/contracts`)} className={classes("typography__body-2 hyperlink")}>
                <span>View All Contracts</span>
              </a>
            </div>
          </div>
          <div className={classes("column-layout group_5")}>
            <div className={classes("column-layout group_6")}>
              <p className={classes("typography__body-1 text")}>
                <span>New Accounts</span>
              </p>
              <div className={classes("column-layout group_7")}>
                <IgrList className={classes("list")}>
                  {northwindSwaggerCustomerDto?.map((item) => (
                    <IgrListItem key={uuid()}>
                      <div slot="start" key={uuid()}>
                        <IgrAvatar shape="rounded" className={classes("avatar avatar_1")} key={uuid()}>
                          <span className={classes("material-icons icon")} key={uuid()}>
                            <span key={uuid()}>apartment</span>
                          </span>
                        </IgrAvatar>
                      </div>
                      <div key={uuid()}>
                        <div className={classes("column-layout group_8")} key={uuid()}>
                          <a href="" onClick={() => navigate(`/account-detail?`)} className={classes("typography__body-2 hyperlink_1")}>
                            <span>{item.companyName}</span>
                          </a>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>{item.customerId}</span>
                          </p>
                          <p className={classes("typography__caption text_2")}>
                            <span>{item.address?.country}</span>
                          </p>
                        </div>
                      </div>
                    </IgrListItem>
                  ))}
                </IgrList>
              </div>
              <a href="" onClick={() => navigate(`/accounts`)} className={classes("typography__body-2 hyperlink")}>
                <span>View All Accounts </span>
              </a>
            </div>
            <div className={classes("column-layout group_6")}>
              <p className={classes("typography__body-1 text")}>
                <span>Recent Contacts</span>
              </p>
              <div className={classes("column-layout group_7")}>
                <IgrList className={classes("list")}>
                  {northwindSwaggerCustomerDto?.map((item) => (
                    <IgrListItem key={uuid()}>
                      <div slot="start" key={uuid()}>
                        <IgrAvatar shape="rounded" className={classes("avatar avatar_2")} key={uuid()}>
                          <span className={classes("material-icons icon_1")} key={uuid()}>
                            <span key={uuid()}>person</span>
                          </span>
                        </IgrAvatar>
                      </div>
                      <div key={uuid()}>
                        <div className={classes("column-layout group_8")} key={uuid()}>
                          <a href="" className={classes("typography__body-2 hyperlink_2")}>
                            <span>{item.contactName}</span>
                          </a>
                          <div className={classes("row-layout group_9")}>
                            <p className={classes("typography__caption text_1")}>
                              <span>{item.contactTitle}</span>
                            </p>
                            <p className={classes("typography__caption text_2")}>
                              <span>@</span>
                            </p>
                            <p className={classes("typography__caption text_1")}>
                              <span>{item.customerId}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </IgrListItem>
                  ))}
                </IgrList>
              </div>
              <a href="" onClick={() => navigate(`/contacts`)} className={classes("typography__body-2 hyperlink")}>
                <span>View All Contacts </span>
              </a>
            </div>
          </div>
          <div className={classes("column-layout group_5")}>
            <div className={classes("column-layout group_4")}>
              <p className={classes("typography__body-1 text")}>
                <span>My Meetings</span>
              </p>
              <IgrList className={classes("list")}>
                {cRMAppMeetingsTasks?.map((item) => (
                  <IgrListItem key={uuid()}>
                    <div slot="start" key={uuid()}>
                      <IgrAvatar className={classes("avatar avatar_3")} key={uuid()}>
                        <span className={classes("material-icons icon_2")} key={uuid()}>
                          <span key={uuid()}>calendar_month</span>
                        </span>
                      </IgrAvatar>
                    </div>
                    <div key={uuid()}>
                      <div className={classes("column-layout group_10")} key={uuid()}>
                        <div className={classes("row-layout group_11")}>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>Meeting with </span>
                          </p>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>{item.Contact}</span>
                          </p>
                        </div>
                        <div className={classes("row-layout group_12")}>
                          <p className={classes("typography__caption text_2")}>
                            <span>{item.MeetingDate}</span>
                          </p>
                          <p className={classes("typography__caption text_2")}>
                            <span>-</span>
                          </p>
                          <p className={classes("typography__caption text_2")}>
                            <span>{item.MeetingTime}</span>
                          </p>
                        </div>
                        <IgrChip className={classes("chip")}>
                          <span key={uuid()}>{item.MeetingType}</span>
                        </IgrChip>
                      </div>
                    </div>
                  </IgrListItem>
                ))}
              </IgrList>
              <a href="" onClick={() => navigate(`/calendar`)} className={classes("typography__body-2 hyperlink")}>
                <span>View Calendar</span>
              </a>
            </div>
            <div className={classes("column-layout group_4")}>
              <p className={classes("typography__body-1 text")}>
                <span>Today’s Tasks</span>
              </p>
              <IgrList className={classes("list")}>
                {cRMAppMeetingsTasks?.map((item) => (
                  <IgrListItem key={uuid()}>
                    <div slot="start" key={uuid()}>
                      <IgrAvatar className={classes("avatar avatar_4")} key={uuid()}>
                        <span className={classes("material-icons icon_2")} key={uuid()}>
                          <span key={uuid()}>task_alt</span>
                        </span>
                      </IgrAvatar>
                    </div>
                    <div key={uuid()}>
                      <div className={classes("column-layout group_10")} key={uuid()}>
                        <div className={classes("row-layout group_13")}>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>{item.Task}</span>
                          </p>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>-</span>
                          </p>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>{item.Company}</span>
                          </p>
                        </div>
                        <div className={classes("row-layout group_14")}>
                          <p className={classes("typography__caption text_2")}>
                            <span>Due by</span>
                          </p>
                          <p className={classes("typography__caption text_2")}>
                            <span>{item.DueDate}</span>
                          </p>
                        </div>
                        <IgrChip className={classes("chip")}>
                          <span key={uuid()}>{item.TaskStatus}</span>
                        </IgrChip>
                      </div>
                    </div>
                  </IgrListItem>
                ))}
              </IgrList>
              <a href="" onClick={() => navigate(`/tasks`)} className={classes("typography__body-2 hyperlink")}>
                <span>View Tasks</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
