import { IgrAccordion, IgrAccordionModule, IgrAvatar, IgrAvatarModule, IgrButton, IgrButtonModule, IgrCheckbox, IgrCheckboxModule, IgrChip, IgrChipModule, IgrExpansionPanel, IgrExpansionPanelModule, IgrList, IgrListItem, IgrListModule, IgrRipple, IgrRippleModule, IgrTab, IgrTabPanel, IgrTabs, IgrTabsModule } from '@infragistics/igniteui-react';
import { IgrColumn, IgrGrid, IgrGridModule, IgrGridToolbar, IgrGridToolbarTitle } from '@infragistics/igniteui-react-grids';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OrderDto } from '../models/NorthwindSwagger/order-dto';
import { useGetCustomerDto, useGetOrderDtoList, useGetProductDtoList } from '../hooks/northwind-swagger-hooks';
import '@infragistics/igniteui-react-grids/grids/combined.js';
import styles from './account-detail.module.css';
import createClassTransformer from '../style-utils';

IgrAccordionModule.register();
IgrAvatarModule.register();
IgrButtonModule.register();
IgrCheckboxModule.register();
IgrChipModule.register();
IgrExpansionPanelModule.register();
IgrGridModule.register();
IgrListModule.register();
IgrRippleModule.register();
IgrTabsModule.register();

export default function AccountDetail() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const navigate = useNavigate();
  const routeParams = useParams();
  const rCustomerID = routeParams.rCustomerID ?? 'AROUT';
  const __loaded = useRef<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDto | undefined>();
  const { northwindSwaggerCustomerDto: selectedCustomer1 } = useGetCustomerDto(rCustomerID);
  const { northwindSwaggerOrderDto } = useGetOrderDtoList(rCustomerID);
  const { northwindSwaggerProductDto } = useGetProductDtoList(selectedOrder?.orderId as any);

  useEffect(() => {
    if (__loaded.current) {
      setSelectedOrder(undefined);
    }
  }, [selectedCustomer1]);

  useEffect(() => {
    __loaded.current = true;
    return () => {
      __loaded.current = false;
    }
  }, []);

  return (
    <>
      <div className={classes("column-layout account-detail-container")}>
        <div className={classes("column-layout group")}>
          <IgrButton variant="flat" type="button" onClick={() => navigate(`/accounts`)} className={classes("button")}>
            <span className={classes("material-icons")} key={uuid()}>
              <span key={uuid()}>arrow_back</span>
            </span>
            <span key={uuid()}>All accounts</span>
            <IgrRipple key={uuid()}></IgrRipple>
          </IgrButton>
          <div className={classes("row-layout account-header")}>
            <div className={classes("row-layout page-title")}>
              <IgrAvatar shape="rounded" className={classes("avatar")}>
                <span className={classes("material-icons icon")} key={uuid()}>
                  <span key={uuid()}>apartment</span>
                </span>
              </IgrAvatar>
              <div className={classes("row-layout group_1")}>
                <h5 className={classes("content")}>
                  <span>{selectedCustomer1?.companyName}</span>
                </h5>
                <p className={classes("typography__body-1 text")}>
                  <span>{selectedCustomer1?.customerId}</span>
                </p>
              </div>
            </div>
            <div className={classes("row-layout group_2")}>
              <div className={classes("column-layout group_3")}>
                <p className={classes("typography__subtitle-2 content")}>
                  <span>Primary Contact</span>
                </p>
                <p className={classes("typography__body-1 text")}>
                  <span>{selectedCustomer1?.contactName}</span>
                </p>
                <p className={classes("typography__body-1 text")}>
                  <span>Sales Representative</span>
                </p>
              </div>
              <div className={classes("column-layout group_3")}>
                <p className={classes("typography__subtitle-2 content")}>
                  <span>Billing Address</span>
                </p>
                <p className={classes("typography__body-1 text")}>
                  <span>{selectedCustomer1?.address?.street}</span>
                </p>
                <div className={classes("column-layout group_4")}>
                  <div className={classes("row-layout group_5")}>
                    <p className={classes("typography__body-1 text")}>
                      <span>{selectedCustomer1?.address?.city}</span>
                    </p>
                    <p className={classes("typography__body-1 text")}>
                      <span>{selectedCustomer1?.address?.country}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className={classes("column-layout group_3")}>
                <p className={classes("typography__subtitle-2 content")}>
                  <span>Phone</span>
                </p>
                <p className={classes("typography__body-1 text")}>
                  <span>{selectedCustomer1?.address?.phone}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={classes("row-layout group_6")}>
          <div className={classes("column-layout group_7")}>
            <IgrTabs className={classes("tabs")}>
              <IgrTab selected={true} key={uuid()}>
                <span key={uuid()}>Sales</span>
              </IgrTab>
              <IgrTabPanel className={classes("column-layout tab-item-content")} key={uuid()}>
                <IgrGrid data={northwindSwaggerOrderDto} primaryKey="orderId" rowSelection="single" allowFiltering={true} filterMode="excelStyleFilter" rowSelectionChanging={(_c, e) => setSelectedOrder(e.detail.newSelection[0])} className={classes("ig-typography ig-scrollbar grid")}>
                  <IgrGridToolbar>
                    <IgrGridToolbarTitle>
                      <span key={uuid()}>Orders</span>
                    </IgrGridToolbarTitle>
                  </IgrGridToolbar>
                  <IgrColumn field="orderId" dataType="number" header="orderId" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipVia" dataType="string" header="shipVia" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipperId" dataType="number" header="shipperId" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="orderDate" dataType="date" header="orderDate" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="requiredDate" dataType="date" header="requiredDate" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="freight" dataType="number" header="freight" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="completed" dataType="boolean" header="completed" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipAddress.street" dataType="string" header="shipAddress street" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipAddress.city" dataType="string" header="shipAddress city" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipAddress.region" dataType="string" header="shipAddress region" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipAddress.postalCode" dataType="string" header="shipAddress postalCode" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipAddress.country" dataType="string" header="shipAddress country" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipAddress.phone" dataType="string" header="shipAddress phone" groupable={true} sortable={true} selectable={false}></IgrColumn>
                </IgrGrid>
                <IgrGrid data={northwindSwaggerProductDto} primaryKey="productId" allowFiltering={true} filterMode="excelStyleFilter" className={classes("ig-typography ig-scrollbar grid")}>
                  <IgrGridToolbar>
                    <IgrGridToolbarTitle>
                      <span key={uuid()}>Order details</span>
                    </IgrGridToolbarTitle>
                  </IgrGridToolbar>
                  <IgrColumn field="productId" dataType="number" header="productId" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="productName" dataType="string" header="productName" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="supplierId" dataType="number" header="supplierId" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="categoryId" dataType="number" header="categoryId" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="quantityPerUnit" dataType="string" header="quantityPerUnit" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="unitPrice" dataType="number" header="unitPrice" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="unitsInStock" dataType="number" header="unitsInStock" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="unitsOnOrder" dataType="number" header="unitsOnOrder" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="reorderLevel" dataType="number" header="reorderLevel" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="discontinued" dataType="boolean" header="discontinued" sortable={true} selectable={false}></IgrColumn>
                </IgrGrid>
              </IgrTabPanel>
              <IgrTabPanel className={classes("column-layout tab-item-content")} key={uuid()}>
                <div className={classes("row-layout buttons-1")} key={uuid()}>
                  <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                    <span className={classes("material-icons")} key={uuid()}>
                      <span key={uuid()}>person_add</span>
                    </span>
                    <span key={uuid()}>Contact</span>
                    <IgrRipple key={uuid()}></IgrRipple>
                  </IgrButton>
                  <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                    <span className={classes("material-icons")} key={uuid()}>
                      <span key={uuid()}>star_border</span>
                    </span>
                    <span key={uuid()}>New Opportunity</span>
                    <IgrRipple key={uuid()}></IgrRipple>
                  </IgrButton>
                  <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                    <span className={classes("material-icons")} key={uuid()}>
                      <span key={uuid()}>error_outline</span>
                    </span>
                    <span key={uuid()}>New Case</span>
                    <IgrRipple key={uuid()}></IgrRipple>
                  </IgrButton>
                  <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                    <span className={classes("material-icons")} key={uuid()}>
                      <span key={uuid()}>note_add</span>
                    </span>
                    <span key={uuid()}>Add note</span>
                    <IgrRipple key={uuid()}></IgrRipple>
                  </IgrButton>
                  <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                    <span className={classes("material-icons")} key={uuid()}>
                      <span key={uuid()}>file_copy</span>
                    </span>
                    <span key={uuid()}>Add files</span>
                    <IgrRipple key={uuid()}></IgrRipple>
                  </IgrButton>
                </div>
                <IgrAccordion singleExpand={true} className={classes("accordion")} key={uuid()}>
                  <IgrExpansionPanel open={true} indicatorPosition="end" key={uuid()}>
                    <div className={classes("column-layout group_8")} key={uuid()}>
                      <div className={classes("row-layout group_9")}>
                        <IgrAvatar initials="JL" shape="circle" className={classes("avatar_2")}></IgrAvatar>
                        <a href="" className={classes("typography__body-2 hyperlink")}>
                          <span>Janine Labrune</span>
                        </a>
                      </div>
                      <div className={classes("column-layout group_10")}>
                        <div className={classes("row-layout group_11")}>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>Account Name:</span>
                          </p>
                          <p className={classes("typography__body-2 text")}>
                            <span>Thomas Hardy</span>
                          </p>
                        </div>
                        <div className={classes("row-layout group_11")}>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>Title:</span>
                          </p>
                          <p className={classes("typography__body-2 text")}>
                            <span>Owner</span>
                          </p>
                        </div>
                        <div className={classes("row-layout group_12")}>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>Direct:</span>
                          </p>
                          <IgrCheckbox className={classes("checkbox")}></IgrCheckbox>
                        </div>
                      </div>
                    </div>
                    <span slot="title" key={uuid()}>Related Contacts (1)</span>
                  </IgrExpansionPanel>
                  <IgrExpansionPanel indicatorPosition="end" key={uuid()}>
                    <div className={classes("column-layout group_8")} key={uuid()}>
                      <div className={classes("row-layout group_9")}>
                        <IgrAvatar src="/src/assets/Account-List-Avatar-Icon.svg" shape="rounded" className={classes("avatar_3")}></IgrAvatar>
                        <a href="" className={classes("typography__body-2 hyperlink")}>
                          <span>Around The Horn</span>
                        </a>
                      </div>
                      <div className={classes("column-layout group_10")}>
                        <div className={classes("row-layout group_11")}>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>Stage:</span>
                          </p>
                          <p className={classes("typography__body-2 text")}>
                            <span>Qualification</span>
                          </p>
                        </div>
                        <div className={classes("row-layout group_11")}>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>Amount:</span>
                          </p>
                          <p className={classes("typography__body-2 text")}>
                            <span>Owner</span>
                          </p>
                        </div>
                        <div className={classes("row-layout group_11")}>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>Close Date:</span>
                          </p>
                          <p className={classes("typography__body-2 text")}>
                            <span>9/12/2022</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <span slot="title" key={uuid()}>Opportunities (1)</span>
                  </IgrExpansionPanel>
                  <IgrExpansionPanel indicatorPosition="end" key={uuid()}>
                    <IgrList className={classes("list")} key={uuid()}>
                      <IgrListItem key={uuid()}>
                        <div slot="start" key={uuid()}>
                          <IgrAvatar shape="circle" className={classes("avatar_1 avatar_1_1")} key={uuid()}>
                            <span className={classes("material-icons icon_1")} key={uuid()}>
                              <span key={uuid()}>insert_drive_file</span>
                            </span>
                          </IgrAvatar>
                        </div>
                        <div key={uuid()}>
                          <a href="" className={classes("typography__body-2 hyperlink_1")} key={uuid()}>
                            <span>Around-The-Horn-Contract-2022.docx</span>
                          </a>
                        </div>
                      </IgrListItem>
                      <IgrListItem key={uuid()}>
                        <div slot="start" key={uuid()}>
                          <IgrAvatar shape="circle" className={classes("avatar_1 avatar_1_2")} key={uuid()}>
                            <span className={classes("material-icons icon_1")} key={uuid()}>
                              <span key={uuid()}>insert_drive_file</span>
                            </span>
                          </IgrAvatar>
                        </div>
                        <div key={uuid()}>
                          <a href="" className={classes("typography__body-2 hyperlink_1")} key={uuid()}>
                            <span>Around-The-Horn-Contract-2021.docx</span>
                          </a>
                        </div>
                      </IgrListItem>
                    </IgrList>
                    <span slot="title" key={uuid()}>Contracts (2)</span>
                  </IgrExpansionPanel>
                  <IgrExpansionPanel indicatorPosition="end" key={uuid()}>
                    <p className={classes("typography__body-2 text_2")} key={uuid()}>
                      <span>No cases filed.</span>
                    </p>
                    <span slot="title" key={uuid()}>Cases (0)</span>
                  </IgrExpansionPanel>
                  <IgrExpansionPanel indicatorPosition="end" key={uuid()}>
                    <p className={classes("typography__body-2 text_2")} key={uuid()}>
                      <span>No notes added.</span>
                    </p>
                    <span slot="title" key={uuid()}>Notes (0)</span>
                  </IgrExpansionPanel>
                  <IgrExpansionPanel indicatorPosition="end" key={uuid()}>
                    <p className={classes("typography__body-2 text_2")} key={uuid()}>
                      <span>No files uploaded</span>
                    </p>
                    <span slot="title" key={uuid()}>Files (0)</span>
                  </IgrExpansionPanel>
                </IgrAccordion>
              </IgrTabPanel>
              <IgrTab key={uuid()}>
                <span className={classes("material-icons")} key={uuid()}>
                  <span key={uuid()}>info</span>
                </span>
                <span key={uuid()}>Related</span>
              </IgrTab>
              <IgrTabPanel className={classes("row-layout tab-item-content_1")} key={uuid()}>
                <div className={classes("row-layout demo-content")} key={uuid()}>
                  <img src="/src/assets/start-building-dark.svg" className={classes("image")} />
                  <p className={classes("typography__body-2 text_3")}>
                    <span>Remove the "demo-content" container, and add your own content.</span>
                  </p>
                </div>
              </IgrTabPanel>
              <IgrTab disabled key={uuid()}>
                <span className={classes("material-icons")} key={uuid()}>
                  <span key={uuid()}>info</span>
                </span>
                <span key={uuid()}>Details</span>
              </IgrTab>
              <IgrTabPanel className={classes("row-layout tab-item-content_1")} key={uuid()}>
                <div className={classes("row-layout demo-content-1")} key={uuid()}>
                  <img src="/src/assets/start-building-dark.svg" className={classes("image")} />
                  <p className={classes("typography__body-2 text_3")}>
                    <span>Remove the "demo-content" container, and add your own content.</span>
                  </p>
                </div>
              </IgrTabPanel>
              <IgrTab disabled key={uuid()}>
                <span className={classes("material-icons")} key={uuid()}>
                  <span key={uuid()}>info</span>
                </span>
                <span key={uuid()}>News</span>
              </IgrTab>
            </IgrTabs>
          </div>
          <div className={classes("column-layout group_13")}>
            <IgrTabs className={classes("tabs")}>
              <IgrTabPanel className={classes("column-layout tab-item-content_2")} key={uuid()}>
                <div className={classes("column-layout group_14")} key={uuid()}>
                  <div className={classes("row-layout buttons")}>
                    <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                      <span className={classes("material-icons")} key={uuid()}>
                        <span key={uuid()}>calendar_today</span>
                      </span>
                      <span key={uuid()}>New Meeting</span>
                      <IgrRipple key={uuid()}></IgrRipple>
                    </IgrButton>
                    <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                      <span className={classes("material-icons")} key={uuid()}>
                        <span key={uuid()}>assignment</span>
                      </span>
                      <span key={uuid()}>New task</span>
                      <IgrRipple key={uuid()}></IgrRipple>
                    </IgrButton>
                    <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                      <span className={classes("material-icons")} key={uuid()}>
                        <span key={uuid()}>call</span>
                      </span>
                      <span key={uuid()}>Log a call</span>
                      <IgrRipple key={uuid()}></IgrRipple>
                    </IgrButton>
                  </div>
                  <IgrAccordion singleExpand={true} className={classes("accordion")}>
                    <IgrExpansionPanel indicatorPosition="end" key={uuid()}>
                      <IgrList className={classes("list")} key={uuid()}>
                        <IgrListItem key={uuid()}>
                          <div slot="start" key={uuid()}>
                            <IgrAvatar src="/src/assets/Calendar-Avatar-Icon.svg" className={classes("avatar_1 avatar_1_3")} key={uuid()}></IgrAvatar>
                          </div>
                          <div key={uuid()}>
                            <div className={classes("column-layout group_15")} key={uuid()}>
                              <div className={classes("row-layout group_16")}>
                                <p className={classes("typography__subtitle-2 text_4")}>
                                  <span>Project Intro</span>
                                </p>
                              </div>
                              <div className={classes("row-layout group_17")}>
                                <p className={classes("typography__caption text_2")}>
                                  <span>11/1/2022</span>
                                </p>
                                <p className={classes("typography__caption text_2")}>
                                  <span>-</span>
                                </p>
                                <p className={classes("typography__caption text_2")}>
                                  <span>10am</span>
                                </p>
                              </div>
                              <IgrChip className={classes("chip")}>
                                <span key={uuid()}>Zoom Meeting</span>
                              </IgrChip>
                            </div>
                          </div>
                        </IgrListItem>
                        <IgrListItem key={uuid()}>
                          <div slot="start" key={uuid()}>
                            <IgrAvatar src="/src/assets/Calendar-Avatar-Icon.svg" className={classes("avatar_1 avatar_1_4")} key={uuid()}></IgrAvatar>
                          </div>
                          <div key={uuid()}>
                            <div className={classes("column-layout group_15")} key={uuid()}>
                              <div className={classes("row-layout group_16")}>
                                <p className={classes("typography__subtitle-2 text_4")}>
                                  <span>Sync Meeting</span>
                                </p>
                              </div>
                              <div className={classes("row-layout group_17")}>
                                <p className={classes("typography__caption text_2")}>
                                  <span>11/7/2022</span>
                                </p>
                                <p className={classes("typography__caption text_2")}>
                                  <span>-</span>
                                </p>
                                <p className={classes("typography__caption text_2")}>
                                  <span>2pm</span>
                                </p>
                              </div>
                              <IgrChip className={classes("chip")}>
                                <span key={uuid()}>On Site Meeting</span>
                              </IgrChip>
                            </div>
                          </div>
                        </IgrListItem>
                        <IgrListItem key={uuid()}>
                          <div slot="start" key={uuid()}>
                            <IgrAvatar src="/src/assets/Calendar-Avatar-Icon.svg" className={classes("avatar_1 avatar_1_5")} key={uuid()}></IgrAvatar>
                          </div>
                          <div key={uuid()}>
                            <div className={classes("column-layout group_15")} key={uuid()}>
                              <div className={classes("row-layout group_16")}>
                                <p className={classes("typography__subtitle-2 text_4")}>
                                  <span>Wrap Up Meeting</span>
                                </p>
                              </div>
                              <div className={classes("row-layout group_17")}>
                                <p className={classes("typography__caption text_2")}>
                                  <span>11/14/2022</span>
                                </p>
                                <p className={classes("typography__caption text_2")}>
                                  <span>-</span>
                                </p>
                                <p className={classes("typography__caption text_2")}>
                                  <span>4pm</span>
                                </p>
                              </div>
                              <IgrChip className={classes("chip")}>
                                <span key={uuid()}>Phone call</span>
                              </IgrChip>
                            </div>
                          </div>
                        </IgrListItem>
                      </IgrList>
                      <span slot="title" key={uuid()}>Upcoming Events (3)</span>
                    </IgrExpansionPanel>
                    <IgrExpansionPanel indicatorPosition="end" key={uuid()}>
                      <p className={classes("typography__body-2 text_2")} key={uuid()}>
                        <span>No tasks added.</span>
                      </p>
                      <span slot="title" key={uuid()}>Tasks (0)</span>
                    </IgrExpansionPanel>
                    <IgrExpansionPanel indicatorPosition="end" key={uuid()}>
                      <p className={classes("typography__body-2 text_2")} key={uuid()}>
                        <span>No call logged.</span>
                      </p>
                      <span slot="title" key={uuid()}>Call Logs (0)</span>
                    </IgrExpansionPanel>
                  </IgrAccordion>
                </div>
              </IgrTabPanel>
              <IgrTab selected={true} key={uuid()}>
                <span className={classes("material-icons")} key={uuid()}>
                  <span key={uuid()}>info</span>
                </span>
                <span key={uuid()}>Activity</span>
              </IgrTab>
              <IgrTabPanel className={classes("row-layout tab-item-content_3")} key={uuid()}>
                <div className={classes("column-layout demo-content-1")} key={uuid()}>
                  <img src="/src/assets/start-building-dark.svg" className={classes("image")} />
                  <p className={classes("typography__body-2 text_3")}>
                    <span>Remove the "demo-content" container, and add your own content.</span>
                  </p>
                </div>
              </IgrTabPanel>
              <IgrTab disabled key={uuid()}>
                <span className={classes("material-icons")} key={uuid()}>
                  <span key={uuid()}>info</span>
                </span>
                <span key={uuid()}>Conversations</span>
              </IgrTab>
            </IgrTabs>
          </div>
        </div>
      </div>
    </>
  );
}
