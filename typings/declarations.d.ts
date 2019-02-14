import * as CSS from 'csstype';

declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module 'csstype' {
  interface Properties {
    [index: string]: any;
  }
}
