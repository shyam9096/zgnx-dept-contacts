import * as React from "react";
import { IZogenixDeptContactsBioProps } from "./IZogenixDeptContactsBioProps";
import spservices from "../../../services/ZgnxDeptContactsBioService";
import { Dialog } from "office-ui-fabric-react/lib";
import styles from "./ZogenixDeptContactsBio.module.scss";

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
export default class ZgnxDeptContactsWide extends React.Component<
  IZogenixDeptContactsBioProps,
  ZogenixDeptState
> {
  private spService: spservices = null;

  constructor(props) {
    super(props);
    const listName: any = this.props.listName;
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

   let items:any = await this.spService.GetItems(this.props.listName);
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
    // this.spService.GetItems().then((items) => {
    //   console.log(items);
    //   this.setState({ allItems: items });
    // });
  }

  public sortByKey(array, key) {
    return array.sort((a, b) => {
      let x = a[key];
      let y = b[key];
      
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
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
  public render(): React.ReactElement<IZogenixDeptContactsBioProps> {
    const _customHeight:number = parseInt(this.props.webPartHeight);
    return (
      <div className={styles.zogenixDeptContactsBio}>
        <div className={styles.gray_bx} style={{height:_customHeight}}>
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
                  <br />
                  { this.props.showBio &&
                  <a
                    className={styles.ReadBio}
                    onClick={this.hideBox.bind(
                      this,
                      items.Bio,
                      items.EmployeeInformation["Title"]
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
