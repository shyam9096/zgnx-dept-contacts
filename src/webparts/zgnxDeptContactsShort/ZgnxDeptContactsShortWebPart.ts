import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "ZgnxDeptContactsShortWebPartStrings";
import ZgnxDeptContactsShort from "./components/ZgnxDeptContactsShort";
import { IZgnxDeptContactsShortProps } from "./components/IZgnxDeptContactsShortProps";

export interface IZgnxDeptContactsShortWebPartProps {
  Title: string;
  showBio:boolean;
  webPartHeight:any;
}

export default class ZgnxDeptContactsShortWebPart extends BaseClientSideWebPart<IZgnxDeptContactsShortWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IZgnxDeptContactsShortProps> =
      React.createElement(ZgnxDeptContactsShort, {
        Title: this.properties.Title,
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
            description: "",
          },
          groups: [
            {
              groupName: "",
              groupFields: [
                PropertyPaneTextField("Title", {
                  label: "List Title",
                }),                
                PropertyPaneCheckbox('showBio', {
                  text: 'Show Bio'                  
                }),
                PropertyPaneTextField("webPartHeight", {
                  label: "Height",
                })
              ],
            },
          ],
        },
      ],
    };
  }
}
