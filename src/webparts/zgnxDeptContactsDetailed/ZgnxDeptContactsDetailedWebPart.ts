import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "ZgnxDeptContactsDetailedWebPartStrings";
import ZgnxDeptContactsDetailed from "./components/ZgnxDeptContactsDetailed";
import { IZgnxDeptContactsDetailedProps } from "./components/IZgnxDeptContactsDetailedProps";

export interface IZgnxDeptContactsDetailedWebPartProps {
  description: string;
  listName: string;
}

export default class ZgnxDeptContactsDetailedWebPart extends BaseClientSideWebPart<IZgnxDeptContactsDetailedWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IZgnxDeptContactsDetailedProps> =
      React.createElement(ZgnxDeptContactsDetailed, {
        listName: this.properties.listName,
        context: this.context,
      });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("listName", {
                  label: " list Name ",
                  value: "PeopleList",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
