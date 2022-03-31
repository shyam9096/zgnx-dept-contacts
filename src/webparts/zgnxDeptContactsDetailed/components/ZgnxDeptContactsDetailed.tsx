import * as React from "react";
import { IZgnxDeptContactsDetailedProps } from "./IZgnxDeptContactsDetailedProps";
import spservices from "../../../services/ZgnxDeptContactsDetailedService";
import "@pnp/sp/site-users/web";
import style from "./ZgnxDeptContactsDetailed.module.scss";

let listName: any;

interface ZogenixDeptState {
  allItems: any;
}
export default class ZgnxDeptContactsDetailed extends React.Component<
  IZgnxDeptContactsDetailedProps,
  ZogenixDeptState
> {
  private spService: spservices = null;

  constructor(props) {
    super(props);
    listName = this.props.listName;
    this.spService = new spservices(this.props.context, listName);
    this.state = {
      allItems: [],
    };
  }

  public async componentDidMount() {
    await this.getListItems();
  }

  public async getListItems() {
    this.spService.GetItems().then(async (items) => {
      console.log(items);
      this.setState({ allItems: items });
    });
  }
  public render(): React.ReactElement<IZgnxDeptContactsDetailedProps> {
    return (
      <div className={style.PeopleChart}>
        <div className={style.border}>
          {this.state.allItems.map((shoutMessageItem) => {
            let varUserName = shoutMessageItem.EmployeeInformation["Title"];
            let varAppTitle = "Corporate Communications Contacts";
            let Emailaddress =
              "mailto:" + shoutMessageItem.EmployeeInformation["EMail"];
            let varImageURL =
              this.props.context.pageContext.web.absoluteUrl +
              "/_layouts/15/userphoto.aspx?size=M&username=" +
              shoutMessageItem.EmployeeInformation["EMail"];

            return (
              <div className={style.peoples_list_item}>
                <div className={style.peoples_image_name}>
                  <div className={style.peoples_image}>
                    <img
                      src={varImageURL}
                      alt="Avatar"
                      width="72"
                      height="72"
                      className={style.peoples_image}
                    />
                  </div>

                  <div className={style.peoples_name}>
                    <h4>{varUserName}</h4>
                    {shoutMessageItem.EmployeeInformation["JobTitle"]}
                  </div>
                </div>
                <div className={style.peoples_mail}>
                  <a href={Emailaddress}>
                    {shoutMessageItem.EmployeeInformation["EMail"]}
                  </a>
                  <p>{shoutMessageItem.EmployeeInformation["WorkPhone"]}</p>
                </div>
                <div className={style.peoples_responsibilities}>
                  {shoutMessageItem.Title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
