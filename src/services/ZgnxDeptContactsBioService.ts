import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";

//let ListName: any;

export default class spservices {
  constructor(private context: any, listName) {
    sp.setup({ sp: { baseUrl: this.context.pageContext.web.absoluteUrl } });
    //ListName = listName;
  }

  public async GetItems(list:string): Promise<any[]> {
    let isOrder :any =[];
    let isBio :any =[];
   await sp.web.lists.getByTitle(list).fields.filter(`Hidden eq false and ReadOnlyField eq false`).get()
   .then(fields =>{    
    isOrder= fields.filter(f=>f.Title == "EmpOrder");    
    isBio = fields.filter(f=>f.Title == "Bio");      
   });  
   if(isOrder.length > 0)
   {
    return sp.web.lists
      .getByTitle(list)
      .items.select(
        "Title",
        "EmployeeInformation/JobTitle",
        "EmployeeInformation/Title",
        "EmployeeInformation/EMail",
        "Bio",
        "EmpOrder"
        )
      .expand("EmployeeInformation").orderBy("EmpOrder")
      .get();
   }
   else{
   console.log("Order not exist");
    return sp.web.lists
      .getByTitle(list)
      .items.select(
        "Title",
        "EmployeeInformation/JobTitle",
        "EmployeeInformation/Title",
        "EmployeeInformation/EMail",
        "Bio"
        )
      .expand("EmployeeInformation")
      .get();
   }
  }
}
