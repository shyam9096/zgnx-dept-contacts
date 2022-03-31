import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/search";
import "@pnp/sp/fields";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/lists";

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
        "EmployeeInformation/Department"
      )
      .expand("EmployeeInformation")
      .getAll();
  }
}
