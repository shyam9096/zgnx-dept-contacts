import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "ZogenixDeptContactsBioWebPartStrings";
import ZogenixDeptContactsBio from "./components/ZogenixDeptContactsBio";
import { IZogenixDeptContactsBioProps } from "./components/IZogenixDeptContactsBioProps";

export interface IZogenixDeptContactsBioWebPartProps {
  description: string;
  listName: string;
  showBio:boolean;
  webPartHeight:any;
}

export default class ZogenixDeptContactsBioWebPart extends BaseClientSideWebPart<IZogenixDeptContactsBioWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IZogenixDeptContactsBioProps> =
      React.createElement(ZogenixDeptContactsBio, {
        listName: this.properties.listName,
        context: this.context,
        showBio:this.properties.showBio,
        webPartHeight:this.properties.webPartHeight,
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
                  label: "List Name",
                  value: "PeopleList",
                }),
                PropertyPaneCheckbox('showBio', {
                  text: 'Show Bio'                  
                }),
                PropertyPaneTextField("webPartHeight", {
                  label: "Height"
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
