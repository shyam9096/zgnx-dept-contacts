import * as React from "react";
import { IZgnxDeptContactsShortProps } from "./IZgnxDeptContactsShortProps";
import { escape } from "@microsoft/sp-lodash-subset";
//import spservices from "../../../services/ZgnxDeptContactsShortService";
import spservices from "../../../services/ZgnxDeptContactsBioService";
import styles from "./ZgnxDeptContactsShort.module.scss";
import { Dialog } from "office-ui-fabric-react/lib";

const modelProps = {
  isBlocking: true,
  topOffsetFixed: true,
};

interface ZogenixDeptState {
  allItems: any;
  Closebutton: boolean;
  HideBox: boolean;
  Bio: any;
  BioPersonName: any;
}

export default class ZgnxDeptContactsShort extends React.Component<
  IZgnxDeptContactsShortProps,
  ZogenixDeptState
> {
  private spService: spservices = null;

  constructor(props) {
    super(props);
    const listName: any = this.props.Title;
    this.spService = new spservices(this.props.context, listName);
    this.state = {
      allItems: [],
      Closebutton: false,
      HideBox: false,
      Bio: "",
      BioPersonName: "",
    };
  }

  public async componentDidMount() {
    await this.getListItems();
  }

  public async getListItems() {

    let items:any = await this.spService.GetItems(this.props.Title);
    var newItems = new Array();
    var tempArray = new Array();
    items.forEach(element => {
      if(element.EmpOrder != null){
        newItems.push(element);
      }
      else{
       tempArray.push(element);    
      }
    });
    newItems = newItems.concat(tempArray);
    this.setState({ allItems: newItems });
    }

    public hideBox(data, BioPersonName) {
      if (this.state.HideBox == false) {
        this.setState({ Bio: data });
        this.setState({ BioPersonName: BioPersonName });
        this.setState({ HideBox: true });
      } else {
        this.setState({ HideBox: false });
      }
    }
  public render(): React.ReactElement<IZgnxDeptContactsShortProps> {

    const _customHeight:number = parseInt(this.props.webPartHeight);
    return (
      <div className={styles.zgnxDeptContactsShort}>
        <div className={styles.gray_bx} style={{height:_customHeight}}>
          {this.state.allItems.map((item) => {
            let varImageURL =
              this.props.context.pageContext.web.absoluteUrl +
              "/_layouts/15/userphoto.aspx?size=M&username=" +
              item.EmployeeInformation["EMail"];

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
                  <h4>{item.EmployeeInformation.Title}</h4>
                  <span>{item.EmployeeInformation.JobTitle}</span>
                  <br />
                  { this.props.showBio &&
                  <a
                    className={styles.ReadBio}
                    onClick={this.hideBox.bind(
                      this,
                      item.Bio,
                      item.EmployeeInformation["Title"]
                    )}
                  >
                    Read Bio
                  </a> }
                  </div>{" "}
              </div>
            );
          })}{" "}
          {this.state.HideBox == true && (
            <Dialog
              hidden={false}
              onDismiss={this.hideBox.bind(this)}
              modalProps={modelProps}
            >
              <div>
                <h3>{this.state.BioPersonName}</h3>
                <span dangerouslySetInnerHTML={{ __html: this.state.Bio }} />
              </div>
            </Dialog>
          )}
        </div>
      </div>
    );
  }
}
