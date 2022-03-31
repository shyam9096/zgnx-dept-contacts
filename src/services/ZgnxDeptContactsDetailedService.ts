import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

let ListName: any;

export default class spservices {
  constructor(private context: any, listName) {
    sp.setup({ sp: { baseUrl: this.context.pageContext.web.absoluteUrl } });
    ListName = listName;
  }

  public GetItems(): Promise<any[]> {
    return sp.web.lists
      .getByTitle(ListName)
      .items.select(
        "Title",
        "EmployeeInformation/JobTitle",
        "EmployeeInformation/Title",
        "EmployeeInformation/EMail",
        "EmployeeInformation/Department",
        "EmployeeInformation/WorkPhone"
      )
      .expand("EmployeeInformation")
      .getAll();
  }
}
