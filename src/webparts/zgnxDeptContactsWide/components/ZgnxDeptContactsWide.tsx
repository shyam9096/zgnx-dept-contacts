import * as React from "react";
import { IZgnxDeptContactsWideProps } from "./IZgnxDeptContactsWideProps";
import { escape } from "@microsoft/sp-lodash-subset";
import spservices from "../../../services/ZgnxDeptContactsShortService";
import styles from "./ZgnxDeptContactsWide.module.scss";

interface ZogenixDeptState {
  allItems: any;
}
export default class ZgnxDeptContactsWide extends React.Component<
  IZgnxDeptContactsWideProps,
  ZogenixDeptState
> {
  private spService: spservices = null;

  constructor(props) {
    super(props);
    const listName: any = this.props.listName;
    this.spService = new spservices(this.props.context, listName);
    this.state = {
      allItems: [],
    };
  }

  public async componentDidMount() {
    await this.getListItems();
  }

  public getListItems() {
    this.spService.GetItems().then((items) => {
      console.log(items);
      this.setState({ allItems: items });
    });
  }
  public render(): React.ReactElement<IZgnxDeptContactsWideProps> {
    return (
      <div className={styles.zgnxDeptContactsWide}>
        <div className={styles.gray_bx}>
          {this.state.allItems.map((items) => {
            let varImageURL =
              this.props.context.pageContext.web.absoluteUrl +
              "/_layouts/15/userphoto.aspx?size=M&username=" +
              items.EmployeeInformation["EMail"];
            return (
              <div className={styles.gray_bg}>
                <div className={styles.gray_img}>
                  <span>
                    <img
                      src={varImageURL}
                      alt="Avatar"
                      width="72"
                      height="72"
                    />
                  </span>
                </div>
                <div className={styles.gray_content}>
                  <h4>{items.EmployeeInformation["Title"]}</h4>
                  <span>{items.EmployeeInformation["JobTitle"]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
